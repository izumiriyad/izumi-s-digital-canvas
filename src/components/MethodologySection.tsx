import { motion } from 'framer-motion';
import { Search, Crosshair, Bug, FileCheck, RefreshCw } from 'lucide-react';

const phases = [
  {
    icon: Search,
    name: 'Reconnaissance',
    framework: 'PTES · OWASP WSTG-INFO',
    description: 'Passive + active asset discovery, tech fingerprinting, attack surface mapping.',
  },
  {
    icon: Crosshair,
    name: 'Threat Modeling',
    framework: 'STRIDE · MITRE ATT&CK',
    description: 'Identify trust boundaries, abuse cases, and prioritized attack paths.',
  },
  {
    icon: Bug,
    name: 'Exploitation',
    framework: 'OWASP Top 10 · API Top 10',
    description: 'Manual + automated testing across auth, business logic, injection, and access control.',
  },
  {
    icon: FileCheck,
    name: 'Reporting',
    framework: 'CVSS 3.1 · Executive + Technical',
    description: 'Reproducible PoCs, severity ratings, and remediation guidance per finding.',
  },
  {
    icon: RefreshCw,
    name: 'Retesting',
    framework: 'Continuous Validation',
    description: 'Verify fixes, regression-test critical paths, deliver clearance letter.',
  },
];

const MethodologySection = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {phases.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <p.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
            <h4 className="font-semibold mb-1">{p.name}</h4>
            <p className="text-[10px] font-mono text-accent mb-2 uppercase tracking-wider">
              {p.framework}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MethodologySection;
