import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type AnimationVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur';

const variants: Record<AnimationVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

interface RevealOnScrollProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: number;
}

const RevealOnScroll = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
  staggerChildren,
}: RevealOnScrollProps) => {
  const containerVariants: Variants = staggerChildren
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }
    : variants[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      transition={!staggerChildren ? { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RevealItem = ({
  children,
  variant = 'fadeUp',
  duration = 0.5,
  className = '',
}: {
  children: ReactNode;
  variant?: AnimationVariant;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    variants={variants[variant]}
    transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default RevealOnScroll;
