import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type TransitionStyle = 'slide-up' | 'slide-left' | 'slide-right' | 'zoom' | 'flip' | 'curtain';

const transitionVariants: Record<TransitionStyle, Variants> = {
  'slide-up': {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -120, rotateY: 8 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 120, rotateY: -8 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  flip: {
    hidden: { opacity: 0, rotateX: 15, y: 60, transformPerspective: 1200 },
    visible: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1200 },
  },
  curtain: {
    hidden: { opacity: 0, scaleY: 0.6, originY: 1 },
    visible: { opacity: 1, scaleY: 1, originY: 1 },
  },
};

interface SectionTransitionProps {
  children: ReactNode;
  style?: TransitionStyle;
  delay?: number;
  duration?: number;
  className?: string;
}

const SectionTransition = ({
  children,
  style = 'slide-up',
  delay = 0,
  duration = 0.8,
  className = '',
}: SectionTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={transitionVariants[style]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;
