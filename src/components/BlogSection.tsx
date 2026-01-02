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
    title: "Information Disclosure in Remitly Payment Platform",
    excerpt: "Discovered a critical information disclosure vulnerability in Remitly (Bug #3116964) that could lead to potential account takeover through exposed sensitive user data.",
    date: "2024-08-15",
    tags: ["Information Disclosure", "Payment Security", "HackerOne"],
    type: "cve",
    cveId: "Bug #3116964",
    severity: "high",
    link: "https://www.linkedin.com/in/zeroizumi/recent-activity/all/"
  },
  {
    title: "SSRF to RCE: Chaining Vulnerabilities for Maximum Impact",
    excerpt: "Deep dive into my methodology for discovering and chaining SSRF vulnerabilities to achieve Remote Code Execution, with real-world case studies from penetration testing engagements.",
    date: "2024-06-20",
    tags: ["SSRF", "RCE", "Exploitation"],
    type: "writeup",
    link: "https://www.linkedin.com/in/zeroizumi/recent-activity/all/"
  },
  {
    title: "Payment Gateway OTP Bypass Techniques",
    excerpt: "Analysis of OTP/PIN verification flaws in fintech platforms including race conditions, TOCTOU attacks, and transaction manipulation vulnerabilities that saved clients $500K+ in potential fraud.",
    date: "2024-05-10",
    tags: ["Fintech", "OTP Bypass", "Business Logic"],
    type: "research",
    link: "https://www.linkedin.com/in/zeroizumi/recent-activity/all/"
  },
  {
    title: "Hunting IDOR Chains in Financial APIs",
    excerpt: "My approach to discovering and exploiting chained IDOR vulnerabilities in financial applications, including BOLA/IDOR detection patterns and permission matrix testing techniques.",
    date: "2024-04-05",
    tags: ["IDOR", "API Security", "BOLA"],
    type: "writeup",
    link: "https://www.linkedin.com/in/zeroizumi/recent-activity/all/"
  },
  {
    title: "Building UltraAPI: 70% Faster API Security Testing",
    excerpt: "How I built a comprehensive API security framework that automates endpoint enumeration, JWT/OAuth exploitation, and rate-limit bypass testing, now adopted by 5+ security teams.",
    date: "2024-03-18",
    tags: ["Automation", "API Testing", "Tools"],
    type: "tutorial",
    link: "https://www.linkedin.com/in/zeroizumi/recent-activity/all/"
  },
  {
    title: "Rate-Limit Bypass: From Enumeration to Account Takeover",
    excerpt: "Comprehensive guide on identifying and exploiting rate-limit vulnerabilities for user enumeration, credential stuffing, and authentication bypass in modern web applications.",
    date: "2024-02-22",
    tags: ["Rate-Limit", "Auth Bypass", "Bug Bounty"],
    type: "research",
    link: "https://www.linkedin.com/in/zeroizumi/recent-activity/all/"
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
          className="section-header"
        >
          <h2 className="section-title">
            <span className="glitch-text text-gradient" data-text="Blog & Writeups">Blog & Writeups</span>
          </h2>
          <p className="section-subtitle">
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
