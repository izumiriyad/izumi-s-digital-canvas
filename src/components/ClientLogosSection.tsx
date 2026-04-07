import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { Shield, Bug, Globe, Server, Lock, Cpu, Wifi, Database } from 'lucide-react';

const clients = [
  { name: 'HackerOne', icon: Bug, type: 'Bug Bounty Platform' },
  { name: 'Bugcrowd', icon: Shield, type: 'Bug Bounty Platform' },
  { name: 'Synack', icon: Lock, type: 'Crowdsourced Security' },
  { name: 'Cobalt', icon: Cpu, type: 'Pentest as a Service' },
  { name: 'Intigriti', icon: Globe, type: 'Ethical Hacking' },
  { name: 'YesWeHack', icon: Server, type: 'Bug Bounty Platform' },
  { name: 'Open Bug Bounty', icon: Wifi, type: 'Responsible Disclosure' },
  { name: 'CERT', icon: Database, type: 'Vulnerability Coordination' },
];

const ClientLogosSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <SectionTitle text="Trusted Platforms" />
          <p className="section-subtitle">
            Actively contributing to security programs across leading platforms worldwide.
          </p>
        </motion.div>

        {/* Scrolling logo ticker */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-56 bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-3 group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <client.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <span className="font-mono font-bold text-sm text-foreground">{client.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{client.type}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: '8+', label: 'Platforms' },
            { value: '50+', label: 'Programs Joined' },
            { value: '500+', label: 'Bugs Reported' },
            { value: 'Top 5%', label: 'Global Ranking' },
          ].map((stat, i) => (
            <div key={i} className="px-4">
              <div className="text-2xl font-mono font-bold text-primary text-neon">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
