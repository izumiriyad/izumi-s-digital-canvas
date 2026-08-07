import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const RequireAuth = ({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="font-mono text-sm text-muted-foreground animate-pulse">verifying session…</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/auth?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/portal" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
