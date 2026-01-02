import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: string;
  glitchText?: string;
}

const SectionHeader = ({ title, subtitle, glitchText }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="section-header"
    >
      <h2 className="section-title">
        {glitchText ? (
          <span className="glitch-text text-gradient" data-text={glitchText}>
            {title}
          </span>
        ) : (
          title
        )}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeader;
