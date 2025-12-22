import { motion } from 'framer-motion';
import { Github, Linkedin, Youtube, Mail, Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <a href="#home" className="font-mono text-xl font-bold mb-2 inline-block">
              <span className="text-accent">$</span>{' '}
              <span className="text-primary">izumi_</span>
            </a>
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-start flex-wrap">
              © {currentYear} Aftab Ahomod Riyad. Built with{' '}
              <Heart className="w-4 h-4 text-destructive inline" /> for breaking & securing systems.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {[
              { icon: Github, href: 'https://github.com/izumiriyad' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/zeroizumi/' },
              { icon: Youtube, href: 'https://www.youtube.com/@learnearning24' },
              { icon: Mail, href: 'mailto:amiizumi00@gmail.com' },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-end">
              <Code className="w-4 h-4 text-primary" />
              Built with React, TypeScript & Tailwind
            </p>
          </motion.div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-center text-xs text-muted-foreground font-mono">
            <span className="text-primary">root@izumi:</span>~# echo "Securing the digital frontier, one exploit at a time."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
