import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Terminal, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

const PortalHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const { profile, user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <Link to="/" className="font-mono text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> izumi_
          </Link>
          <h1 className="font-mono text-lg font-bold truncate">
            <span className="text-accent">$</span> {title}
          </h1>
          {subtitle && <p className="text-xs text-muted-foreground font-mono truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block text-right mr-2">
            <p className="text-xs font-mono text-foreground truncate max-w-[180px]">
              {profile?.full_name || user?.email}
            </p>
            {profile?.company && <p className="text-[10px] text-muted-foreground truncate">{profile.company}</p>}
          </div>
          {isAdmin && (
            <>
              <Button size="sm" variant="outline" className="font-mono" onClick={() => navigate('/portal')}>
                <LayoutDashboard className="w-3.5 h-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">portal</span>
              </Button>
              <Button size="sm" variant="outline" className="font-mono" onClick={() => navigate('/portal/admin')}>
                <ShieldCheck className="w-3.5 h-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">admin</span>
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="font-mono"
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
          >
            <LogOut className="w-3.5 h-3.5 sm:mr-1.5" />
            <span className="hidden sm:inline">exit</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
