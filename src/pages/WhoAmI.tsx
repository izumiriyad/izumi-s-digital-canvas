import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const LINES = [
  'aftab@riyad-sec:~$ whoami',
  'aftab',
  'aftab@riyad-sec:~$ id',
  'uid=1337(aftab) gid=1337(redteam) groups=1337(redteam),0(root),27(sudo),100(bugbounty)',
  'aftab@riyad-sec:~$ cat /etc/passwd | grep aftab',
  'aftab:x:1337:1337:Offensive Security Engineer:/home/aftab:/bin/zsh',
  'aftab@riyad-sec:~$ uptime',
  ' 6+ years up, 500+ vulns disclosed, 50+ companies hardened',
  'aftab@riyad-sec:~$ which contact',
  '/usr/local/bin/contact → https://riyad.sec/#contact',
  'aftab@riyad-sec:~$ █',
];

const WhoAmI = () => {
  const [shown, setShown] = useState<string[]>([]);
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (line >= LINES.length) return;
    const current = LINES[line];
    if (char < current.length) {
      const t = setTimeout(() => setChar(char + 1), current.startsWith('aftab@') ? 25 : 8);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShown((s) => [...s, current]);
      setLine(line + 1);
      setChar(0);
    }, 250);
    return () => clearTimeout(t);
  }, [line, char]);

  return (
    <>
      <SEO title="whoami — Aftab Riyad" description="Terminal-style bio for Aftab Ahomod Riyad, offensive security engineer." canonical="/whoami" />
      <div className="min-h-screen bg-background text-primary font-mono p-6 md:p-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs text-muted-foreground mb-4">Last login: {new Date().toUTCString()} on tty1</div>
          {shown.map((l, i) => <div key={i}>{l}</div>)}
          {line < LINES.length && (
            <div>{LINES[line].slice(0, char)}<span className="animate-pulse">▌</span></div>
          )}
          <Link to="/" className="inline-block mt-8 text-xs text-muted-foreground hover:text-primary">
            ← cd /
          </Link>
        </div>
      </div>
    </>
  );
};

export default WhoAmI;
