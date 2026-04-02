import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scaleX = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
      scaleX.set(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scaleX]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
        boxShadow: scrollProgress > 0 ? '0 0 10px hsl(var(--primary) / 0.5)' : 'none',
      }}
    />
  );
};

export default ScrollProgress;
