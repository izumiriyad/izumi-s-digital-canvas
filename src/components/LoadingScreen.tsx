import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing Security Framework...');

  useEffect(() => {
    const messages = [
      'Initializing Security Framework...',
      'Loading encryption modules...',
      'Establishing secure connection...',
      'Deploying defense protocols...',
      'System ready.',
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        setText(messages[Math.floor((next / 100) * messages.length)]);
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      >
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 10,
                opacity: 0.6,
              }}
              animate={{
                y: -10,
                opacity: [0.6, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 4}px`,
                height: `${4 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-4xl font-mono font-bold">
            <span className="text-accent">$</span>{' '}
            <span className="text-primary text-neon">izumi_</span>
          </span>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-primary text-lg mb-6 glitch"
        >
          {text}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, hsl(152 100% 50%), hsl(207 100% 50%))',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.div className="mt-4 font-mono text-muted-foreground text-sm">
          {Math.floor(progress)}%
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
