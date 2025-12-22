import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  type: 'prompt' | 'command' | 'output';
  content: string;
}

const initialLines: TerminalLine[] = [
  { type: 'prompt', content: '┌─[izumi@security]─[~]' },
  { type: 'command', content: '└─$ whoami' },
  { type: 'output', content: 'izumi - Security Researcher & Offensive Engineer' },
  { type: 'command', content: '└─$ ls -la tools/' },
  { type: 'output', content: 'drwxr-xr-x 6 izumi izumi 192 Jul 07 2025 PhantomBackend/' },
  { type: 'output', content: 'drwxr-xr-x 4 izumi izumi 128 Jul 07 2025 BugBountyPro/' },
  { type: 'output', content: 'drwxr-xr-x 8 izumi izumi 256 Jul 07 2025 UltraAPIScanner/' },
];

const commands: Record<string, string[]> = {
  help: [
    '╔══════════════════════════════════════════════════════╗',
    '║ Available Commands:                                   ║',
    '╠══════════════════════════════════════════════════════╣',
    '║ help      - Show this help message                   ║',
    '║ whoami    - Display user information                 ║',
    '║ skills    - List technical skills                    ║',
    '║ projects  - Show project portfolio                   ║',
    '║ contact   - Display contact information              ║',
    '║ scan      - Simulate target scan                     ║',
    '║ clear     - Clear terminal                           ║',
    '╚══════════════════════════════════════════════════════╝',
  ],
  whoami: [
    'Aftab Ahomod Riyad (Izumi)',
    '├── Role: Security Researcher | Offensive Engineer',
    '├── Location: Dhaka, Bangladesh (GMT+6)',
    '├── Experience: 5+ years in offensive security',
    '└── Specialization: API Security, Automation, OSINT',
  ],
  skills: [
    '╔═══════════════════════════════════════════════════════╗',
    '║ [+] Programming: Python, JavaScript, Go, Bash        ║',
    '║ [+] Security: Burp Suite, Nmap, Nuclei, Metasploit   ║',
    '║ [+] Frameworks: React, Node.js, Express, Docker      ║',
    '║ [+] Specialties: API Pentesting, Auth Bypass, OSINT  ║',
    '╚═══════════════════════════════════════════════════════╝',
  ],
  projects: [
    '╔═══════════════════════════════════════════════════════════════╗',
    '║ [01] Phantom Backend Cloud v4.0 - Enterprise Recon Platform  ║',
    '║ [02] Bug Bounty Hunter Pro - Automation Suite                ║',
    '║ [03] Ultra API Scanner - API Security Framework              ║',
    '║ [04] Fake bKash Gateway - Payment Simulation System          ║',
    '╚═══════════════════════════════════════════════════════════════╝',
  ],
  contact: [
    '╔═══════════════════════════════════════════════════════╗',
    '║ Email    : amiizumi00@gmail.com                      ║',
    '║ LinkedIn : linkedin.com/in/zeroizumi                 ║',
    '║ GitHub   : github.com/izumiriyad                     ║',
    '║ Upwork   : Available for freelance projects          ║',
    '╚═══════════════════════════════════════════════════════╝',
  ],
  scan: [
    '[*] Initializing reconnaissance module...',
    '[*] Target: example.com',
    '[+] Subdomain enumeration: 23 found',
    '[+] Open ports: 80, 443, 8080, 8443',
    '[+] Technologies: nginx/1.21.0, Node.js, React',
    '[!] Potential vulnerabilities: 3 found',
    '[✓] Scan complete. Report saved to /tmp/recon_report.txt',
  ],
};

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add the command to lines
    setLines(prev => [
      ...prev,
      { type: 'command', content: `└─$ ${cmd}` },
    ]);

    if (trimmedCmd === 'clear') {
      setLines([{ type: 'prompt', content: '┌─[izumi@security]─[~]' }]);
      return;
    }

    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const output = commands[trimmedCmd] || [`Command not found: ${cmd}`, 'Type "help" for available commands.'];
    
    // Type out each line with delay
    for (const line of output) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setLines(prev => [...prev, { type: 'output', content: line }]);
    }

    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="terminal w-full max-w-lg"
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot bg-destructive" />
          <div className="terminal-dot bg-warning" />
          <div className="terminal-dot bg-primary" />
        </div>
        <span className="text-muted-foreground text-sm font-mono ml-4">
          phantom_terminal v4.0
        </span>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalBodyRef}
        className="terminal-body h-64 overflow-y-auto"
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="terminal-line"
          >
            <span
              className={
                line.type === 'prompt'
                  ? 'prompt'
                  : line.type === 'command'
                  ? 'command'
                  : 'output'
              }
            >
              {line.content}
            </span>
          </motion.div>
        ))}
        
        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="prompt">└─$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Try: help, scan, skills..."
            className="flex-1 bg-transparent border-none text-accent font-mono text-sm ml-2 outline-none placeholder:text-muted-foreground/50"
          />
          <span className="text-primary cursor-blink">▌</span>
        </form>
      </div>

      {/* Command Hint */}
      <div className="p-3 border-t border-border bg-primary/5">
        <p className="text-xs text-primary font-mono">
          💡 Try: <code className="bg-primary/10 px-1 rounded">help</code>,{' '}
          <code className="bg-primary/10 px-1 rounded">scan</code>,{' '}
          <code className="bg-primary/10 px-1 rounded">skills</code>
        </p>
      </div>
    </motion.div>
  );
};

export default Terminal;
