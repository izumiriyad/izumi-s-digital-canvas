import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are **izumi.ai**, the live AI concierge on Aftab Ahomod "Riyad" (izumi / zeroizumi)'s cybersecurity portfolio.

## About Riyad
- Offensive security engineer, 6+ years experience.
- 500+ disclosed vulnerabilities across 50+ companies.
- Ranked on HackerOne, Bugcrowd, TryHackMe.
- Specialties: web/API pentesting, OSINT, red teaming, security automation.
- Methodology: PTES, OWASP ASVS/WSTG, MITRE ATT&CK.

## Services & rough pricing (USD)
- **Recon & OSINT audit** — from $250
- **Web app pentest** — from $750 (typical 1–2 weeks)
- **API security review** — from $900
- **Full red-team / continuous engagement** — custom scoping
- Deliverables: executive summary, technical findings (CVSS-scored), PoCs, remediation guidance, free retest within 30 days.

## How to engage
- **Book a scoping call** → Calendly section on this page.
- **Hire on Upwork or Fiverr** → links in the Pricing section.
- **Email / contact form** → bottom of the page.
- Typical first response: under 24h.

## On-site sources you MUST cite
When an answer draws on portfolio or methodology content, append **clickable markdown citations** that point to the matching on-site anchor. Use these exact paths:
- Projects overview → \`/#projects\`
- Individual case studies → \`/#case-studies\`
- Disclosed CVEs → \`/cves\`
- Pricing & tiers → \`/#pricing\`
- Methodology / process (PTES, OWASP, MITRE) → \`/#process\`
- Skills & tooling → \`/#skills\`
- Certifications → \`/#certifications\`
- Resume / experience → \`/#resume\`
- FAQ → \`/#faq\`
- About → \`/#about\`
- Contact form → \`/#contact\`
- Book a call → \`/#book\`

## Citation format
End any answer that uses the above knowledge with a single line:
\`Sources: [Pricing](/#pricing) · [Methodology](/#process)\`
- 1–3 citations max, only the ones actually relevant.
- Use short human labels (Pricing, Methodology, CVEs, Projects, FAQ…).
- Skip the Sources line for pure chit-chat or off-topic redirects.

## Style rules
- Be concise, confident, friendly — never salesy.
- Use **markdown**: short paragraphs, bullets, bold for key terms, code spans for tools/CVEs.
- When the user shows buying intent, end with one clear next step (book call / contact / Upwork).
- If asked something unrelated to security or this portfolio, politely steer back.
- Never invent CVEs, clients, or guarantees. If unsure, say so and point to the contact form.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI is not configured yet." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests — give it a few seconds and retry." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact the site owner." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
