import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Check, X } from 'lucide-react';

const ROWS = [
  ['Solo senior pentester', true, false, false],
  ['Fixed-price engagements', true, false, true],
  ['Manual testing > automated scans', true, false, true],
  ['CVSS-scored, auditor-ready report', true, true, true],
  ['Free 30-day fix retest', true, false, false],
  ['Async Slack/Discord during engagement', true, false, false],
  ['72h rush availability', true, false, false],
  ['No subcontractors', true, false, false],
  ['Public CVE / hall-of-fame track record', true, true, false],
  ['Starts under $1,000', true, false, false],
];

const Compare = () => (
  <>
    <SEO title="Aftab Riyad vs Big-4 vs Bug Bounty Platforms" description="Honest comparison: independent senior pentester vs traditional consultancies vs bug bounty platforms." canonical="/compare" />
    <Navbar />
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">How I compare</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">No marketing spin — here's where I win, lose, and tie against the alternatives.</p>
        <div className="overflow-x-auto rounded-xl border border-primary/30 bg-card/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background/40">
                <th className="text-left p-4 font-mono text-xs uppercase text-muted-foreground">Feature</th>
                <th className="p-4 font-mono text-primary">Aftab Riyad</th>
                <th className="p-4 font-mono text-muted-foreground">Big-4 Firm</th>
                <th className="p-4 font-mono text-muted-foreground">Bug Bounty Platform</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, a, b, c], i) => (
                <tr key={i} className="border-b border-border/40">
                  <td className="p-4">{label}</td>
                  {[a, b, c].map((v, j) => (
                    <td key={j} className="p-4 text-center">
                      {v ? <Check className="w-5 h-5 text-primary inline" /> : <X className="w-5 h-5 text-muted-foreground/50 inline" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default Compare;
