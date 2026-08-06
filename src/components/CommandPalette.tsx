import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import {
  Home,
  Briefcase,
  FileText,
  Mail,
  Star,
  DollarSign,
  HelpCircle,
  ShieldAlert,
  Sun,
  Moon,
  Copy,
  Linkedin,
  Github,
  Wrench,
  Terminal,
  Scale,
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useToast } from '@/hooks/use-toast';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const go = (anchor: string) => {
    setOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/' + anchor);
    } else {
      document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const visit = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText('aftabahomodriyad@gmail.com');
    toast({ title: 'Email copied', description: 'aftabahomodriyad@gmail.com' });
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command palette" className="w-full">
              <Command.Input
                placeholder="Type a command or search…"
                className="w-full bg-transparent border-b border-border px-4 py-3 text-sm focus:outline-none"
                autoFocus
              />
              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2 py-2">
                  <Item icon={Home} onSelect={() => go('#home')}>Home</Item>
                  <Item icon={Briefcase} onSelect={() => go('#projects')}>Projects</Item>
                  <Item icon={FileText} onSelect={() => go('#blog')}>Blog</Item>
                  <Item icon={Star} onSelect={() => go('#testimonials')}>Testimonials</Item>
                  <Item icon={DollarSign} onSelect={() => go('#pricing')}>Pricing</Item>
                  <Item icon={HelpCircle} onSelect={() => go('#faq')}>FAQ</Item>
                  <Item icon={ShieldAlert} onSelect={() => go('#scorecard')}>Free security scorecard</Item>
                  <Item icon={DollarSign} onSelect={() => go('#retainers')}>Retainers</Item>
                  <Item icon={Mail} onSelect={() => go('#contact')}>Contact</Item>

                </Command.Group>

                <Command.Group heading="Pages" className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2 py-2">
                  <Item icon={ShieldAlert} onSelect={() => visit('/cve')}>
                    Disclosed CVEs
                  </Item>
                  <Item icon={Wrench} onSelect={() => visit('/services')}>
                    All services
                  </Item>
                  <Item icon={FileText} onSelect={() => visit('/report')}>
                    Sample pentest report
                  </Item>
                  <Item icon={Terminal} onSelect={() => visit('/whoami')}>
                    whoami terminal
                  </Item>
                  <Item icon={Scale} onSelect={() => visit('/compare')}>
                    Compare vs agencies
                  </Item>
                </Command.Group>

                <Command.Group heading="Actions" className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2 py-2">
                  <Item icon={Copy} onSelect={copyEmail}>Copy email address</Item>
                  <Item
                    icon={theme === 'dark' ? Sun : Moon}
                    onSelect={() => {
                      toggleTheme();
                      setOpen(false);
                    }}
                  >
                    Toggle {theme === 'dark' ? 'light' : 'dark'} theme
                  </Item>
                </Command.Group>

                <Command.Group heading="Links" className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2 py-2">
                  <Item icon={Linkedin} onSelect={() => window.open('https://www.linkedin.com/in/zeroizumi/', '_blank')}>
                    LinkedIn profile
                  </Item>
                  <Item icon={Briefcase} onSelect={() => window.open('https://www.upwork.com/freelancers/~012d71f9fb100a123f', '_blank')}>
                    Hire on Upwork
                  </Item>
                  <Item icon={Briefcase} onSelect={() => window.open('https://www.fiverr.com/s/xXRPgBx', '_blank')}>
                    Hire on Fiverr
                  </Item>
                </Command.Group>
              </Command.List>
              <div className="border-t border-border px-4 py-2 text-[10px] font-mono text-muted-foreground flex justify-between">
                <span>↑↓ navigate · ⏎ select · esc close</span>
                <span>⌘K to toggle</span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
};

const Item = ({
  icon: Icon,
  children,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  onSelect: () => void;
}) => (
  <Command.Item
    onSelect={onSelect}
    className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm text-foreground hover:bg-primary/10 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
  >
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </Command.Item>
);

export default CommandPalette;
