import { useMemo, useState } from 'react';
import SectionTitle from './SectionTitle';

const M = {
  AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 },
  AC: { L: 0.77, H: 0.44 },
  PR: { N: 0.85, L: 0.62, H: 0.27 },
  UI: { N: 0.85, R: 0.62 },
  S: { U: 0, C: 1 },
  C: { H: 0.56, L: 0.22, N: 0 },
  I: { H: 0.56, L: 0.22, N: 0 },
  A: { H: 0.56, L: 0.22, N: 0 },
};

type K = keyof typeof M;

const LABEL: Record<K, string> = {
  AV: 'Attack Vector', AC: 'Attack Complexity', PR: 'Privileges Required',
  UI: 'User Interaction', S: 'Scope', C: 'Confidentiality', I: 'Integrity', A: 'Availability',
};

const sevColor = (s: number) => s >= 9 ? 'text-destructive' : s >= 7 ? 'text-orange-400' : s >= 4 ? 'text-yellow-400' : 'text-primary';
const sevLabel = (s: number) => s >= 9 ? 'CRITICAL' : s >= 7 ? 'HIGH' : s >= 4 ? 'MEDIUM' : s > 0 ? 'LOW' : 'NONE';

const CVSSCalculator = () => {
  const [v, setV] = useState<Record<K, string>>({
    AV: 'N', AC: 'L', PR: 'N', UI: 'N', S: 'U', C: 'H', I: 'H', A: 'H',
  });

  const score = useMemo(() => {
    const av = (M.AV as any)[v.AV], ac = (M.AC as any)[v.AC];
    const prRaw = (M.PR as any)[v.PR];
    const pr = v.S === 'C' && v.PR !== 'N' ? (v.PR === 'L' ? 0.68 : 0.5) : prRaw;
    const ui = (M.UI as any)[v.UI];
    const c = (M.C as any)[v.C], i = (M.I as any)[v.I], a = (M.A as any)[v.A];
    const iss = 1 - (1 - c) * (1 - i) * (1 - a);
    const impact = v.S === 'U' ? 6.42 * iss : 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15);
    const exploit = 8.22 * av * ac * pr * ui;
    if (impact <= 0) return 0;
    const base = v.S === 'U' ? Math.min(impact + exploit, 10) : Math.min(1.08 * (impact + exploit), 10);
    return Math.ceil(base * 10) / 10;
  }, [v]);

  const vector = `CVSS:3.1/AV:${v.AV}/AC:${v.AC}/PR:${v.PR}/UI:${v.UI}/S:${v.S}/C:${v.C}/I:${v.I}/A:${v.A}`;

  return (
    <section className="py-20" id="cvss">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <SectionTitle text="CVSS 3.1 Calculator" />
          <p className="text-muted-foreground mt-2">Triage findings the same way I do</p>
        </div>
        <div className="grid lg:grid-cols-[1fr,320px] gap-6">
          <div className="grid sm:grid-cols-2 gap-4 p-6 rounded-xl border border-primary/30 bg-card/60">
            {(Object.keys(M) as K[]).map((k) => (
              <div key={k}>
                <div className="text-xs font-mono text-muted-foreground mb-1">{LABEL[k]}</div>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(M[k]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setV({ ...v, [k]: opt })}
                      className={`px-2.5 py-1 text-xs rounded border font-mono transition ${
                        v[k] === opt ? 'border-primary bg-primary/15 text-primary' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl border border-primary/30 bg-background/70 flex flex-col">
            <div className="text-xs font-mono text-muted-foreground">Base Score</div>
            <div className={`text-6xl font-bold font-mono ${sevColor(score)}`}>{score.toFixed(1)}</div>
            <div className={`text-sm font-mono mt-1 ${sevColor(score)}`}>{sevLabel(score)}</div>
            <div className="mt-4 p-2 rounded bg-background/80 border border-border text-[10px] font-mono break-all text-muted-foreground">
              {vector}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(vector)}
              className="mt-3 text-xs text-primary hover:underline self-start"
            >
              Copy vector string
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVSSCalculator;
