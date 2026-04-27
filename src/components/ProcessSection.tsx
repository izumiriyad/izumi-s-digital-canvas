import { motion } from 'framer-motion';
import { Search, Crosshair, FileText, ShieldCheck } from 'lucide-react';
import SectionTitle from './SectionTitle';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description: 'Scope definition, asset enumeration, and threat modeling. We map your attack surface and align on objectives, rules of engagement, and success criteria.',
    deliverables: ['Scope document', 'Rules of engagement', 'Asset inventory'],
  },
  {
    icon: Crosshair,
    number: '02',
    title: 'Assessment',
    description: 'Active testing using manual techniques and industry-grade tooling. Vulnerabilities are identified, validated, and exploited safely to prove real-world impact.',
    deliverables: ['Vulnerability validation', 'Proof-of-concept exploits', 'Risk scoring'],
  },
  {
    icon: FileText,
    number: '03',
    title: 'Report',
    description: 'Detailed technical and executive reports with reproducible steps, screenshots, CVSS scores, and prioritized remediation guidance tailored to your stack.',
    deliverables: ['Executive summary', 'Technical findings', 'Remediation roadmap'],
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Remediation',
    description: 'Hands-on support during fixes plus a free retest to verify all critical and high-severity issues are resolved. We close the loop, not just hand off a PDF.',
    deliverables: ['Fix verification', 'Retest report', 'Hardening recommendations'],
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <SectionTitle text="// Engagement Workflow" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A proven 4-phase methodology that turns reconnaissance into resilience.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  {/* Icon node on the timeline */}
                  <div className="relative flex justify-center mb-6">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                      <div className="relative w-32 h-32 rounded-full border-2 border-primary/30 bg-background/80 backdrop-blur-sm flex items-center justify-center group-hover:border-primary group-hover:scale-105 transition-all duration-500">
                        <Icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                      </div>
                      <span className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-mono font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 group-hover:border-primary/50 transition-all duration-300 h-full">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-1.5">
                      {step.deliverables.map((d) => (
                        <li key={d} className="text-xs font-mono text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">▸</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow between steps (desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-14 -right-4 z-20 text-primary/60">
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-2xl font-mono"
                      >
                        →
                      </motion.span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
