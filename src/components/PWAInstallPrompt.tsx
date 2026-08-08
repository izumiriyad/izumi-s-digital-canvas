import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { track } from '@/lib/analytics';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'izumi_pwa_dismissed';

const PWAInstallPrompt = () => {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      track('pwa_install_prompt');
    };
    const onInstalled = () => {
      setPromptEvent(null);
      track('pwa_installed');
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setPromptEvent(null);
  };

  const install = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  };

  return (
    <AnimatePresence>
      {promptEvent && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs rounded-xl border border-primary/30 bg-card/95 p-4 backdrop-blur shadow-lg"
          role="dialog"
          aria-label="Install this site as an app"
        >
          <button
            onClick={dismiss}
            aria-label="Dismiss install prompt"
            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="font-mono text-xs text-primary">./install</p>
          <p className="mt-1 text-sm text-foreground">
            Install the portfolio for offline access and instant launch.
          </p>
          <button
            onClick={install}
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/20"
          >
            <Download className="h-3.5 w-3.5" /> Install app
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
