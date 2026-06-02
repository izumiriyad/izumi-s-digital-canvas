import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Replace with your real Calendly URL when you have it.
const CALENDLY_URL = 'https://calendly.com/zeroizumi/30min';

const CalendlyEmbed = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="book" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                Free 30-min discovery call
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Book a <span className="text-primary">scoping call</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pick a time that works. We'll scope your engagement, threat model,
              and timeline — no pressure, no fluff.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden shadow-[0_0_40px_hsl(152_100%_50%/0.1)]">
            {!loaded ? (
              <div className="aspect-[4/3] md:aspect-[16/10] flex flex-col items-center justify-center gap-4 p-8">
                <Calendar className="w-12 h-12 text-primary" />
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  Load the interactive booking calendar to pick a time.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="neon" onClick={() => setLoaded(true)}>
                    Load calendar
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Open in new tab <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <iframe
                src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0a0a&text_color=e5e5e5&primary_color=00ff85`}
                title="Schedule a call"
                className="w-full h-[700px] border-0"
                loading="lazy"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalendlyEmbed;
