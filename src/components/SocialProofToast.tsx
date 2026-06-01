import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

const events = [
  'New engagement booked · FinTech client',
  'Critical CVE disclosed · Web3 platform',
  'Engagement completed · HealthTech SaaS',
  'New 5-star review from Upwork client',
  'New engagement booked · DevOps platform',
  'Bug bounty payout · $4,500 (HackerOne)',
];

const SocialProofToast = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (dismissed) return;

    const start = setTimeout(() => setVisible(true), 5000);
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % events.length);
        setVisible(true);
      }, 500);
    }, 9000);

    return () => {
      clearTimeout(start);
      clearInterval(cycle);
    };
  }, [dismissed]);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {visible && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center gap-3 bg-card/95 backdrop-blur-md border border-primary/30 rounded-lg shadow-2xl pl-3 pr-2 py-2.5 max-w-xs"
          >
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="text-xs">
              <div className="font-medium text-foreground leading-tight">{events[index]}</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                just now · verified
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded text-muted-foreground hover:text-foreground"
              aria-label="Dismiss notification"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofToast;
