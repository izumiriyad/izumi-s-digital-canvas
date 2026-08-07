import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { Terminal, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import { useAuth } from '@/hooks/use-auth';

const schema = z.object({
  email: z.string().trim().email({ message: 'Enter a valid email' }).max(255),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(72),
  fullName: z.string().trim().max(100).optional(),
  company: z.string().trim().max(120).optional(),
});

const safeNext = (value: string | null) =>
  value && value.startsWith('/') && !value.startsWith('//') ? value : '/portal';

const AuthPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [busy, setBusy] = useState(false);
  const [sentConfirm, setSentConfirm] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const next = safeNext(params.get('next'));

  useEffect(() => {
    if (!loading && user) navigate(next, { replace: true });
  }, [user, loading, navigate, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, fullName, company });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/portal`,
            data: { full_name: parsed.data.fullName || null, company: parsed.data.company || null },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setSentConfirm(true);
          toast.success('Check your inbox to confirm your email.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success('Access granted.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error('Google sign-in failed');
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate(next, { replace: true });
  };

  const resetPassword = async () => {
    const parsed = z.string().email().safeParse(email.trim());
    if (!parsed.success) {
      toast.error('Enter your email first');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success('Reset link sent.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <SEO
        title="Client Portal Login — Aftab Ahomod Riyad"
        description="Sign in to the secure client portal to manage your security retainer, submit engagements and track milestones."
        canonical="/auth"
      />
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md rounded-xl border border-border bg-card/70 backdrop-blur-md p-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-3 h-3" /> back to site
        </Link>

        <div className="flex items-center gap-2 mb-1">
          <Terminal className="w-5 h-5 text-primary" />
          <h1 className="font-mono text-xl font-bold">
            <span className="text-accent">$</span> client_portal
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6 font-mono">
          {mode === 'signin' ? 'authenticate to continue' : 'provision a new client account'}
        </p>

        {sentConfirm ? (
          <div className="space-y-4 text-center py-6">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">
              Confirmation link sent to <span className="text-foreground font-mono">{email}</span>. Click it to activate
              your portal access.
            </p>
            <Button variant="outline" onClick={() => setSentConfirm(false)} className="font-mono">
              back
            </Button>
          </div>
        ) : (
          <>
            <form onSubmit={submit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="font-mono text-xs">
                      Full name
                    </Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="font-mono text-xs">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Inc."
                      maxLength={120}
                    />
                  </div>
                </>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="font-mono text-xs">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="font-mono text-xs">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full font-mono">
                {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === 'signin' ? 'sign in' : 'create account'}
              </Button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <span className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <Button variant="outline" onClick={google} disabled={busy} className="w-full font-mono">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 11v2.4h5.7c-.2 1.5-1.7 4.4-5.7 4.4-3.4 0-6.2-2.8-6.2-6.3S8.6 5.2 12 5.2c2 0 3.3.8 4 1.5l1.9-1.8C16.7 3.7 14.6 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1.1-.2-1.2H12z"
                />
              </svg>
              continue with Google
            </Button>

            <div className="mt-6 flex items-center justify-between text-xs font-mono">
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-muted-foreground hover:text-primary"
              >
                {mode === 'signin' ? 'need an account?' : 'have an account?'}
              </button>
              {mode === 'signin' && (
                <button type="button" onClick={resetPassword} className="text-muted-foreground hover:text-primary">
                  forgot password?
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
