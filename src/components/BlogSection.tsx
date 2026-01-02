import { motion } from 'framer-motion';
import { FileText, ExternalLink, Calendar, Tag, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  type: 'writeup' | 'cve' | 'research' | 'tutorial';
  link?: string;
  cveId?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
}

const blogPosts: BlogPost[] = [
  {
    title: "CVE-2024-XXXX: Authentication Bypass in Popular CMS",
    excerpt: "Discovered a critical authentication bypass vulnerability affecting thousands of websites. The flaw allowed attackers to gain admin access without valid credentials.",
    date: "2024-01-15",
    tags: ["Authentication", "Web Security", "CMS"],
    type: "cve",
    cveId: "CVE-2024-XXXX",
    severity: "critical",
    link: "#"
  },
  {
    title: "Hunting IDOR Vulnerabilities at Scale",
    excerpt: "A deep dive into my methodology for finding Insecure Direct Object Reference vulnerabilities using custom automation tools and pattern recognition.",
    date: "2024-02-20",
    tags: ["IDOR", "Bug Bounty", "Automation"],
    type: "writeup",
    link: "#"
  },
  {
    title: "Building a Custom Subdomain Enumeration Pipeline",
    excerpt: "How I built a comprehensive subdomain enumeration system combining multiple tools, APIs, and custom scripts for maximum coverage.",
    date: "2024-03-10",
    tags: ["Reconnaissance", "Automation", "Python"],
    type: "tutorial",
    link: "#"
  },
  {
    title: "SQL Injection to RCE: A Bug Bounty Journey",
    excerpt: "Documenting my process of escalating a simple SQL injection to full remote code execution on a major platform, earning a $10,000 bounty.",
    date: "2024-04-05",
    tags: ["SQLi", "RCE", "Bug Bounty"],
    type: "writeup",
    link: "#"
  },
  {
    title: "Bypassing WAF Protections: Techniques & Case Studies",
    excerpt: "An analysis of common WAF bypass techniques with real-world examples from my penetration testing engagements.",
    date: "2024-05-18",
    tags: ["WAF", "Bypass", "Penetration Testing"],
    type: "research",
    link: "#"
  },
  {
    title: "CVE-2023-YYYY: SSRF in Cloud Provider API",
    excerpt: "Found a Server-Side Request Forgery vulnerability in a major cloud provider that could leak internal metadata and credentials.",
    date: "2023-11-22",
    tags: ["SSRF", "Cloud Security", "API"],
    type: "cve",
    cveId: "CVE-2023-YYYY",
    severity: "high",
    link: "#"
  }
];

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => {
            const TypeIcon = typeConfig[post.type].icon;
            
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
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
              </motion.article>
            );
          })}
        </div>

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
