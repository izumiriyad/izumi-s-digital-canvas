import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Key, ArrowUp, Database, Flag } from 'lucide-react';
import SectionTitle from './SectionTitle';

const STEPS = [
  { icon: Search, label: 'Recon', detail: 'Subdomain enum, port scans, OSINT pivots, JS endpoint extraction.' },
  { icon: Key, label: 'Initial Access', detail: 'Auth bypass, leaked credentials, IDOR, SSRF entrypoint.' },
  { icon: ArrowUp, label: 'Privilege Escalation', detail: 'Role swap, JWT confusion, misconfigured IAM, GraphQL introspection.' },
  { icon: Database, label: 'Data Exfiltration', detail: 'PII dump, signed URL abuse, S3 walk, blind SQLi extraction.' },
  { icon: Flag, label: 'Impact / Report', detail: 'CVSS scoring, PoC video, remediation plan, retest scheduling.' },
];

const AttackChainVisualizer = () => {
  const [active, setActive] = useState(0);
  const Active = STEPS[active].icon;
  return (
    <section className="py-20" id="attack-chain">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <SectionTitle text="Attack Chain Visualizer" />
          <p className="text-muted-foreground mt-2">How a real engagement unfolds — click any phase</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                className={`relative p-4 rounded-lg border text-left transition-all ${
                  i === active
                    ? 'border-primary bg-primary/10 shadow-[0_0_25px_hsl(152_100%_50%/0.3)]'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${i === active ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="text-[10px] font-mono text-muted-foreground">PHASE {i + 1}</div>
                <div className="text-sm font-semibold">{s.label}</div>
              </button>
            );
          })}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-primary/30 bg-card/60 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/15 border border-primary/40">
              <Active className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold mb-1">{STEPS[active].label}</div>
              <p className="text-muted-foreground">{STEPS[active].detail}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AttackChainVisualizer;
