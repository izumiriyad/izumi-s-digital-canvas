import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { Loader2, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SectionTitle from './SectionTitle';
import TurnstileWidget from './TurnstileWidget';

// Cloudflare Turnstile site key. Falls back to Cloudflare's official always-passing
// test key so the widget works in dev/preview. Set VITE_TURNSTILE_SITE_KEY in
// production to your real site key.
const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

const industries = [
  'FinTech',
  'E-commerce',
  'HealthTech',
  'Web3 / DeFi',
  'B2B SaaS',
  'Other',
];

const scopes = [
  'Web App Pentest',
  'API / Backend Audit',
  'Mobile App Security',
  'Cloud Configuration Review',
  'Smart Contract Audit',
  'OSINT / External Recon',
  'Incident Response',
  'Not sure — advise me',
];

const formSchema = z.object({
  name: z.string().trim().nonempty('Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be under 255 characters'),
  company: z.string().trim().max(150, 'Company must be under 150 characters').optional(),
  industry: z.string().nonempty('Pick an industry'),
  scope: z.string().nonempty('Pick an assessment type'),
  notes: z.string().trim().max(1000, 'Notes must be under 1000 characters').optional(),
});

interface Props {
  defaultIndustry?: string;
}

const TailoredAssessmentCTA = ({ defaultIndustry = 'FinTech' }: Props) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    industry: defaultIndustry,
    scope: scopes[0],
    notes: '',
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: 'Please fix the form',
        description: parsed.error.errors[0]?.message ?? 'Invalid input',
        variant: 'destructive',
      });
      return;
    }

    if (!captchaToken) {
      toast({
        title: 'Verification required',
        description: 'Please wait a moment for the spam check to complete, then try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xeokbqbq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Tailored Assessment Request — ${parsed.data.industry}`,
          source: 'Tailored Assessment CTA',
          'cf-turnstile-response': captchaToken,
          ...parsed.data,
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsSubmitted(true);
      toast({
        title: 'Request sent',
        description: `I'll get back to you with a tailored ${parsed.data.industry} scope within 24h.`,
      });
      setForm({ name: '', email: '', company: '', industry: defaultIndustry, scope: scopes[0], notes: '' });
      setCaptchaToken('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      toast({
        title: 'Could not send',
        description: 'Please try again or reach out via the contact section.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full bg-background/60 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors';

  return (
    <section id="tailored-assessment" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <SectionTitle text="// Request a Tailored Assessment" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Tell me your industry and scope — you'll get a custom proposal with timeline and pricing within 24 hours.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background/40 to-background/20 backdrop-blur-sm p-8 md:p-10 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 flex items-center gap-2 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">
                Routing to: <span className="text-foreground font-bold">{form.industry}</span> desk
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-2">NAME *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                required
                maxLength={100}
                className={inputCls}
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-2">EMAIL *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                required
                maxLength={255}
                className={inputCls}
                placeholder="jane@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-2">COMPANY</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                maxLength={150}
                className={inputCls}
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-2">INDUSTRY *</label>
              <select
                value={form.industry}
                onChange={(e) => update('industry', e.target.value)}
                required
                className={inputCls}
              >
                {industries.map((i) => (
                  <option key={i} value={i} className="bg-background">
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-muted-foreground mb-2">ASSESSMENT TYPE *</label>
              <select
                value={form.scope}
                onChange={(e) => update('scope', e.target.value)}
                required
                className={inputCls}
              >
                {scopes.map((s) => (
                  <option key={s} value={s} className="bg-background">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-muted-foreground mb-2">
                SHORT BRIEF (optional)
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
                maxLength={1000}
                rows={4}
                className={inputCls + ' resize-none'}
                placeholder="A few sentences about your stack, timeline, or compliance needs..."
              />
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                {form.notes.length}/1000
              </p>
            </div>

            <div className="md:col-span-2">
              <TurnstileWidget
                siteKey={TURNSTILE_SITE_KEY}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken('')}
                onError={() => setCaptchaToken('')}
                theme="dark"
              />
              <p className="text-xs text-muted-foreground mt-2 font-mono">
                Protected by Cloudflare Turnstile — invisible spam check.
              </p>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || isSubmitted || !captchaToken}
                className="min-w-[220px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Request Sent
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Request Tailored Scope
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default TailoredAssessmentCTA;
