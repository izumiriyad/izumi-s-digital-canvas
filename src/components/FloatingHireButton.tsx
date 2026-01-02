import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const FloatingHireButton = () => {
  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-neon-green to-electric-blue text-background font-bold rounded-full shadow-lg shadow-neon-green/30 hover:shadow-neon-green/50 transition-shadow duration-300"
    >
      <Briefcase className="w-5 h-5" />
      <span>Hire Me</span>
    </motion.button>
  );
};

export default FloatingHireButton;
