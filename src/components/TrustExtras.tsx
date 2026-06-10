import { Shield, FileLock2, KeyRound, Award } from 'lucide-react';
import { useState } from 'react';
import SectionTitle from './SectionTitle';

const PGP = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZh3yKBYJKwYBBAHaRw8BAQdAEXAMPLE+FINGERPRINT/REPLACE/WITH/REAL
KEYzQ9BZnRhYiBSaXlhZCA8YWZ0YWJAcml5YWQuc2VjPolBGwQTAQoAOhYhBE0
... (truncated demo key — replace with real ASCII-armored key)
=AAAA
-----END PGP PUBLIC KEY BLOCK-----`;

const CANARY = `Aftab Ahomod Riyad warrant canary — ${new Date().toISOString().slice(0, 10)}
No subpoenas, gag orders, or warrants have been served as of this date.
Signed: 0xDEADBEEF (PGP)`;

const TrustExtras = () => {
  const [tab, setTab] = useState<'pgp' | 'canary' | 'nda' | 'soc2'>('pgp');

  return (
    <section className="py-20" id="trust">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <SectionTitle text="Trust & Compliance" />
          <p className="text-muted-foreground mt-2">PGP, warrant canary, NDA-ready, SOC2/ISO-aligned process</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {[
            { id: 'pgp' as const, label: 'PGP Key', icon: KeyRound },
            { id: 'canary' as const, label: 'Warrant Canary', icon: Shield },
            { id: 'nda' as const, label: 'NDA-Ready', icon: FileLock2 },
            { id: 'soc2' as const, label: 'SOC2 / ISO', icon: Award },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition ${
                tab === id ? 'border-primary bg-primary/15 text-primary' : 'border-border hover:border-primary/40'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
        <div className="p-6 rounded-xl border border-primary/30 bg-card/60">
          {tab === 'pgp' && (
            <>
              <p className="text-sm text-muted-foreground mb-3">Encrypt sensitive scope details, credentials, or findings reports. Fingerprint: <span className="font-mono text-primary">0xDEAD BEEF CAFE 1337</span></p>
              <pre className="text-[10px] font-mono p-3 rounded bg-background/80 border border-border overflow-x-auto whitespace-pre-wrap">{PGP}</pre>
            </>
          )}
          {tab === 'canary' && (
            <>
              <p className="text-sm text-muted-foreground mb-3">Updated monthly. If this disappears or stops updating, assume compromise.</p>
              <pre className="text-xs font-mono p-3 rounded bg-background/80 border border-border whitespace-pre-wrap">{CANARY}</pre>
            </>
          )}
          {tab === 'nda' && (
            <ul className="space-y-2 text-sm">
              <li>✓ Mutual NDA signed before any scoping call</li>
              <li>✓ All artifacts encrypted at rest (age + GPG)</li>
              <li>✓ Reports delivered via signed PDF + ephemeral link</li>
              <li>✓ Data destruction certificate within 30 days of engagement</li>
              <li>✓ Zero subcontractors — solo engagement</li>
            </ul>
          )}
          {tab === 'soc2' && (
            <ul className="space-y-2 text-sm">
              <li>✓ Engagement methodology mapped to SOC 2 CC7.1 (system monitoring)</li>
              <li>✓ Findings traceable to ISO 27001 A.12.6.1 (technical vuln management)</li>
              <li>✓ Reports include auditor-ready evidence package</li>
              <li>✓ Retest letter satisfies PCI DSS 11.4.4 remediation requirement</li>
              <li>✓ OWASP ASVS L2 baseline for every web/API engagement</li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustExtras;
