import { motion } from 'framer-motion';
import { ShieldCheck, Award, Bug, Star } from 'lucide-react';

const badges = [
  { icon: Bug, label: '500+ Vulns Disclosed', accent: 'text-primary' },
  { icon: Award, label: 'HackerOne Top 5%', accent: 'text-accent' },
  { icon: ShieldCheck, label: 'OSCP · CEH · eWPTX', accent: 'text-primary' },
  { icon: Star, label: '50+ Engagements', accent: 'text-accent' },
];

const TrustBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-y border-border/50 bg-card/30 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-sm">
              <b.icon className={`w-4 h-4 ${b.accent}`} />
              <span className="font-mono text-muted-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrustBar;
