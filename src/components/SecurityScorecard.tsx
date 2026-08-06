import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Loader2, Search, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface Check {
  id: string;
  label: string;
  weight: number;
  passed: boolean;
  detail: string;
  severity: 'info' | 'low' | 'medium' | 'high';
}

interface ScorecardResult {
  domain: string;
  finalUrl: string;
  status: number;
  score: number;
  grade: string;
  scannedAt: string;
  checks: Check[];
}

const gradeTone = (grade: string) => {
  if (grade === 'A') return 'text-primary border-primary/40';
  if (grade === 'B') return 'text-secondary border-secondary/40';
  if (grade === 'C') return 'text-yellow-400 border-yellow-400/40';
  return 'text-destructive border-destructive/40';
};

const SecurityScorecard = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScorecardResult | null>(null);

  const runScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('security-scorecard', {
        body: { domain: domain.trim() },
      });
      if (fnError) throw new Error(fnError.message);
      if ((data as { error?: string })?.error) throw new Error((data as { error: string }).error);
      setResult(data as ScorecardResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="scorecard" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionTitle text="Free Security Scorecard" />
          <p className="section-subtitle">
            Enter any domain you own and get an instant, passive grade on its HTTP security posture — no
            intrusive testing, no signup.
          </p>
        </motion.div>

        <form onSubmit={runScan} className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              aria-label="Domain to scan"
              className="pl-9 font-mono bg-card/60 border-border"
            />
          </div>
          <Button type="submit" disabled={loading || !domain.trim()} className="sm:w-44">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scanning…
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" /> Run scorecard
              </>
            )}
          </Button>
        </form>

        <p className="text-[11px] font-mono text-muted-foreground mb-8">
          Passive check only: one HTTPS GET, response headers analysed. Scan domains you are authorised to test.
        </p>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 p-4 rounded-lg border border-destructive/40 bg-destructive/5 text-sm"
            >
              <ShieldAlert className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{error}</span>
            </motion.div>
          )}

          {result && (
            <motion.div
              key={result.domain + result.scannedAt}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
                <div
                  className={`w-24 h-24 shrink-0 rounded-full border-2 flex flex-col items-center justify-center ${gradeTone(result.grade)}`}
                >
                  <span className="text-4xl font-bold leading-none">{result.grade}</span>
                  <span className="text-[10px] font-mono mt-1">{result.score}/100</span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-mono text-sm text-primary break-all">{result.domain}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.checks.filter((c) => c.passed).length} of {result.checks.length} controls in place ·
                    HTTP {result.status}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-2">
                    scanned {new Date(result.scannedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {result.checks.map((check, i) => (
                  <motion.div
                    key={check.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`p-4 rounded-lg border bg-card/40 ${
                      check.passed ? 'border-primary/25' : 'border-destructive/30'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {check.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-foreground">{check.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{check.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 rounded-xl border border-primary/30 bg-primary/5 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Headers are the surface. Business logic, auth flows and API access control is where breaches
                  actually happen — that's what a manual assessment covers.
                </p>
                <Button asChild>
                  <a href="#contact">
                    Book a scoping call <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SecurityScorecard;
