import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Command as CommandIcon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (!isHome) return;
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) {
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openPalette = () => {
    setIsMobileMenuOpen(false);
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true })
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleClick('#home');
            }}
            className="font-mono text-xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-accent">$</span>{' '}
            <span className="text-primary">izumi_</span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className={`relative font-medium transition-colors duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/services"
                className={`relative font-medium transition-colors duration-300 ${
                  location.pathname.startsWith('/services') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/cve"
                className={`relative font-medium transition-colors duration-300 ${
                  location.pathname === '/cve' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                CVEs
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            {/* Command palette trigger */}
            <button
              onClick={openPalette}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              aria-label="Open command palette"
              title="Open command palette (⌘K)"
            >
              <CommandIcon className="w-3 h-3" /> K
            </button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground p-2"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <ul className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href);
                    }}
                    className={`block py-2 font-medium transition-colors ${
                      activeSection === item.href.slice(1)
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 font-medium text-muted-foreground"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/report"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 font-medium text-muted-foreground"
                >
                  Sample Report
                </Link>
              </li>
              <li>
                <Link
                  to="/cve"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 font-medium text-muted-foreground"
                >
                  CVEs
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
