import { useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isMobile = useIsMobile();

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isMobile) return;

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    const onHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]')) {
        setIsHovering(true);
      }
    };
    const onHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
      document.body.style.cursor = '';
      document.getElementById('custom-cursor-style')?.remove();
    };
  }, [isMobile, onMouseMove]);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : 1,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 rounded-full bg-primary"
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            opacity: hidden ? 0 : isHovering ? 0.6 : 0.3,
            borderColor: isHovering ? 'hsl(var(--accent))' : 'hsl(var(--primary))',
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-full border-2 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 mix-blend-difference"
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
