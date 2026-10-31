import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

/**
 * Reusable newsletter signup (Formspree).
 * `source` tags which placement submitted the signup (footer, blog post, ...).
 */
const NewsletterForm = ({ source = 'footer-newsletter', className = '' }: { source?: string; className?: string }) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    try {
      const res = await fetch('https://formspree.io/f/xeokbqbq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'Newsletter signup', source }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <p className={`flex items-center gap-2 text-sm text-primary font-mono ${className}`}>
        <CheckCircle2 className="w-4 h-4" /> Subscribed — see you in the next intel drop.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={`flex items-center gap-2 max-w-sm mx-auto md:mx-0 ${className}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label="Email for security newsletter"
        className="flex-1 min-w-0 px-3 py-2 text-sm rounded-md bg-background border border-border focus:border-primary focus:outline-none transition-colors"
      />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="px-4 py-2 text-sm font-mono rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1.5"
      >
        <Send className="w-3.5 h-3.5" />
        {state === 'sending' ? '…' : 'Join'}
      </button>
      {state === 'error' && <span className="text-xs text-destructive">Failed — retry</span>}
    </form>
  );
};

export default NewsletterForm;
