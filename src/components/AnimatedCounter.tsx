import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  label: string;
  duration?: number;
}

const AnimatedCounter = ({ value, label, duration = 2 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  
  // Extract numeric value and suffix (e.g., "200+" -> 200, "+")
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * numericValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold font-mono text-primary relative">
        <span className="relative">
          {count}{suffix}
          {/* Glow effect */}
          <span className="absolute inset-0 blur-sm text-primary/50">
            {count}{suffix}
          </span>
        </span>
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;
