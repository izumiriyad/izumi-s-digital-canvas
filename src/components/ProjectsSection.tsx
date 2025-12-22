import { motion } from 'framer-motion';
import { ExternalLink, Mail, Play, Download, Code, BookOpen, BarChart } from 'lucide-react';

const projects = [
  {
    title: 'Phantom Backend Cloud v4.0',
    type: 'Enterprise Cloud Platform',
    description:
      'Enterprise-grade cloud recon and API testing platform with ML-based threat scoring, subdomain enumeration, API leak detection, passive recon engine, and CVE fetching capabilities.',
    tech: ['Bash', 'Python', 'Docker', 'Kubernetes', 'ML'],
    links: [
      { label: 'Live Demo', icon: ExternalLink, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Request Access', icon: Mail, href: '#contact' },
    ],
    featured: true,
  },
  {
    title: 'Bug Bounty Hunter Pro',
    type: 'Automation Suite',
    description:
      'End-to-end bounty hunting automation suite with multi-threaded payloads, auth bypass techniques, token brute-forcing, X-Forwarded logic, and intelligent CLI interface.',
    tech: ['Python', 'Go', 'FFUF', 'Nuclei', 'CLI'],
    links: [
      { label: 'Demo Results', icon: BarChart, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Get Tool', icon: Download, href: '#contact' },
    ],
  },
  {
    title: 'Ultra API Scanner',
    type: 'API Security Framework',
    description:
      'Advanced API security scanner with JWT analysis, GraphQL testing, IDOR/BOLA detection, authentication fuzzing, smart mutation capabilities, and dynamic CLI interface.',
    tech: ['Python', 'GraphQL', 'REST', 'OAuth', 'JWT'],
    links: [
      { label: 'Watch Demo', icon: Play, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Documentation', icon: BookOpen, href: '#contact' },
    ],
  },
  {
    title: 'Fake bKash Payment Gateway Suite',
    type: 'Payment Simulation System',
    description:
      'Realistic fake PSP system with complete frontend and backend, client branding, callback logic, API key management, and test integration capabilities for security research.',
    tech: ['React', 'Node.js', 'Express', 'JSON', 'API'],
    links: [
      { label: 'Live Demo', icon: ExternalLink, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Source Code', icon: Code, href: '#contact' },
    ],
  },
  {
    title: 'LinkedIn Smart Apply Bot',
    type: 'Automation Tool',
    description:
      'Advanced job application automation with smart form filling, resume optimization, cover letter generation, and application tracking features.',
    tech: ['Python', 'Selenium', 'AI', 'Automation'],
    links: [
      { label: 'Demo', icon: Play, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Request Access', icon: Mail, href: '#contact' },
    ],
  },
  {
    title: 'UAE Crypto OSINT Project',
    type: 'Intelligence Gathering',
    description:
      'Comprehensive crypto wallet leak tracking system using breach databases and dark web scanning. Delivered for international client with repeat orders.',
    tech: ['Python', 'OSINT', 'Blockchain', 'Dark Web'],
    links: [
      { label: 'Case Study', icon: BookOpen, href: '#contact' },
    ],
    highlight: '$200 Client Project',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ProjectsSection = () => {
  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="text-gradient">Arsenal & Projects</span>
          </h2>
          <p className="section-subtitle">
            Custom-built security tools and automation systems designed for real-world
            penetration testing and bug bounty hunting.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-card border border-border rounded-xl overflow-hidden card-hover group ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Project Image/Icon Area */}
              <div className="relative h-48 bg-gradient-to-br from-secondary to-card flex items-center justify-center overflow-hidden">
                {/* Grid Pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,255,136,0.03) 10px, rgba(0,255,136,0.03) 20px)',
                  }}
                />
                
                {/* Icon */}
                <Code className="w-16 h-16 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />

                {/* Highlight Badge */}
                {project.highlight && (
                  <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-mono border border-primary/30">
                    {project.highlight}
                  </div>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-mono border border-accent/30">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
                  {project.type}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.links.map((link, i) => (
                    <button
                      key={i}
                      onClick={() => handleLinkClick(link.href)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
