import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import SectionTitle from './SectionTitle';

// IBM 2024 Cost of a Data Breach: $4.88M avg, $9.36M for critical infra.
const AVG_BREACH = 4_880_000;

const ROICalculator = () => {
  const [critical, setCritical] = useState([3]);
  const [high, setHigh] = useState([8]);
  const [engagement, setEngagement] = useState([1500]);

  const { saved, roi } = useMemo(() => {
    // Heuristic: each critical = 18% of avg breach risk, each high = 4%.
    const exposure =
      critical[0] * AVG_BREACH * 0.18 + high[0] * AVG_BREACH * 0.04;
    const cost = engagement[0];
    return {
      saved: Math.round(exposure),
      roi: cost > 0 ? Math.round((exposure / cost) * 10) / 10 : 0,
    };
  }, [critical, high, engagement]);

  return (
    <section id="roi" className="py-20 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <SectionTitle text="Breach Prevention ROI" />
          <p className="text-muted-foreground mt-2">
            Quantify the financial upside of catching bugs before attackers do
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-8 p-6 md:p-8 rounded-2xl border border-accent/30 bg-card/60 backdrop-blur-sm"
        >
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm font-mono">Critical bugs likely in your stack</Label>
                <span className="text-sm font-mono text-destructive">{critical[0]}</span>
              </div>
              <Slider value={critical} onValueChange={setCritical} min={0} max={10} step={1} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm font-mono">High-severity bugs</Label>
                <span className="text-sm font-mono text-orange-400">{high[0]}</span>
              </div>
              <Slider value={high} onValueChange={setHigh} min={0} max={20} step={1} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm font-mono">Engagement budget (USD)</Label>
                <span className="text-sm font-mono text-primary">
                  ${engagement[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={engagement}
                onValueChange={setEngagement}
                min={500}
                max={10000}
                step={100}
              />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Based on IBM's 2024 Cost of a Data Breach Report ($4.88M avg). Estimates are
              illustrative — actual exposure varies by industry, data sensitivity, and regulatory
              regime.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 bg-background/60 rounded-xl p-6 border border-accent/20">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1">
                <ShieldCheck className="w-4 h-4 text-accent" /> Potential Loss Avoided
              </div>
              <div className="text-4xl md:text-5xl font-bold font-mono text-gradient">
                ${(saved / 1_000_000).toFixed(2)}M
              </div>
            </div>
            <div className="h-px bg-border" />
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1">
                <TrendingUp className="w-4 h-4 text-primary" /> Return on Engagement
              </div>
              <div className="text-4xl md:text-5xl font-bold font-mono text-primary">
                {roi.toLocaleString()}×
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Every $1 spent on this pentest defends ~${roi.toLocaleString()} of breach risk.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;
