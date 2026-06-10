import { useMemo } from 'react';
import SectionTitle from './SectionTitle';

const GitHubHeatmap = () => {
  const weeks = useMemo(() => {
    // Deterministic pseudo-random heatmap (52 weeks x 7 days)
    const seed = (n: number) => Math.abs(Math.sin(n * 9999)) % 1;
    return Array.from({ length: 52 }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => {
        const r = seed(w * 7 + d);
        return r > 0.85 ? 4 : r > 0.7 ? 3 : r > 0.5 ? 2 : r > 0.3 ? 1 : 0;
      })
    );
  }, []);

  const colors = ['bg-muted/30', 'bg-primary/20', 'bg-primary/40', 'bg-primary/70', 'bg-primary'];

  return (
    <section className="py-20" id="activity">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-8">
          <SectionTitle text="Research Activity" />
          <p className="text-muted-foreground mt-2">Last 12 months of disclosures, commits, and writeups</p>
        </div>
        <div className="p-6 rounded-xl border border-primary/30 bg-card/60 overflow-x-auto">
          <div className="flex gap-[3px] min-w-fit">
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {w.map((v, di) => (
                  <div key={di} className={`w-2.5 h-2.5 rounded-sm ${colors[v]}`} title={`Week ${wi + 1}, Day ${di + 1}`} />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground font-mono">
            Less {colors.map((c, i) => <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />)} More
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubHeatmap;
