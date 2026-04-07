import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const useTypingSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBeep = useCallback((type: 'tick' | 'message' | 'done' = 'tick') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'tick') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
      } else if (type === 'message') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
      } else {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.setValueAtTime(900, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1200, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // Audio not supported
    }
  }, []);

  return playBeep;
};

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing Security Framework...');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playBeep = useTypingSound();
  const prevTextRef = useRef(text);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF{}[]<>/\\|!@#$%^&*()';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.98
          ? '#0099ff'
          : `rgba(0, 255, 136, ${0.3 + Math.random() * 0.7})`;
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Progress logic
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
          setTimeout(onComplete, 800);
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
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      >
        {/* Matrix Rain Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ opacity: 0.3 }}
        />

        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.03) 2px, rgba(0,255,136,0.03) 4px)',
          }}
        />

        {/* Glitch Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative z-10"
        >
          <div className="relative">
            <span className="text-5xl font-mono font-bold block loading-glitch" data-text="$ izumi_">
              <span className="text-accent">$</span>{' '}
              <span className="text-primary text-neon">izumi_</span>
            </span>
          </div>
        </motion.div>

        {/* Loading Text with glitch */}
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-primary text-lg mb-8 relative z-10 loading-glitch-text"
        >
          <span className="text-accent">&gt;</span> {text}
          <span className="inline-block w-2 h-5 bg-primary ml-1 cursor-blink" />
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 h-1.5 bg-secondary/50 rounded-full overflow-hidden relative z-10 border border-border/30">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: 'linear-gradient(90deg, hsl(152 100% 50%), hsl(207 100% 50%))',
              boxShadow: '0 0 15px hsl(152 100% 50% / 0.6), 0 0 30px hsl(152 100% 50% / 0.3)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.div className="mt-4 font-mono text-primary/80 text-sm relative z-10">
          [{Math.floor(progress).toString().padStart(3, '0')}%] {progress >= 100 ? 'ACCESS GRANTED' : 'LOADING...'}
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 font-mono text-xs text-primary/30 z-10">
          ┌─ SYS.BOOT v4.2.1
        </div>
        <div className="absolute top-4 right-4 font-mono text-xs text-primary/30 z-10">
          MEM: 64GB ─┐
        </div>
        <div className="absolute bottom-4 left-4 font-mono text-xs text-primary/30 z-10">
          └─ SECURE_CHANNEL
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-xs text-primary/30 z-10">
          ENCRYPTED ─┘
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
