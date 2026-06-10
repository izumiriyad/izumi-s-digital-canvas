import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let ctx: AudioContext | null = null;
    const beep = (freq: number) => {
      if (!ctx) ctx = new AudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = 'square'; o.frequency.value = freq;
      g.gain.value = 0.015;
      o.start(); o.stop(ctx.currentTime + 0.04);
    };
    const onClick = () => beep(880);
    const onHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button,a')) beep(440);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('mouseover', onHover);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('mouseover', onHover);
      ctx?.close();
    };
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((v) => !v)}
      className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 hover:border-primary text-muted-foreground hover:text-primary transition"
      aria-label={enabled ? 'Mute UI sounds' : 'Enable UI sounds'}
      title={enabled ? 'Mute UI sounds' : 'Enable UI sounds'}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
};

export default SoundToggle;
