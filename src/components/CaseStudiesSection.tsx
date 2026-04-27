import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Wrench, AlertOctagon, TrendingUp, Building2, Banknote, ShoppingCart, Hospital, Cpu } from 'lucide-react';
import SectionTitle from './SectionTitle';

const caseStudies = [
  {
    id: 'fintech',
    icon: Banknote,
    industry: 'FinTech',
    client: 'Series-B Payments Platform',
    engagement: 'Web App + API Pentest',
    duration: '3 weeks',
    goals: [
      'Validate PCI-DSS readiness ahead of audit',
      'Stress-test transaction APIs against IDOR & race conditions',
      'Assess OAuth 2.0 / JWT implementation',
    ],
    methods: [
      'Grey-box testing with low-priv merchant accounts',
      'Burp Suite Pro + custom Python fuzzers',
      'Manual business-logic review of payout flows',
    ],
    findings: {
      summary: 'Identified a chained vulnerability allowing horizontal privilege escalation between merchant tenants via a predictable invoice ID combined with a missing tenant check in the refund endpoint.',
      breakdown: { critical: 2, high: 4, medium: 7, low: 9 },
    },
    outcomes: [
      'All criticals patched within 72h via guided remediation',
      'Passed PCI-DSS audit on first attempt',
      'Retained for quarterly retesting program',
    ],
    accent: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    industry: 'E-commerce',
    client: 'Multi-brand Retail Group (anonymized)',
    engagement: 'External Recon + OSINT',
    duration: '2 weeks',
    goals: [
      'Map shadow IT and forgotten subdomains',
      'Identify leaked credentials from third-party breaches',
      'Assess supply-chain exposure',
    ],
    methods: [
      'Custom subdomain enumeration via cert transparency',
      'Dark-web credential monitoring',
      'GitHub dorking for leaked .env files',
    ],
    findings: {
      summary: 'Discovered an abandoned staging environment exposing a production database replica, plus 1,400+ employee credentials circulating from a 2023 third-party SaaS breach.',
      breakdown: { critical: 1, high: 3, medium: 5, low: 12 },
    },
    outcomes: [
      'Staging environment decommissioned within 24h',
      'Forced password rotation for 100% of affected accounts',
      'Implemented continuous attack-surface monitoring',
    ],
    accent: 'from-orange-500/20 to-orange-500/5',
  },
  {
    id: 'healthcare',
    icon: Hospital,
    industry: 'HealthTech',
    client: 'Telemedicine SaaS',
    engagement: 'HIPAA-aligned Security Audit',
    duration: '4 weeks',
    goals: [
      'Verify PHI handling across patient portal & mobile app',
      'Audit role-based access controls for clinicians',
      'Test video consultation infrastructure',
    ],
    methods: [
      'Mobile app reverse engineering (iOS + Android)',
      'API authorization matrix testing',
      'WebRTC traffic analysis',
    ],
    findings: {
      summary: 'Found a broken access control allowing clinicians to read PHI of patients outside their assigned care team, and an SSRF in the medical-image upload feature.',
      breakdown: { critical: 1, high: 2, medium: 6, low: 4 },
    },
    outcomes: [
      'Zero PHI exposure confirmed via log review',
      'HIPAA compliance documentation delivered',
      'SOC 2 Type II readiness accelerated by ~6 weeks',
    ],
    accent: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    id: 'web3',
    icon: Cpu,
    industry: 'Web3 / DeFi',
    client: 'NFT Marketplace',
    engagement: 'Smart Contract + Web Audit',
    duration: '3 weeks',
    goals: [
      'Audit Solidity contracts before mainnet deployment',
      'Test marketplace UI for signature-phishing vectors',
      'Validate wallet integration security',
    ],
    methods: [
      'Manual Solidity review + Slither / Mythril',
      'Foundry-based invariant fuzzing',
      'Frontend EIP-712 signature flow analysis',
    ],
    findings: {
      summary: 'Identified a reentrancy vector in the bid-cancel function and a UI flaw that displayed misleading approval prompts, enabling potential blind-signing attacks.',
      breakdown: { critical: 2, high: 3, medium: 4, low: 6 },
    },
    outcomes: [
      'Contract redeployed with reentrancy guards',
      'UI rebuilt with human-readable signature previews',
      'Public audit report boosted investor confidence',
    ],
    accent: 'from-purple-500/20 to-purple-500/5',
  },
  {
    id: 'saas',
    icon: Building2,
    industry: 'B2B SaaS',
    client: 'DevOps Platform Startup',
    engagement: 'Continuous Pentest Program',
    duration: 'Ongoing (12 months)',
    goals: [
      'Catch regressions before each major release',
      'Build internal security culture',
      'Reduce MTTR for reported vulnerabilities',
    ],
    methods: [
      'Sprint-aligned threat modeling',
      'Automated nuclei templates for regression scanning',
      'Pair-testing sessions with engineering team',
    ],
    findings: {
      summary: 'Across 12 sprints, surfaced 47 vulnerabilities ranging from CI/CD pipeline injection to tenant-isolation bugs. 100% remediated, with mean time-to-fix dropping from 14 days to under 3.',
      breakdown: { critical: 3, high: 11, medium: 19, low: 14 },
    },
    outcomes: [
      'Zero post-release security incidents in 12 months',
      'Engineering team trained on secure-by-default patterns',
      'Achieved ISO 27001 certification',
    ],
    accent: 'from-blue-500/20 to-blue-500/5',
  },
];

