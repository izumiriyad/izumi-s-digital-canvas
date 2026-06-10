import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './SectionTitle';

const MODELS = [
  {
    id: 'saas',
    name: 'SaaS Multi-tenant',
    ascii: `┌─ User ──▶ CDN ──▶ Edge Auth ──▶ App API ──┐
│                                            ▼
│                                      ┌── RBAC ──┐
│                                      │          ▼
└────────── Webhook ◀── Queue ◀── Tenant DB (RLS) ┘`,
    threats: ['Cross-tenant IDOR', 'JWT scope confusion', 'Webhook replay', 'Race conditions in billing'],
  },
  {
    id: 'fintech',
    name: 'FinTech Payment Rail',
    ascii: `Client ──▶ Edge ──▶ Risk Engine ──▶ Ledger
                │              │
                ▼              ▼
            KYC Vault     Settlement Bus ──▶ Bank`,
    threats: ['Idempotency abuse', 'Negative-amount transfers', 'KYC bypass via JSON pollution', 'Ledger desync'],
  },
  {
    id: 'web3',
    name: 'Web3 dApp + Bridge',
    ascii: `Wallet ──▶ Frontend ──▶ RPC ──▶ Contract
                              ▼
                          Bridge Relayer ──▶ Chain B`,
    threats: ['Signature replay', 'Reentrancy', 'Oracle manipulation', 'Bridge double-spend'],
  },
];

const ThreatModelGallery = () => {
  const [active, setActive] = useState(MODELS[0].id);
  const model = MODELS.find((m) => m.id === active)!;
  return (
    <section className="py-20" id="threat-models">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <SectionTitle text="Threat Model Gallery" />
          <p className="text-muted-foreground mt-2">Sanitized architectures from real engagements</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`px-4 py-2 rounded-lg border text-sm transition ${
                active === m.id ? 'border-primary bg-primary/15 text-primary' : 'border-border hover:border-primary/40'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={model.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-[1fr,300px] gap-6"
          >
            <pre className="p-6 rounded-xl border border-primary/30 bg-background/80 text-xs md:text-sm font-mono text-primary overflow-x-auto">
              {model.ascii}
            </pre>
            <div className="p-6 rounded-xl border border-destructive/30 bg-card/60">
              <div className="text-xs font-mono text-destructive uppercase tracking-wider mb-3">Top Threats</div>
              <ul className="space-y-2 text-sm">
                {model.threats.map((t) => (
                  <li key={t} className="flex gap-2"><span className="text-destructive">▸</span>{t}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ThreatModelGallery;
