import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RevealOnScroll, { RevealItem } from './RevealOnScroll';
import { FileText, Calendar, Tag, AlertTriangle, Shield, ArrowRight, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { posts } from '@/data/posts';

const blogPosts = posts;


const typeConfig = {
  cve: { icon: AlertTriangle, label: 'CVE', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
  writeup: { icon: FileText, label: 'Writeup', color: 'text-primary bg-primary/10 border-primary/30' },
  research: { icon: Shield, label: 'Research', color: 'text-accent bg-accent/10 border-accent/30' },
  tutorial: { icon: FileText, label: 'Tutorial', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' }
};

const severityColors = {
  critical: 'bg-red-500 text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-yellow-500 text-black',
  low: 'bg-blue-500 text-white'
};

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Blog</span> & Writeups
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Security research, CVE disclosures, and technical deep-dives into vulnerabilities I have discovered
          </p>
        </motion.div>

        {/* Blog Grid */}
        <RevealOnScroll staggerChildren={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => {
            const TypeIcon = typeConfig[post.type].icon;
            
            return (
              <RevealItem key={index} variant="fadeUp" className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 h-full flex flex-col hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono border ${typeConfig[post.type].color}`}>
                      <TypeIcon size={12} />
                      {typeConfig[post.type].label}
                    </span>
                    
                    {post.severity && (
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${severityColors[post.severity]}`}>
                        {post.severity}
                      </span>
                    )}
                  </div>

                  {/* CVE ID */}
                  {post.cveId && (
                    <div className="font-mono text-sm text-red-400 mb-2">
                      {post.cveId}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    
                    {post.link && (
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Read More
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealOnScroll>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="neon-outline" size="lg">
            <FileText className="mr-2" size={18} />
            View All Writeups
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
