import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScreenshotGalleryProps {
  screenshots: string[];
  title: string;
}

const ScreenshotGallery = ({ screenshots, title }: ScreenshotGalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => {
    setOpenIndex(null);
    setZoomed(false);
  }, []);

  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % screenshots.length));
    setZoomed(false);
  }, [screenshots.length]);

  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + screenshots.length) % screenshots.length
    );
    setZoomed(false);
  }, [screenshots.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'z' || e.key === 'Z') setZoomed((z) => !z);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, next, prev]);

  if (!screenshots?.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((src, i) => (
          <motion.button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-card hover:border-primary/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Open screenshot ${i + 1} of ${screenshots.length}`}
          >
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-mono text-foreground/90">
                {String(i + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-primary">
                <ZoomIn className="w-3.5 h-3.5" /> View
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshot ${openIndex + 1}`}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-border">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {title} ·{' '}
                <span className="text-primary">
                  {String(openIndex + 1).padStart(2, '0')} /{' '}
                  {String(screenshots.length).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                >
                  {zoomed ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={close} aria-label="Close">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Image area */}
            <div className="relative flex-1 flex items-center justify-center overflow-auto p-4 md:p-8">
              {screenshots.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={openIndex}
                  src={screenshots[openIndex]}
                  alt={`${title} screenshot ${openIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setZoomed((z) => !z)}
                  className={`rounded-lg border border-border shadow-2xl ${
                    zoomed
                      ? 'max-w-none w-auto cursor-zoom-out'
                      : 'max-h-[80vh] max-w-[90vw] object-contain cursor-zoom-in'
                  }`}
                />
              </AnimatePresence>

              {screenshots.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Thumbnails */}
            {screenshots.length > 1 && (
              <div className="border-t border-border px-4 md:px-8 py-3 overflow-x-auto">
                <div className="flex gap-2 justify-center">
                  {screenshots.map((src, i) => (
                    <button
                      key={`thumb-${i}`}
                      onClick={() => {
                        setOpenIndex(i);
                        setZoomed(false);
                      }}
                      className={`relative h-14 w-24 flex-shrink-0 rounded-md overflow-hidden border transition-all ${
                        i === openIndex
                          ? 'border-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]'
                          : 'border-border opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Go to screenshot ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Keyboard hint */}
            <div className="hidden md:block absolute bottom-20 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
              ← → navigate · Z zoom · Esc close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenshotGallery;
