import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxSection from './ParallaxSection';
import SectionTitle from './SectionTitle';
import { ExternalLink, Mail, Play, Download, BookOpen, BarChart, ArrowUpRight, FileText } from 'lucide-react';
import { projects as projectData } from '@/data/projects';

const linkIcons: Record<string, typeof ExternalLink> = {
  ExternalLink, Mail, Play, Download, BookOpen, BarChart,
};

const projectExtras: Record<string, { links: { label: string; icon: typeof ExternalLink; href: string }[] }> = {
  'ultraapi-framework': {
    links: [
      { label: 'View Details', icon: ExternalLink, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Request Access', icon: Mail, href: '#contact' },
    ],
  },
  'phantom-recon-system': {
    links: [
      { label: 'Demo Results', icon: BarChart, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Get Tool', icon: Download, href: '#contact' },
    ],
  },
  'payment-gateway-security-suite': {
    links: [
      { label: 'Live Demo', icon: ExternalLink, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Documentation', icon: BookOpen, href: '#contact' },
    ],
  },
  'uae-crypto-osint-dashboard': {
    links: [
      { label: 'Watch Demo', icon: Play, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Request Access', icon: Mail, href: '#contact' },
    ],
  },
  'linkedin-automation-bot': {
    links: [
      { label: 'Demo', icon: Play, href: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/' },
      { label: 'Request Access', icon: Mail, href: '#contact' },
    ],
  },
  'bug-bounty-pro-toolkit': {
    links: [
      { label: 'Case Study', icon: BookOpen, href: '#contact' },
    ],
  },
};

const projects = projectData.map((p) => ({
  ...p,
  links: projectExtras[p.slug]?.links ?? [],
}));


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
    <ParallaxSection variant="dots" glowColor="primary">
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <SectionTitle text="Arsenal & Projects" />
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
              whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
              className={`relative bg-card border border-border rounded-xl overflow-hidden group cursor-pointer ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Animated border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))',
                  filter: 'blur(20px)',
                  transform: 'scale(1.05)',
                }}
              />
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none z-10" />

              {/* Project Image Area */}
              <div className="relative h-48 bg-gradient-to-br from-secondary to-card overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                  initial={false}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ opacity: 0.8 }}
                />
                
                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent group-hover:from-card/60 transition-colors duration-500" />

                {/* Floating arrow indicator */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary/0 group-hover:bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-transparent group-hover:border-primary/30">
                  <ArrowUpRight className="w-4 h-4 text-primary scale-0 group-hover:scale-100 transition-transform duration-300 delay-100" />
                </div>

                {/* Highlight Badge */}
                {project.highlight && (
                  <motion.div 
                    className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-mono border border-primary/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    {project.highlight}
                  </motion.div>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <motion.div 
                    className="absolute top-4 left-4 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-mono border border-accent/30 backdrop-blur-sm"
                    animate={{ 
                      boxShadow: ['0 0 0px hsl(var(--accent) / 0)', '0 0 12px hsl(var(--accent) / 0.3)', '0 0 0px hsl(var(--accent) / 0)'] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Featured
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2 group-hover:tracking-[0.2em] transition-all duration-500">
                  {project.type}
                </div>
                <Link to={`/projects/${project.slug}`} className="block">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 group-hover:text-muted-foreground/80 transition-colors">
                  {project.description}
                </p>

                {/* Tech Tags with stagger hover */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="tech-tag group-hover:border-primary/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links with hover underline */}
                <div className="flex gap-4">
                  {project.links.map((link, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleLinkClick(link.href)}
                      className="relative flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group/link"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <link.icon className="w-4 h-4" />
                      </motion.div>
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </ParallaxSection>
  );
};

export default ProjectsSection;
