import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { GA_CONSENT_KEY, getAnalyticsConsent, initGoogleAnalytics } from "@/lib/gtag";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getAnalyticsConsent() === "unset") {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(GA_CONSENT_KEY, granted ? "granted" : "denied");
    } catch {
      /* noop */
    }
    if (granted) initGoogleAnalytics();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[90] rounded-lg border border-border bg-card/95 backdrop-blur-md shadow-xl p-4"
          role="dialog"
          aria-label="Cookie consent"
        >
          <button
            onClick={() => decide(false)}
            aria-label="Dismiss"
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">Analytics cookies</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                I use privacy-friendly analytics (IP anonymized) to see which pages help visitors most.
                No data is sold or shared. Accept to opt in.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => decide(true)}
                  className="px-4 py-1.5 text-xs font-mono rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Accept
                </button>
                <button
                  onClick={() => decide(false)}
                  className="px-4 py-1.5 text-xs font-mono rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
