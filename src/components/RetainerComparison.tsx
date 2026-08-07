import { motion } from 'framer-motion';
import { Check, Minus, CalendarClock, FileSignature, Radar, ShieldCheck, ArrowRight, Receipt } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { Button } from '@/components/ui/button';

const PLANS = ['Watchtower', 'Sentinel', 'Red Cell'] as const;

const PRICES: Record<(typeof PLANS)[number], string> = {
  Watchtower: '$450 / mo',
  Sentinel: '$1,200 / mo',
  'Red Cell': 'Custom',
};

type Cell = boolean | string;

const ROWS: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: 'External attack-surface sweep', values: ['Monthly', 'Bi-weekly', 'Weekly'] },
  { label: 'Testing hours included', values: ['—', '20 / mo', 'Custom'] },
  { label: 'Unlimited retests on findings', values: [false, true, true] },
  { label: 'Pre-release feature checks', values: [false, true, true] },
  { label: 'New subdomain / service alerts', values: [true, true, true] },
  { label: 'Header, TLS and DNS hygiene tracking', values: [true, true, true] },
  { label: 'Private Slack / email channel', values: [false, true, true] },
  { label: 'Response SLA on alerts', values: ['48h', '24h', '8h'] },
  { label: 'Adversary emulation (MITRE ATT&CK)', values: [false, false, true] },
  { label: 'Secure-code review sessions', values: [false, false, true] },
  { label: 'Threat-model refresh', values: [false, 'Yearly', 'Quarterly'] },
  { label: 'Executive reporting', values: ['Monthly summary', 'Quarterly report', 'Quarterly + board deck'] },
  { label: 'Compliance evidence packs', values: [false, false, true] },
  { label: 'Cancel with 30 days notice', values: [true, true, true] },
];

const TIMELINE = [
  {
    icon: FileSignature,
    week: 'Week 0',
    title: 'Scoping & paperwork',
    detail: 'Kickoff call, NDA and MSA signed, targets and rules of engagement agreed, invoice issued.',
  },
  {
    icon: Radar,
    week: 'Week 1',
    title: 'Baseline assessment',
    detail: 'Full attack-surface map, initial sweep and a prioritised baseline posture report.',
  },
  {
    icon: ShieldCheck,
    week: 'Weeks 2–4',
    title: 'Active testing cycle',
    detail: 'Manual testing against agreed scope, findings reported as they land — not held to a final report.',
  },
  {
    icon: CalendarClock,
    week: 'Ongoing',
    title: 'Monitor, retest, report',
    detail: 'Continuous monitoring, retests on fixes, and recurring executive summaries each cycle.',
  },
];

const renderCell = (v: Cell) =>
  typeof v === 'boolean' ? (
    v ? (
      <Check className="w-4 h-4 text-primary inline" aria-label="Included" />
    ) : (
      <Minus className="w-4 h-4 text-muted-foreground/40 inline" aria-label="Not included" />
    )
  ) : (
    <span className="text-xs font-mono text-foreground/80">{v}</span>
  );

const RetainerComparison = () => (
  <section id="retainer-compare" className="py-24 relative overflow-hidden">
    <div className="absolute top-10 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    <div className="container mx-auto px-6 max-w-6xl relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <SectionTitle text="Compare Retainers & Timeline" />
        <p className="section-subtitle">
          Side-by-side coverage for each retainer, plus what the first month of an engagement actually looks like.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-x-auto rounded-xl border border-primary/30 bg-card/60 backdrop-blur-sm"
      >
        <table className="w-full text-sm min-w-[640px]">
          <caption className="sr-only">Feature comparison of the Watchtower, Sentinel and Red Cell retainers</caption>
          <thead>
            <tr className="border-b border-border bg-background/40">
              <th scope="col" className="text-left p-4 font-mono text-xs uppercase text-muted-foreground">
                Coverage
              </th>
              {PLANS.map((p) => (
                <th key={p} scope="col" className="p-4 text-center">
                  <span className={`block font-mono ${p === 'Sentinel' ? 'text-primary' : 'text-foreground'}`}>{p}</span>
                  <span className="block text-[11px] text-muted-foreground mt-1">{PRICES[p]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-b border-border/40 hover:bg-primary/5 transition-colors">
                <th scope="row" className="p-4 text-left font-normal text-muted-foreground">
                  {row.label}
                </th>
                {row.values.map((v, j) => (
                  <td key={j} className="p-4 text-center">
                    {renderCell(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="mt-16">
        <h3 className="text-xl font-bold text-foreground mb-2 text-center">Estimated engagement timeline</h3>
        <p className="text-sm text-muted-foreground text-center mb-10">
          Typical schedule once a retainer starts. Rush onboarding available within 72h.
        </p>

        <div className="relative grid md:grid-cols-4 gap-6">
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10" />
          {TIMELINE.map((step, i) => (
            <motion.div
              key={step.week}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full border border-primary/40 bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_-14px_hsl(var(--primary)/0.6)]">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="mt-4 block font-mono text-xs uppercase tracking-wider text-primary">{step.week}</span>
              <h4 className="mt-1 font-semibold text-foreground">{step.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 p-6 rounded-xl border border-primary/30 bg-card/60 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <Receipt className="w-5 h-5 text-primary mt-1 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Retainers are invoiced monthly against a signed MSA — no card needed to start. Tell me your scope and I'll
            send a quote and invoice within one business day.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button asChild variant="outline">
            <a href="#retainers">View tiers</a>
          </Button>
          <Button asChild>
            <a href="#contact">
              Request invoice <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default RetainerComparison;
