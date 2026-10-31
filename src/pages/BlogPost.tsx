import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from '@/components/SEO';
import ScrollProgress from '@/components/ScrollProgress';
import NewsletterForm from '@/components/NewsletterForm';
import { posts, getPost, relatedPosts, postHeadings, type PostType } from '@/data/posts';
import { SITE_URL } from '@/lib/site';
import { Calendar, Tag, AlertTriangle, Shield, FileText, ArrowLeft, ArrowRight, Clock, List, Share2, Link2, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typeConfig: Record<PostType, { icon: typeof FileText; label: string; color: string }> = {
  cve: { icon: AlertTriangle, label: 'CVE', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
  writeup: { icon: FileText, label: 'Writeup', color: 'text-primary bg-primary/10 border-primary/30' },
  research: { icon: Shield, label: 'Research', color: 'text-accent bg-accent/10 border-accent/30' },
  tutorial: { icon: FileText, label: 'Tutorial', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
};

const severityColors: Record<string, string> = {
  critical: 'bg-red-500 text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-yellow-500 text-black',
  low: 'bg-blue-500 text-white',
};

/** slug -> "Section Title" id used by postHeadings */
const headingId = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Highlight the TOC entry for whichever section is currently in view. */
const useActiveHeading = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '');
  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join('|')]);
  return activeId;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const post = getPost(slug ?? '');

  const ordered = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), []);
  const currentIndex = post ? ordered.findIndex((p) => p.slug === post.slug) : -1;
  const newer = currentIndex > 0 ? ordered[currentIndex - 1] : null;
  const older = currentIndex >= 0 && currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : null;

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-bold mb-4">Writeup not found</h1>
        <p className="text-muted-foreground mb-8">This post may have been renamed or removed.</p>
        <Button variant="neon-outline" onClick={() => navigate('/blog')}>
          <ArrowLeft className="mr-2" size={16} /> Back to archive
        </Button>
      </div>
    );
  }

  const cfg = typeConfig[post.type];
  const TypeIcon = cfg.icon;
  const headings = postHeadings(post.content);
  const activeId = useActiveHeading(headings.map((h) => h.id));
  const related = relatedPosts(post);
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} — by Aftab Ahomod Riyad`);
  const ogImage = `${SITE_URL}/social/og-writeup.jpg`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonical);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { '@type': 'Person', name: 'Aftab Ahomod Riyad', alternateName: 'izumi' },
      url: canonical,
      image: ogImage,
      keywords: post.tags.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
      ],
    },
  ];

  const markdownComponents = {
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = Array.isArray(children) ? children.join('') : String(children ?? '');
      const id = headingId(text);
      return (
        <h2 id={id} className="text-2xl font-bold text-foreground mt-12 mb-4 scroll-mt-24 flex items-center gap-3">
          <span className="text-primary font-mono text-sm">##</span>
          {children}
        </h2>
      );
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-muted-foreground leading-relaxed mb-5">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2 mb-6 list-none">{children}</ul>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-muted-foreground leading-relaxed flex gap-2">
        <span className="text-primary font-mono">▸</span>
        <span>{children}</span>
      </li>
    ),
    pre: ({ children }: { children?: React.ReactNode }) => (
      <div className="relative mb-6 rounded-lg border border-primary/20 bg-[#020604] overflow-hidden">
        <div className="absolute top-0 right-0 px-3 py-1 font-mono text-[10px] text-primary/50 border-b border-l border-primary/20 rounded-bl">
          poc
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-primary/90">{children}</pre>
      </div>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="font-mono text-[13px]">{children}</code>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a href={href} className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
  };

  return (
    <>
      <SEO
        title={`${post.title} — Security Writeup`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        image={`/social/og-writeup.jpg`}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen pt-28 pb-24 relative">
        <ScrollProgress />
        <div className="container mx-auto px-6 max-w-6xl">
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 mb-10">
            <ArrowLeft size={14} /> cd ../blog
          </Link>

          <div className="grid lg:grid-cols-[1fr_260px] gap-12">
            {/* Article */}
            <article className="min-w-0">
              {/* Meta header */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono border ${cfg.color}`}>
                    <TypeIcon size={12} />
                    {cfg.label}
                  </span>
                  {post.severity && (
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${severityColors[post.severity]}`}>
                      {post.severity}
                    </span>
                  )}
                  {post.cveId && <span className="font-mono text-sm text-red-400">{post.cveId}</span>}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readMinutes} min read
                  </span>
                  <span className="inline-flex items-center gap-1.5 flex-wrap">
                    <Tag size={14} />
                    {post.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-muted rounded text-xs">
                        {t}
                      </span>
                    ))}
                  </span>
                </div>
              </motion.div>

              {/* Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {post.content}
                </ReactMarkdown>
              </motion.div>

              {/* Share + CTA */}
              <div className="mt-14 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Share2 size={14} /> Share this writeup
                  </span>
                  <Button variant="outline" size="sm" onClick={copyLink}>
                    {copied ? <Check size={14} className="text-primary" /> : <Link2 size={14} />}
                    {copied ? 'Copied' : 'Copy link'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(canonical)}`, '_blank')}
                  >
                    Post on X
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`, '_blank')}
                  >
                    LinkedIn
                  </Button>
                </div>

                {/* Newsletter */}
                <div className="bg-card/50 border border-border rounded-lg p-6 md:p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-2">
                      <Mail size={12} /> INTEL DROP
                    </div>
                    <h3 className="text-lg font-bold mb-1">Get the next writeup first</h3>
                    <p className="text-sm text-muted-foreground">
                      Monthly security research, CVE analysis and tooling — no noise, unsubscribe anytime.
                    </p>
                  </div>
                  <NewsletterForm source="blog-post" className="w-full md:w-auto" />
                </div>

                <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">Want this level of depth on your attack surface?</h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
                    The same methodology — chaining, authorization diffs, business-logic review — applied to your product under a scoped engagement.
                  </p>
                  <a href="/#contact">
                    <Button variant="neon">
                      Request a scoped assessment <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {headings.length > 0 && (
                  <div className="bg-card/50 border border-border rounded-lg p-5">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-primary mb-4">
                      <List size={12} /> CONTENTS
                    </div>
                    <nav className="space-y-2.5">
                      {headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className={`block text-sm transition-colors leading-snug border-l-2 pl-3 -ml-3 py-0.5 ${
                            activeId === h.id
                              ? 'text-primary border-primary'
                              : 'text-muted-foreground border-transparent hover:text-primary'
                          }`}
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
                <div className="bg-card/50 border border-border rounded-lg p-5">
                  <div className="font-mono text-xs text-accent mb-3">RELATED</div>
                  <nav className="space-y-3">
                    {related.map((r) => (
                      <Link key={r.slug} to={`/blog/${r.slug}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors leading-snug">
                        {r.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          </div>

          {/* Prev / Next */}
          <div className="mt-16 grid sm:grid-cols-2 gap-4">
            {older ? (
              <Link
                to={`/blog/${older.slug}`}
                className="group bg-card/50 border border-border rounded-lg p-5 hover:border-primary/50 transition-all duration-300"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground mb-2">
                  <ArrowLeft size={12} /> older post
                </span>
                <div className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">{older.title}</div>
              </Link>
            ) : (
              <div />
            )}
            {newer && (
              <Link
                to={`/blog/${newer.slug}`}
                className="group bg-card/50 border border-border rounded-lg p-5 hover:border-primary/50 transition-all duration-300 text-right"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground mb-2 justify-end">
                  newer post <ArrowRight size={12} />
                </span>
                <div className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">{newer.title}</div>
              </Link>
            )}
          </div>

          {/* Related cards */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-8">
              Keep <span className="text-gradient">reading</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => {
                const rc = typeConfig[r.type];
                const RIcon = rc.icon;
                return (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="group bg-card/50 border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
                  >
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono border ${rc.color} mb-4`}>
                      <RIcon size={12} />
                      {rc.label}
                    </span>
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{r.excerpt}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
