import { motion } from 'framer-motion';
import { Check, Repeat, ShieldCheck, Radar, ArrowRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { Button } from '@/components/ui/button';

interface Retainer {
  name: string;
  price: string;
  cadence: string;
  icon: typeof Radar;
  summary: string;
  features: string[];
  highlight?: boolean;
}

const retainers: Retainer[] = [
  {
    name: 'Watchtower',
    price: '$450',
    cadence: 'per month',
    icon: Radar,
    summary: 'Continuous attack-surface monitoring for a single product.',
    features: [
      'Monthly external attack-surface sweep',
      'New subdomain / exposed service alerts',
      'Header, TLS and DNS hygiene tracking',
      'Monthly one-page posture summary',
      '48h response on alerts',
    ],
  },
  {
    name: 'Sentinel',
    price: '$1,200',
    cadence: 'per month',
    icon: ShieldCheck,
    summary: 'Ongoing testing plus release-gated retests for active teams.',
    features: [
      'Everything in Watchtower',
      '20 testing hours per month (rollover 1 month)',
      'Unlimited retests on reported findings',
      'Pre-release checks on new features',
      'Private Slack / email channel',
      'Quarterly executive report',
    ],
    highlight: true,
  },
  {
    name: 'Red Cell',
    price: 'Custom',
    cadence: 'quarterly scoping',
    icon: Repeat,
    summary: 'Embedded offensive partner across multiple products and clouds.',
    features: [
      'Everything in Sentinel',
      'Dedicated hours across web, API, cloud and mobile',
      'Adversary-emulation campaigns (MITRE ATT&CK)',
      'Threat-model refresh each quarter',
      'Secure-code review sessions with your engineers',
      'Compliance evidence packs (SOC 2 / ISO / PCI)',
    ],
  },
];

const RetainerTiers = () => (
  <section id="retainers" className="py-24 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
    <div className="container mx-auto px-6 max-w-6xl relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <SectionTitle text="Ongoing Security Retainers" />
        <p className="section-subtitle">
          One-off pentests age fast. Retainers keep coverage on your surface as it ships — cancel any time
          with 30 days notice.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {retainers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`relative p-6 rounded-xl border bg-card/60 backdrop-blur-sm flex flex-col ${
              tier.highlight ? 'border-primary/50 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.4)]' : 'border-border'
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary text-primary-foreground">
                Most chosen
              </span>
            )}
            <tier.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
            <p className="text-sm text-muted-foreground mt-2 min-h-[42px]">{tier.summary}</p>
            <div className="mt-4 mb-6">
              <span className="text-3xl font-bold text-primary">{tier.price}</span>
              <span className="text-xs font-mono text-muted-foreground ml-2">{tier.cadence}</span>
            </div>
            <ul className="space-y-2 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant={tier.highlight ? 'default' : 'outline'} className="mt-6 w-full">
              <a href="#contact">
                Start {tier.name} <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default RetainerTiers;
