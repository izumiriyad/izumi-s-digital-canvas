import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SectionTitle from './SectionTitle';

type AssessmentType =
  | 'recon'
  | 'webapp'
  | 'api'
  | 'mobile'
  | 'network'
  | 'fullstack';

const BASE: Record<AssessmentType, { base: number; label: string }> = {
  recon: { base: 250, label: 'Recon & OSINT' },
  webapp: { base: 750, label: 'Web App Pentest' },
  api: { base: 900, label: 'API Pentest' },
  mobile: { base: 1100, label: 'Mobile App Pentest' },
  network: { base: 1300, label: 'Network / Infra Pentest' },
  fullstack: { base: 2400, label: 'Full-Stack Engagement' },
};

const URGENCY = [
  { id: 'standard', label: 'Standard (2-3 wks)', mult: 1 },
  { id: 'priority', label: 'Priority (1 wk)', mult: 1.35 },
  { id: 'rush', label: 'Rush (72h)', mult: 1.75 },
] as const;

const QuoteCalculator = () => {
  const [type, setType] = useState<AssessmentType>('webapp');
  const [scope, setScope] = useState([5]); // assets count
  const [urgency, setUrgency] = useState<(typeof URGENCY)[number]['id']>('standard');
  const [retest, setRetest] = useState(false);

  const { low, high } = useMemo(() => {
    const base = BASE[type].base;
    const scopeMult = 1 + Math.max(0, scope[0] - 1) * 0.18;
    const urg = URGENCY.find((u) => u.id === urgency)!.mult;
    const retestMult = retest ? 1.2 : 1;
    const mid = base * scopeMult * urg * retestMult;
    return {
      low: Math.round((mid * 0.9) / 25) * 25,
      high: Math.round((mid * 1.25) / 25) * 25,
    };
  }, [type, scope, urgency, retest]);

  const goToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="quote" className="py-20 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <SectionTitle text="Instant Quote Calculator" />
          <p className="text-muted-foreground mt-2">
            Estimate your engagement in seconds — no email required
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-[1fr,1fr] gap-8 p-6 md:p-8 rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-sm shadow-[0_0_40px_hsl(152_100%_50%/0.08)]"
        >
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-mono mb-2 block">Assessment Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as AssessmentType)}>
                <SelectTrigger className="border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(BASE).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-mono">Scope Size</Label>
                <span className="text-sm font-mono text-primary">
                  {scope[0]} {scope[0] === 1 ? 'asset' : 'assets'}
                </span>
              </div>
              <Slider
                value={scope}
                onValueChange={setScope}
                min={1}
                max={20}
                step={1}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Domains, endpoints, repos, or apps in scope
              </p>
            </div>

            <div>
              <Label className="text-sm font-mono mb-2 block">Urgency</Label>
              <div className="grid grid-cols-3 gap-2">
                {URGENCY.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setUrgency(u.id)}
                    className={`text-xs px-3 py-2 rounded-md border transition-colors ${
                      urgency === u.id
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer text-sm select-none">
              <input
                type="checkbox"
                checked={retest}
                onChange={(e) => setRetest(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span>Include 30-day fix verification retest (+20%)</span>
            </label>
          </div>

          {/* Output */}
          <div className="flex flex-col justify-between bg-background/60 border border-primary/20 rounded-xl p-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs uppercase tracking-wider font-mono">
                <Calculator className="w-4 h-4 text-primary" /> Estimated Range
              </div>
              <div className="text-4xl md:text-5xl font-bold font-mono text-gradient">
                ${low.toLocaleString()}
                <span className="text-muted-foreground mx-2 text-2xl">–</span>$
                {high.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Final quote depends on scoping call. Fixed-price, no retainer.
              </p>

              <div className="mt-5 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-mono">{BASE[type].label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scope</span>
                  <span className="font-mono">{scope[0]} assets</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Turnaround</span>
                  <span className="font-mono">
                    {URGENCY.find((u) => u.id === urgency)!.label}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="neon"
              onClick={goToContact}
              className="mt-6 w-full group"
            >
              Lock this scope
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteCalculator;
