import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

const GlitchText = ({ children, className = '', as: Component = 'span' }: GlitchTextProps) => {
  return (
    <motion.span
      className={`glitch-wrapper inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="glitch-text" data-text={typeof children === 'string' ? children : ''}>
        {children}
      </span>
    </motion.span>
  );
};

export default GlitchText;
