import { motion } from 'framer-motion';
import { ExternalLink, Mail, Play, Download, Code, BookOpen, BarChart } from 'lucide-react';

// Project images
import ultraApiImage from '@/assets/projects/ultra-api-scanner.png';
import phantomReconImage from '@/assets/projects/phantom-backend.png';
import bkashGatewayImage from '@/assets/projects/bkash-gateway.png';
import uaeCryptoImage from '@/assets/projects/uae-crypto-osint.png';
import linkedinBotImage from '@/assets/projects/linkedin-bot.png';
import bugBountyProImage from '@/assets/projects/bug-bounty-pro.png';

const projects = [
  {
    title: 'UltraAPI Framework',
    type: 'API Security Testing Framework',
    description:
      'Advanced API security testing framework with automated endpoint enumeration, JWT/OAuth token misconfiguration detection, BOLA/IDOR scanner, rate-limit bypass automation, and mass assignment vulnerability detector. Adopted by 5+ security teams.',
    tech: ['Node.js', 'Python', 'Bash', 'REST', 'GraphQL'],
    links: [
      { label: 'View Details', icon: ExternalLink, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Request Access', icon: Mail, href: '#contact' },
    ],
    featured: true,
    highlight: '70% Time Reduction',
    image: ultraApiImage,
  },
  {
    title: 'Phantom Recon System',
    type: 'Attack Surface Mapping',
    description:
      'Comprehensive attack surface discovery integrating Amass, Subfinder, nuclei with automated subdomain takeover detection, technology fingerprinting, and continuous monitoring. Reduced recon time from 6+ hours to 15 minutes.',
    tech: ['Python', 'Bash', 'OSINT', 'Nuclei', 'Amass'],
    links: [
      { label: 'Demo Results', icon: BarChart, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Get Tool', icon: Download, href: '#contact' },
    ],
    highlight: '500+ Subdomains Found',
    image: phantomReconImage,
  },
  {
    title: 'Payment Gateway Security Suite',
    type: 'Security Training Platform',
    description:
      'Complete payment workflow simulation for security training with OTP/PIN verification testing, race condition scenarios, TOCTOU attacks, replay attack testing, and webhook exploitation. Used by security teams for training.',
    tech: ['Node.js', 'React', 'Express', 'MongoDB', 'Redis'],
    links: [
      { label: 'Live Demo', icon: ExternalLink, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Documentation', icon: BookOpen, href: '#contact' },
    ],
    image: bkashGatewayImage,
  },
  {
    title: 'UAE Crypto OSINT Dashboard',
    type: 'Breach Intelligence Platform',
    description:
      'Real-time breach intelligence monitoring platform that analyzes breach dump patterns and wallet correlations. Features dashboard visualization, breach paste correlation, and automated report generation for crypto-related security incidents.',
    tech: ['React', 'Python', 'OSINT', 'Data Analysis'],
    links: [
      { label: 'Watch Demo', icon: Play, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Request Access', icon: Mail, href: '#contact' },
    ],
    image: uaeCryptoImage,
  },
  {
    title: 'LinkedIn Automation Bot',
    type: 'Security-Focused Automation',
    description:
      'Browser automation demonstrating security implications with multi-step form automation, anti-detection flow, human-like behavior simulation, captcha handling, and session management. Used in red team engagements.',
    tech: ['Puppeteer', 'Node.js', 'Anti-Detection'],
    links: [
      { label: 'Demo', icon: Play, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Request Access', icon: Mail, href: '#contact' },
    ],
    image: linkedinBotImage,
  },
  {
    title: 'Bug Bounty Pro Toolkit',
    type: 'Security Testing Arsenal',
    description:
      'Comprehensive collection of custom security scripts including privilege escalation, auth bypass, deep reconnaissance, backend cloud analysis, and network harvesting tools. A complete toolkit for professional bug bounty hunters.',
    tech: ['Bash', 'Python', 'Shell', 'Security'],
    links: [
      { label: 'Case Study', icon: BookOpen, href: '#contact' },
    ],
    image: bugBountyProImage,
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
              {/* Project Image Area */}
              <div className="relative h-48 bg-gradient-to-br from-secondary to-card overflow-hidden">
                {/* Project Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

                {/* Highlight Badge */}
                {project.highlight && (
                  <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-mono border border-primary/30 backdrop-blur-sm">
                    {project.highlight}
                  </div>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-mono border border-accent/30 backdrop-blur-sm">
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
