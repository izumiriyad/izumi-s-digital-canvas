import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SEO from '@/components/SEO';
import { ShieldCheck, KeyRound, Mail, Timer, Scale, FileSignature, Download, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FINGERPRINT = '1C4ACC8E 068DF75D E00E20DF C78C6AB1 13CB381E';

const timeline = [
  { label: 'Acknowledgement', detail: 'within 48 hours', window: '48h' },
  { label: 'Triage & severity', detail: 'reproduction, impact rating, owner assigned', window: '7d' },
  { label: 'Fix or mitigation', detail: 'high/critical: 90 days · everything else: 180 days', window: '90–180d' },
  { label: 'Coordinated disclosure', detail: 'agreed case by case; publication within 90 days of the fix', window: '90d' },
];

const Disclosure = () => {
  const [signedPolicy, setSignedPolicy] = useState<string | null>(null);

  useEffect(() => {
    fetch('/policy-signed.txt')
      .then((r) => (r.ok ? r.text() : null))
      .then(setSignedPolicy)
      .catch(() => setSignedPolicy(null));
  }, []);

  return (
    <>
      <SEO
        title="Responsible Disclosure Policy — Izumi Riyad"
        description="Scope, safe harbor, response timelines and PGP-signed policy for reporting security vulnerabilities on Izumi Riyad's properties."
        canonical="/disclosure"
      />
      <div className="min-h-screen pt-28 pb-24 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-3 py-1 rounded-full mb-6">
              <ShieldCheck size={12} /> SECURITY.TXT · POLICY · PGP
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Responsible <span className="text-gradient">Disclosure</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You found something on this site. Good — this page tells you exactly what happens next, and promises you safe harbor if you follow it.
            </p>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid md:grid-cols-2 gap-4 mb-14"
          >
            <div className="bg-card/50 border border-border rounded-lg p-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-3">
              </div>
              <a href="mailto:amiizumi00@gmail.com" className="text-lg font-mono text-foreground hover:text-primary transition-colors">
                amiizumi00@gmail.com
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                Plain-text email works. Encrypt to the PGP key on this page for sensitive PoCs.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-3">
                <KeyRound size={12} /> PGP SIGNING KEY
              </div>
              <code className="block font-mono text-xs text-foreground/90 break-all leading-relaxed mb-3">{FINGERPRINT}</code>
              <div className="flex gap-2">
                <a href="/pgp-key.txt" download>
                  <Button variant="outline" size="sm">
                    <Download size={14} className="mr-1" /> Public key
                  </Button>
                </a>
                <a href="/policy-signed.txt" download>
                  <Button variant="outline" size="sm">
                    <FileSignature size={14} className="mr-1" /> Signed policy
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Scope + Safe harbor */}
          <div className="grid md:grid-cols-2 gap-4 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 border border-border rounded-lg p-6"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-4">
                <CheckCircle2 size={12} /> SCOPE
              </div>
              <ul className="space-y-2.5">
                {[
                  'This website and all of its subdomains',
                  'The client portal and its API endpoints',
                  'Anything else I own or operate',
                ].map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary font-mono">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                Client systems engaged under paid assessment are <span className="text-foreground">not</span> in scope — findings there follow the client contract.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card/50 border border-border rounded-lg p-6"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-4">
                <Scale size={12} /> SAFE HARBOR
              </div>
              <ul className="space-y-2.5">
                {[
                  'Good-faith research following this policy will not be met with legal action.',
                  'Stop and report immediately if you encounter sensitive data.',
                  'Use only test accounts you own.',
                  'Do not degrade, disrupt, or exfiltrate production data.',
                ].map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary font-mono">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Response timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 border border-border rounded-lg p-6 md:p-8 mb-14"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-6">
              <Timer size={12} /> RESPONSE TIMELINE
            </div>
            <div className="space-y-0">
              {timeline.map((step, i) => (
                <div key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-primary/50 to-primary/10" />
                  )}
                  <div className="relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full border border-primary bg-primary/20 shadow-[0_0_8px_rgba(0,255,136,0.4)]" />
                  <div className="flex-1 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div className="font-semibold text-foreground">{step.label}</div>
                      <div className="text-sm text-muted-foreground">{step.detail}</div>
                    </div>
                    <span className="font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 rounded">
                      ≤ {step.window}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How to report */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 border border-border rounded-lg p-6 md:p-8 mb-14"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-4">
              <AlertTriangle size={12} /> HOW TO REPORT
            </div>
            <p className="text-muted-foreground text-sm mb-5">
              Email <a className="text-primary hover:underline" href="mailto:amiizumi00@gmail.com">amiizumi00@gmail.com</a> with:
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {['Affected URL or component', 'Steps to reproduce', 'Impact assessment', 'Minimal, safe PoC'].map((item) => (
                <div key={item} className="font-mono text-sm text-foreground/90 bg-muted/40 border border-border rounded px-3 py-2">
                  <span className="text-primary">$</span> {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* PGP-signed policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 border border-primary/30 rounded-lg p-6 md:p-8"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-4">
              <FileSignature size={12} /> PGP-SIGNED POLICY
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              The canonical text of this policy is clearsigned with the key above. Verify it with:
              <code className="block font-mono text-xs text-primary/90 mt-2 bg-[#020604] border border-primary/20 rounded p-3 overflow-x-auto">
                gpg --verify policy-signed.txt
              </code>
            </p>
            {signedPolicy ? (
              <details className="group">
                <summary className="font-mono text-xs text-primary cursor-pointer hover:text-primary/80">show signature block</summary>
                <pre className="mt-4 p-4 rounded-lg border border-primary/20 bg-[#020604] overflow-x-auto text-[11px] leading-relaxed font-mono text-primary/80 max-h-96 overflow-y-auto">
                  {signedPolicy}
                </pre>
              </details>
            ) : (
              <a href="/policy-signed.txt" className="font-mono text-xs text-primary hover:underline" download>
                download policy-signed.txt
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Disclosure;
