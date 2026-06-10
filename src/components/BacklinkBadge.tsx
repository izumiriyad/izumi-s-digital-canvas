import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SectionTitle from './SectionTitle';

const SNIPPET = `<a href="https://riyad.sec" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:#0a0a0a;color:#00ff88;border:1px solid #00ff88;border-radius:8px;font-family:monospace;font-size:13px;text-decoration:none">
  🛡️ Pentested by Aftab Riyad
</a>`;

const BacklinkBadge = () => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="py-16" id="badge">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-6">
          <SectionTitle text="Show It Off" />
          <p className="text-muted-foreground mt-2 text-sm">Add a "Pentested by" badge to your site</p>
        </div>
        <div className="p-6 rounded-xl border border-primary/30 bg-card/60">
          <a className="inline-flex items-center gap-2 px-3.5 py-2 bg-background text-primary border border-primary rounded-lg font-mono text-sm mb-4">
            🛡️ Pentested by Aftab Riyad
          </a>
          <pre className="text-[10px] font-mono p-3 rounded bg-background/80 border border-border overflow-x-auto">{SNIPPET}</pre>
          <button onClick={copy} className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy embed code'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BacklinkBadge;
