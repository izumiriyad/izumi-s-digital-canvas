import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  text: string;
  speed?: number;
  className?: string;
}

const SectionTitle = ({ text, speed = 60, className = '' }: SectionTitleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed, hasStarted]);

  return (
    <h2 ref={ref} className={`section-title ${className}`}>
      <span className="text-gradient">
        {hasStarted ? displayedText : '\u00A0'}
        {hasStarted && !isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 align-middle"
          />
        )}
      </span>
    </h2>
  );
};

export default SectionTitle;
