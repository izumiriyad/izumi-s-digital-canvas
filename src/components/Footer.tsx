import { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Github, Linkedin, Youtube, Mail, Heart, Code, Send, CheckCircle2 } from 'lucide-react';

const NewsletterForm = () => {
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
        body: JSON.stringify({ email, _subject: 'Newsletter signup', source: 'footer-newsletter' }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <p className="flex items-center gap-2 text-sm text-primary font-mono">
        <CheckCircle2 className="w-4 h-4" /> Subscribed — see you in the next intel drop.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 max-w-sm mx-auto md:mx-0">
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-secondary/30">
      <div className="container mx-auto px-6">
        <RevealOnScroll variant="fadeUp" className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="font-mono text-xl font-bold mb-2 inline-block">
              <span className="text-accent">$</span>{' '}
              <span className="text-primary">izumi_</span>
            </a>
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-start flex-wrap">
              © {currentYear} Aftab Ahomod Riyad. Built with{' '}
              <Heart className="w-4 h-4 text-destructive inline" /> for breaking & securing systems.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/izumiriyad' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/zeroizumi/' },
              { icon: Youtube, href: 'https://www.youtube.com/@learnearning24' },
              { icon: Mail, href: 'mailto:amiizumi00@gmail.com' },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-end">
              <Code className="w-4 h-4 text-primary" />
              Built with React, TypeScript & Tailwind
            </p>
          </div>
        </RevealOnScroll>

        {/* Newsletter */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            <span className="font-mono text-primary">newsletter</span> — monthly security research, CVE analysis & tooling drops.
          </p>
          <NewsletterForm />
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-center text-xs text-muted-foreground font-mono">
            <span className="text-primary">root@izumi:</span>~# echo "Securing the digital frontier, one exploit at a time."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
