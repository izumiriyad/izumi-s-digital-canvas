import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, ExternalLink, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';
import SEO from '@/components/SEO';
import { cves } from '@/data/cves';
import { Badge } from '@/components/ui/badge';

const severityClass: Record<string, string> = {
  Critical: 'bg-red-500/15 text-red-400 border-red-500/40',
  High: 'bg-orange-500/15 text-orange-400 border-orange-500/40',
  Medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/40',
  Low: 'bg-blue-500/15 text-blue-400 border-blue-500/40',
};

const CVEs = () => {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState<'All' | 'Critical' | 'High' | 'Medium' | 'Low'>('All');

  const filtered = useMemo(() => {
    return cves.filter((c) => {
      const matchesQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.vendor.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase()) ||
        c.id.toLowerCase().includes(query.toLowerCase());
      const matchesSeverity = severity === 'All' || c.severity === severity;
      return matchesQuery && matchesSeverity;
    });
  }, [query, severity]);

  const stats = useMemo(
    () => ({
      total: cves.length,
      critical: cves.filter((c) => c.severity === 'Critical').length,
      high: cves.filter((c) => c.severity === 'High').length,
      avgCvss: (cves.reduce((s, c) => s + c.cvss, 0) / cves.length).toFixed(1),
    }),
    []
  );

  return (
    <div className="relative min-h-screen bg-background">
      <SEO
        title="Disclosed CVEs — Aftab Ahomod (Riyad)"
        description="Coordinated security disclosures: critical and high-severity vulnerabilities found across FinTech, HealthTech, Web3, and SaaS engagements."
        canonical="/cve"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Disclosed CVEs',
          description: 'List of coordinated vulnerability disclosures.',
        }}
      />
      <ScrollProgress />
      <Navbar />
      <BackToTop />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-6 max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-3">
              Security Research
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
              Disclosed CVEs &amp; Findings
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Coordinated disclosures from client engagements and independent research. Vendor
              names are anonymized where NDAs apply; technical detail is preserved.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Disclosures', value: stats.total },
              { label: 'Critical', value: stats.critical },
              { label: 'High', value: stats.high },
              { label: 'Avg CVSS', value: stats.avgCvss },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="text-3xl font-bold text-primary font-mono">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by vendor, category, or CVE ID…"
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50"
                aria-label="Search CVEs"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['All', 'Critical', 'High', 'Medium', 'Low'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeverity(s)}
                  className={`px-3 py-2 rounded-lg border text-xs font-mono uppercase tracking-wider transition-colors ${
                    severity === s
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold leading-tight">{c.title}</h3>
                      <p className="text-xs font-mono text-muted-foreground mt-1">
                        {c.id} · {c.vendor} · {c.product}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      CVSS {c.cvss}
                    </Badge>
                    <span
                      className={`px-2.5 py-1 rounded-md border text-xs font-mono uppercase tracking-wider ${severityClass[c.severity]}`}
                    >
                      {c.severity}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {c.summary}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50">
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">{c.category}</Badge>
                    <Badge variant="secondary" className="text-xs">{c.status}</Badge>
                    <Badge variant="secondary" className="text-xs">{c.year}</Badge>
                  </div>
                  {c.writeupUrl && (
                    <a
                      href={c.writeupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Read write-up <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                No findings match your filters.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CVEs;
