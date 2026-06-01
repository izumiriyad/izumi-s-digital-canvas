import { motion } from 'framer-motion';

const AvailabilityBadge = () => {
  return (
    <motion.a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm hover:border-primary/60 transition-colors group"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <span className="text-xs font-mono uppercase tracking-wider text-primary">
        Booking Q3 2026 · 2 slots left
      </span>
    </motion.a>
  );
};

export default AvailabilityBadge;
