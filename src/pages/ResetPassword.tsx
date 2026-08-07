import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import SEO from '@/components/SEO';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error('Password must be at least 8 characters');
    if (password !== confirm) return toast.error('Passwords do not match');
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success('Password updated.');
    navigate('/portal', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SEO title="Reset Password — Client Portal" description="Set a new password for your client portal account." canonical="/reset-password" />
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-border bg-card/70 backdrop-blur-md p-8 space-y-4">
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-primary" />
          <h1 className="font-mono text-lg font-bold">set new password</h1>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pw" className="font-mono text-xs">New password</Label>
          <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pw2" className="font-mono text-xs">Confirm password</Label>
          <Input id="pw2" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <Button type="submit" disabled={busy} className="w-full font-mono">
          {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}update password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
