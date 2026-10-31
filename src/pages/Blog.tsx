import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import RevealOnScroll, { RevealItem } from '@/components/RevealOnScroll';
import { posts, postTypes, type PostType } from '@/data/posts';
import { Calendar, Tag, AlertTriangle, Shield, FileText, ArrowRight, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typeConfig: Record<PostType, { icon: typeof FileText; label: string; color: string }> = {
  cve: { icon: AlertTriangle, label: 'CVE', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
  writeup: { icon: FileText, label: 'Writeup', color: 'text-primary bg-primary/10 border-primary/30' },
  research: { icon: Shield, label: 'Research', color: 'text-accent bg-accent/10 border-accent/30' },
  tutorial: { icon: FileText, label: 'Tutorial', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
};

const filters: Array<PostType | 'all'> = ['all', ...postTypes];

const Blog = () => {
  return (
    <>
      <SEO
        title="Blog & Writeups — Security Research Archive"
        description="Full archive of security research: CVE disclosures, SSRF/RCE writeups, fintech logic flaws, IDOR chains and offensive automation."
        canonical="/blog"
        image="/social/og-writeup.png"
      />
      <div className="min-h-screen pt-28 pb-24 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/30 bg-primary/5 px-3 py-1 rounded-full mb-6">
              <Rss size={12} /> research feed · <a className="underline hover:no-underline" href="/rss.xml">rss.xml</a>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Blog</span> & Writeups
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CVE disclosures, exploitation chains, and offensive methodology — the full archive, one click from the homepage feed.
            </p>
          </motion.div>

          {/* Type filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <span
                key={f}
                className={`font-mono text-xs px-3 py-1.5 rounded-md border ${
                  f === 'all'
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border bg-card/40 text-muted-foreground'
                }`}
              >
                {f === 'all' ? 'all posts' : `${typeConfig[f].label.toLowerCase()} (${posts.filter((p) => p.type === f).length})`}
              </span>
            ))}
          </div>

          {/* Archive grid */}
          <RevealOnScroll staggerChildren={0.08} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const cfg = typeConfig[post.type];
              const Icon = cfg.icon;
              return (
                <RevealItem key={post.slug} variant="fadeUp" className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <Link
                    to={`/blog/${post.slug}`}
                    className="relative flex flex-col bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono border ${cfg.color}`}>
                        <Icon size={12} />
                        {cfg.label}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{post.readMinutes} min</span>
                    </div>
                    {post.cveId && <div className="font-mono text-sm text-red-400 mb-2">{post.cveId}</div>}
                    <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-primary">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealOnScroll>

          {/* RSS CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-14"
          >
            <Button variant="neon-outline" size="lg" onClick={() => window.open('/rss.xml', '_blank')}>
              <Rss className="mr-2" size={18} />
              Subscribe via RSS
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Blog;