interface CaseStudiesSectionProps {
  onIndustryChange?: (industry: string) => void;
}

const CaseStudiesSection = ({ onIndustryChange }: CaseStudiesSectionProps = {}) => {
  const [activeId, setActiveId] = useState(caseStudies[0].id);
  const active = caseStudies.find((c) => c.id === activeId)!;
  const ActiveIcon = active.icon;

  const handleSelect = (id: string) => {
    setActiveId(id);
    const c = caseStudies.find((x) => x.id === id);
    if (c) onIndustryChange?.(c.industry);
  };

  return (
    <section id="case-studies" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <SectionTitle text="// Case Studies" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Anonymized engagements showing real impact across industries.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {caseStudies.map((c) => {
            const Icon = c.icon;
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-sm transition-all ${
                  isActive
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {c.industry}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl border border-border/50 bg-gradient-to-br ${active.accent} backdrop-blur-sm p-8 md:p-12 overflow-hidden`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-primary/30 bg-background/60 flex items-center justify-center">
                  <ActiveIcon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-mono text-primary uppercase tracking-wider">{active.industry}</p>
                  <h3 className="text-2xl font-bold text-foreground">{active.client}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {active.engagement} · <span className="font-mono">{active.duration}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Target className="w-5 h-5" />
                  <h4 className="font-bold uppercase tracking-wider text-sm">Goals</h4>
                </div>
                <ul className="space-y-2">
                  {active.goals.map((g) => (
                    <li key={g} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary font-mono">▸</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Wrench className="w-5 h-5" />
                  <h4 className="font-bold uppercase tracking-wider text-sm">Methods</h4>
                </div>
                <ul className="space-y-2">
                  {active.methods.map((m) => (
                    <li key={m} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary font-mono">▸</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 lg:col-span-2">
                <div className="flex items-center gap-2 text-primary">
                  <AlertOctagon className="w-5 h-5" />
                  <h4 className="font-bold uppercase tracking-wider text-sm">Findings Summary</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{active.findings.summary}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { label: 'Critical', value: active.findings.breakdown.critical, color: 'bg-red-500/15 text-red-400 border-red-500/30' },
                    { label: 'High', value: active.findings.breakdown.high, color: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
                    { label: 'Medium', value: active.findings.breakdown.medium, color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
                    { label: 'Low', value: active.findings.breakdown.low, color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
                  ].map((b) => (
                    <div key={b.label} className={`px-4 py-2 rounded-lg border font-mono text-xs ${b.color}`}>
                      <span className="font-bold text-base mr-2">{b.value}</span>
                      {b.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 lg:col-span-2">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  <h4 className="font-bold uppercase tracking-wider text-sm">Outcomes</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {active.outcomes.map((o) => (
                    <div
                      key={o}
                      className="p-4 rounded-lg bg-background/40 border border-border/50 text-sm text-foreground"
                    >
                      {o}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
