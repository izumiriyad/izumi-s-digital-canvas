import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

interface Check {
  id: string;
  label: string;
  weight: number;
  passed: boolean;
  detail: string;
  severity: "info" | "low" | "medium" | "high";
}

const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/i;

function normalize(input: string): string | null {
  let value = (input || "").trim().toLowerCase();
  value = value.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/:\d+$/, "");
  if (!value || value.length > 253) return null;
  if (!DOMAIN_RE.test(value)) return null;
  // block obvious internal targets
  if (
    value === "localhost" ||
    value.endsWith(".local") ||
    value.endsWith(".internal") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(value)
  ) {
    return null;
  }
  return value;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const domain = normalize(String(body?.domain ?? ""));
    if (!domain) {
      return json({ error: "Enter a valid public domain, e.g. example.com" }, 400);
    }

    const url = `https://${domain}/`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);

    let res: Response;
    try {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "izumi-security-scorecard/1.0 (+portfolio scan)" },
      });
    } catch (_e) {
      clearTimeout(timer);
      return json(
        { error: `Could not reach https://${domain} over TLS within 10s. Check the domain or HTTPS support.` },
        502,
      );
    }
    clearTimeout(timer);
    // Drain body so the connection closes cleanly, but ignore content.
    try {
      await res.arrayBuffer();
    } catch (_e) {
      /* noop */
    }

    const h = (name: string) => res.headers.get(name) ?? "";
    const csp = h("content-security-policy");
    const hsts = h("strict-transport-security");
    const server = h("server");
    const powered = h("x-powered-by");
    const maxAge = Number(/max-age=(\d+)/i.exec(hsts)?.[1] ?? 0);

    const checks: Check[] = [
      {
        id: "tls",
        label: "HTTPS reachable",
        weight: 15,
        passed: res.url.startsWith("https://"),
        detail: res.url.startsWith("https://")
          ? "Served over TLS after redirects."
          : "Final response was not HTTPS — traffic can be downgraded.",
        severity: "high",
      },
      {
        id: "hsts",
        label: "Strict-Transport-Security",
        weight: 15,
        passed: !!hsts && maxAge >= 15552000,
        detail: hsts
          ? `Present (max-age=${maxAge || "unset"})${maxAge < 15552000 ? " — below the recommended 180 days." : "."}`
          : "Missing. Browsers may still attempt plaintext HTTP.",
        severity: "high",
      },
      {
        id: "csp",
        label: "Content-Security-Policy",
        weight: 20,
        passed: !!csp && !/unsafe-inline|unsafe-eval/i.test(csp),
        detail: csp
          ? /unsafe-inline|unsafe-eval/i.test(csp)
            ? "Present but weakened by unsafe-inline/unsafe-eval."
            : "Present with no unsafe-* directives."
          : "Missing. XSS payloads execute unrestricted.",
        severity: "high",
      },
      {
        id: "frame",
        label: "Clickjacking protection",
        weight: 10,
        passed: !!h("x-frame-options") || /frame-ancestors/i.test(csp),
        detail:
          h("x-frame-options") || /frame-ancestors/i.test(csp)
            ? "X-Frame-Options or CSP frame-ancestors is set."
            : "No X-Frame-Options or frame-ancestors — framing/UI redress is possible.",
        severity: "medium",
      },
      {
        id: "nosniff",
        label: "X-Content-Type-Options",
        weight: 8,
        passed: h("x-content-type-options").toLowerCase() === "nosniff",
        detail:
          h("x-content-type-options").toLowerCase() === "nosniff"
            ? "nosniff set."
            : "Missing nosniff — MIME confusion attacks are possible.",
        severity: "low",
      },
      {
        id: "referrer",
        label: "Referrer-Policy",
        weight: 8,
        passed: !!h("referrer-policy"),
        detail: h("referrer-policy")
          ? `Set to ${h("referrer-policy")}.`
          : "Missing — full URLs may leak to third parties.",
        severity: "low",
      },
      {
        id: "permissions",
        label: "Permissions-Policy",
        weight: 8,
        passed: !!h("permissions-policy"),
        detail: h("permissions-policy")
          ? "Set — powerful browser features are restricted."
          : "Missing — camera/mic/geolocation defaults are inherited by embeds.",
        severity: "low",
      },
      {
        id: "coop",
        label: "Cross-Origin-Opener-Policy",
        weight: 6,
        passed: !!h("cross-origin-opener-policy"),
        detail: h("cross-origin-opener-policy")
          ? "Set — window references are isolated."
          : "Missing — cross-window scripting surface stays open.",
        severity: "low",
      },
      {
        id: "disclosure",
        label: "No stack disclosure",
        weight: 10,
        passed: !powered && !/\d/.test(server),
        detail:
          !powered && !/\d/.test(server)
            ? "No versioned Server or X-Powered-By banner."
            : `Discloses stack details${server ? ` (Server: ${server})` : ""}${powered ? ` (X-Powered-By: ${powered})` : ""}.`,
        severity: "low",
      },
    ];

    const total = checks.reduce((s, c) => s + c.weight, 0);
    const earned = checks.reduce((s, c) => s + (c.passed ? c.weight : 0), 0);
    const score = Math.round((earned / total) * 100);
    const grade =
      score >= 90 ? "A" : score >= 80 ? "B" : score >= 65 ? "C" : score >= 50 ? "D" : "F";

    return json({
      domain,
      finalUrl: res.url,
      status: res.status,
      score,
      grade,
      scannedAt: new Date().toISOString(),
      checks,
    });
  } catch (e) {
    console.error("security-scorecard error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
