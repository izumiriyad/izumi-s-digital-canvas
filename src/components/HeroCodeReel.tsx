import { useEffect, useRef } from 'react';

const LINES = [
  '$ nmap -sV -p- --min-rate=5000 target.corp',
  '> 22/tcp open  ssh     OpenSSH 8.9p1',
  '> 443/tcp open https   nginx 1.24.0',
  '$ ffuf -u https://api.target.corp/v1/FUZZ -w wordlist.txt',
  '> [200] /v1/internal/debug',
  '> [403] /v1/admin/users',
  '$ sqlmap -u "https://target.corp/login" --batch --dbs',
  '> available databases [3]: prod_users, billing, auth',
  '$ python3 exploit.py --target target.corp --payload reverse_shell',
  '> [+] shell obtained as www-data',
  '$ linpeas.sh | tee priv-esc.log',
  '> [CRITICAL] sudo NOPASSWD on /usr/bin/python',
  '> [+] root via GTFOBins technique',
  '$ generate-report --severity critical --client target',
  '> report written to /reports/2026-engagement.pdf',
];

const HeroCodeReel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let y = 0;
    const step = () => {
      y -= 0.3;
      if (y < -el.scrollHeight / 2) y = 0;
      el.style.transform = `translateY(${y}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const loop = [...LINES, ...LINES];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.07] dark:opacity-[0.10] select-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10"
      />
      <div
        ref={ref}
        className="font-mono text-[11px] md:text-xs leading-relaxed text-primary px-6 will-change-transform"
      >
        {loop.map((l, i) => (
          <div key={i} className="whitespace-nowrap">
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCodeReel;
