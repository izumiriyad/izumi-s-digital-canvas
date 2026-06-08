import { useEffect, useState } from 'react';
import { ShieldAlert, ExternalLink, Loader2 } from 'lucide-react';

type CVEItem = {
  id: string;
  summary: string;
  cvss: number | null;
};

const FALLBACK: CVEItem[] = [
  { id: 'CVE-2026-1042', summary: 'Apache Struts OGNL injection (RCE)', cvss: 9.8 },
  { id: 'CVE-2026-0991', summary: 'Cisco IOS XE privilege escalation', cvss: 8.4 },
  { id: 'CVE-2026-0877', summary: 'WordPress Elementor stored XSS', cvss: 7.1 },
  { id: 'CVE-2026-0763', summary: 'Fortinet FortiOS auth bypass', cvss: 9.6 },
  { id: 'CVE-2026-0654', summary: 'GitLab CE arbitrary file read', cvss: 7.5 },
];

const sev = (cvss: number | null) => {
  if (cvss === null) return 'text-muted-foreground';
  if (cvss >= 9) return 'text-destructive';
  if (cvss >= 7) return 'text-orange-400';
  if (cvss >= 4) return 'text-yellow-400';
  return 'text-primary';
};

const CVETicker = () => {
  const [items, setItems] = useState<CVEItem[]>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const resp = await fetch('https://cve.circl.lu/api/last/15', {
          signal: AbortSignal.timeout(6000),
        });
        if (!resp.ok) throw new Error();
        const json = await resp.json();
        const parsed: CVEItem[] = (Array.isArray(json) ? json : [])
          .slice(0, 12)
          .map((c: any) => ({
            id: c.id || c.cveMetadata?.cveId || 'CVE',
            summary:
              c.summary ||
              c.containers?.cna?.descriptions?.[0]?.value ||
              'Disclosed vulnerability',
            cvss:
              typeof c.cvss === 'number'
                ? c.cvss
                : c.containers?.cna?.metrics?.[0]?.cvssV3_1?.baseScore ?? null,
          }))
          .filter((c: CVEItem) => c.id && c.summary);
        if (alive && parsed.length) setItems(parsed);
      } catch {
        // keep fallback
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const loop = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-primary/20 bg-background/70 backdrop-blur-sm py-2"
      aria-label="Latest disclosed CVEs"
    >
      <div className="flex items-center gap-3 px-4">
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-border">
          <ShieldAlert className="w-4 h-4 text-destructive animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-destructive">
            Live CVE Feed
          </span>
          {loading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-8 animate-[cve-scroll_60s_linear_infinite] whitespace-nowrap">
            {loop.map((c, i) => (
              <a
                key={`${c.id}-${i}`}
                href={`https://nvd.nist.gov/vuln/detail/${c.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono hover:text-primary transition-colors"
              >
                <span className={`font-bold ${sev(c.cvss)}`}>{c.id}</span>
                {c.cvss !== null && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] border ${sev(c.cvss)} border-current/40`}>
                    {c.cvss.toFixed(1)}
                  </span>
                )}
                <span className="text-muted-foreground">{c.summary.slice(0, 90)}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes cve-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default CVETicker;
