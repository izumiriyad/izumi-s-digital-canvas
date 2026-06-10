import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull } from 'lucide-react';

const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const KonamiRedTeam = () => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-SEQ.length);
      if (SEQ.every((k, i) => buf[i]?.toLowerCase() === k.toLowerCase())) {
        setActive(true);
        document.documentElement.classList.add('red-team');
        setTimeout(() => {
          document.documentElement.classList.remove('red-team');
          setActive(false);
        }, 8000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <style>{`.red-team { filter: hue-rotate(-130deg) saturate(1.4); }`}</style>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-lg bg-destructive/20 border border-destructive backdrop-blur-md flex items-center gap-2 text-destructive font-mono text-sm"
          >
            <Skull className="w-4 h-4 animate-pulse" />
            RED TEAM MODE ENGAGED
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KonamiRedTeam;
