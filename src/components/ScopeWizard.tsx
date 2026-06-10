import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionTitle from './SectionTitle';

const STEPS = [
  { q: 'What are you protecting?', opts: ['Web App', 'API / Backend', 'Mobile App', 'Cloud / Infra', 'Smart Contract'] },
  { q: 'Compliance driver?', opts: ['SOC 2', 'ISO 27001', 'PCI DSS', 'HIPAA', 'None / Pre-launch'] },
  { q: 'User data sensitivity?', opts: ['PII + Payments', 'PII only', 'Internal only', 'Public data'] },
  { q: 'Timeline?', opts: ['ASAP (72h)', '1 week', '2-3 weeks', 'Flexible'] },
];

const ScopeWizard = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= STEPS.length;

  const pick = (opt: string) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
    setStep(step + 1);
  };

  const reset = () => { setStep(0); setAnswers([]); };

  const recommend = () => {
    const [t, c] = answers;
    if (t === 'Smart Contract') return 'Smart Contract Audit + Formal Verification';
    if (t === 'Cloud / Infra') return 'Cloud Configuration Review + Network Pentest';
    if (c === 'PCI DSS') return 'Segmented Network + Web App Pentest (PCI-scoped)';
    if (c === 'SOC 2' || c === 'ISO 27001') return 'Full-Stack Pentest with compliance-ready report';
    return `${t} Penetration Test`;
  };

  return (
    <section className="py-20" id="scope-wizard">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-10">
          <SectionTitle text="Scope My Pentest" />
          <p className="text-muted-foreground mt-2">4 questions → tailored recommendation</p>
        </div>
        <div className="p-6 rounded-xl border border-primary/30 bg-card/60 backdrop-blur-sm min-h-[280px]">
          <div className="flex gap-1 mb-6">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-border'}`} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-xs font-mono text-muted-foreground mb-2">QUESTION {step + 1} OF {STEPS.length}</div>
                <h3 className="text-2xl font-bold mb-6">{STEPS[step].q}</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {STEPS[step].opts.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => pick(opt)}
                      className="text-left px-4 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="inline-flex items-center gap-2 text-primary text-xs font-mono mb-2">
                  <Check className="w-4 h-4" /> RECOMMENDED ENGAGEMENT
                </div>
                <h3 className="text-3xl font-bold text-gradient mb-4">{recommend()}</h3>
                <div className="text-sm space-y-1 text-muted-foreground mb-6">
                  {answers.map((a, i) => <div key={i}>• {STEPS[i].q} <span className="text-foreground">{a}</span></div>)}
                </div>
                <div className="flex gap-3">
                  <Button variant="neon" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Request this scope <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={reset}>Start over</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ScopeWizard;
