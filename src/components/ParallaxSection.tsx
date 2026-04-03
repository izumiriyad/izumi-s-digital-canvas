import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { type ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxLayer = ({ children, speed = 0.5, className = '' }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'accent';
  variant?: 'orbs' | 'grid' | 'dots' | 'minimal';
}

const ParallaxSection = ({
  children,
  className = '',
  glowColor = 'primary',
  variant = 'orbs',
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const color = glowColor === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--accent))';
  const altColor = glowColor === 'primary' ? 'hsl(var(--accent))' : 'hsl(var(--primary))';

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background layers */}
      {variant === 'orbs' && (
        <>
          <motion.div
            style={{ y: y1, opacity }}
            className="absolute pointer-events-none will-change-transform"
          >
            <div
              className="w-72 h-72 rounded-full blur-3xl absolute -top-20 -left-20"
              style={{ background: `radial-gradient(circle, ${color}10, transparent 70%)` }}
            />
          </motion.div>
          <motion.div
            style={{ y: y2, opacity }}
            className="absolute pointer-events-none will-change-transform"
          >
            <div
              className="w-96 h-96 rounded-full blur-3xl absolute top-1/3 -right-32"
              style={{ background: `radial-gradient(circle, ${altColor}08, transparent 70%)` }}
            />
          </motion.div>
          <motion.div
            style={{ y: y3, opacity }}
            className="absolute pointer-events-none will-change-transform"
          >
            <div
              className="w-64 h-64 rounded-full blur-2xl absolute bottom-0 left-1/3"
              style={{ background: `radial-gradient(circle, ${color}06, transparent 70%)` }}
            />
          </motion.div>
        </>
      )}

      {variant === 'dots' && (
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
        </motion.div>
      )}

      {variant === 'grid' && (
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(${color}20 1px, transparent 1px),
                linear-gradient(90deg, ${color}20 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>
      )}

      {variant === 'minimal' && (
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute pointer-events-none will-change-transform"
        >
          <div
            className="w-[500px] h-[500px] rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: `radial-gradient(circle, ${color}06, transparent 60%)` }}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxSection;
