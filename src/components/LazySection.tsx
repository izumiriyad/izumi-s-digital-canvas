import { ReactNode, Suspense, useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: ReactNode;
  /** Reserved space before mount so scroll position never jumps. */
  minHeight?: number;
  /** How early (px) to start mounting before the section enters view. */
  rootMargin?: string;
  label?: string;
}

/**
 * Defers mounting a heavy section until it is about to enter the viewport.
 * Keeps the homepage's initial render cheap without changing its layout.
 */
const LazySection = ({
  children,
  minHeight = 480,
  rootMargin = '400px 0px',
  label = 'section',
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);

    // Safety net: mount everything once the browser is idle so hash links
    // (#contact, #pricing, …) and in-page search always resolve.
    const idle = window.setTimeout(() => setVisible(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(idle);
    };
  }, [visible, rootMargin]);

  const placeholder = (
    <div
      className="flex items-center justify-center"
      style={{ minHeight }}
      aria-hidden="true"
    >
      <span className="font-mono text-xs text-muted-foreground/60 animate-pulse">
        loading {label}…
      </span>
    </div>
  );

  return (
    <div ref={ref}>
      {visible ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
    </div>
  );
};

export default LazySection;
