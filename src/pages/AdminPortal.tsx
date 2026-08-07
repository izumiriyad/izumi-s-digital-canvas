import { useEffect, useMemo, useState } from 'react';
import { Loader2, Plus, Save, Trash2, Users } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import PortalHeader from '@/components/portal/PortalHeader';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  ENGAGEMENT_STATUSES,
  Engagement,
  MILESTONE_STATUSES,
  Milestone,
  RETAINER_TIERS,
  Retainer,
  prettify,
  statusTone,
} from '@/lib/portal';

interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  email: string | null;
}

const retainerSchema = z.object({
  client_id: z.string().uuid({ message: 'Pick a client' }),
  tier: z.string().min(1),
  status: z.string().min(1),
  monthly_hours: z.number().int().min(0).max(1000),
  hours_used: z.number().int().min(0).max(1000),
  monthly_price: z.number().int().min(0).max(1000000),
  renews_at: z.string().max(20).optional(),
  notes: z.string().max(1000).optional(),
});

const AdminPortal = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [retainers, setRetainers] = useState<Retainer[]>([]);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [retForm, setRetForm] = useState({
    client_id: '',
    tier: 'Watchtower',
    status: 'active',
    monthly_hours: '20',
    hours_used: '0',
    monthly_price: '2500',
    renews_at: '',
    notes: '',
  });

  const [msForm, setMsForm] = useState<Record<string, { title: string; due_date: string; description: string }>>({});

  const load = async () => {
    setLoading(true);
    const [p, r, e, m] = await Promise.all([
      supabase.from('profiles').select('id, full_name, company, email').order('created_at', { ascending: false }),
      supabase.from('retainers').select('*').order('created_at', { ascending: false }),
      supabase.from('engagements').select('*').order('created_at', { ascending: false }),
      supabase.from('milestones').select('*').order('sort_order', { ascending: true }),
    ]);
    if (p.error || r.error || e.error || m.error) toast.error('Could not load admin data');
    setProfiles((p.data as Profile[]) ?? []);
    setRetainers((r.data as Retainer[]) ?? []);
    setEngagements((e.data as Engagement[]) ?? []);
    setMilestones((m.data as Milestone[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const clientLabel = useMemo(
    () => (id: string) => {
      const p = profiles.find((x) => x.id === id);
      return p ? `${p.full_name || p.email || id.slice(0, 8)}${p.company ? ` · ${p.company}` : ''}` : id.slice(0, 8);
    },
    [profiles]
  );

  const createRetainer = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = retainerSchema.safeParse({
      ...retForm,
      monthly_hours: Number(retForm.monthly_hours),
      hours_used: Number(retForm.hours_used),
      monthly_price: Number(retForm.monthly_price),
    });
    if (!parsed.success) return toast.error(parsed.error.errors[0].message);
    setBusy(true);
    const { error } = await supabase.from('retainers').insert({
      client_id: parsed.data.client_id,
      tier: parsed.data.tier,
      status: parsed.data.status,
      monthly_hours: parsed.data.monthly_hours,
      hours_used: parsed.data.hours_used,
      monthly_price: parsed.data.monthly_price,
      renews_at: parsed.data.renews_at || null,
      notes: parsed.data.notes || null,
      started_at: new Date().toISOString().slice(0, 10),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success('Retainer provisioned');
    setRetForm({ ...retForm, client_id: '', notes: '' });
    load();
  };

  const updateRetainer = async (id: string, patch: Partial<Retainer>) => {
    const { error } = await supabase.from('retainers').update(patch).eq('id', id);
    if (error) return toast.error(error.message);
    setRetainers((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const updateEngagement = async (id: string, status: string) => {
    const { error } = await supabase.from('engagements').update({ status }).eq('id', id);
    if (error) return toast.error(error.message);
    setEngagements((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    toast.success('Status updated');
  };

  const addMilestone = async (eng: Engagement) => {
    const draft = msForm[eng.id];
    if (!draft?.title?.trim()) return toast.error('Milestone title required');
    const order = milestones.filter((m) => m.engagement_id === eng.id).length;
    const { error } = await supabase.from('milestones').insert({
      engagement_id: eng.id,
      client_id: eng.client_id,
      title: draft.title.trim().slice(0, 120),
      description: draft.description?.trim().slice(0, 500) || null,
      due_date: draft.due_date || null,
      sort_order: order,
    });
    if (error) return toast.error(error.message);
    setMsForm({ ...msForm, [eng.id]: { title: '', due_date: '', description: '' } });
    toast.success('Milestone added');
    load();
  };

  const setMilestoneStatus = async (m: Milestone, status: string) => {
    const patch = { status, completed_at: status === 'done' ? new Date().toISOString() : null };
    const { error } = await supabase.from('milestones').update(patch).eq('id', m.id);
    if (error) return toast.error(error.message);
    setMilestones((prev) => prev.map((x) => (x.id === m.id ? { ...x, ...patch } : x)));
  };

  const deleteMilestone = async (id: string) => {
    const { error } = await supabase.from('milestones').delete().eq('id', id);
    if (error) return toast.error(error.message);
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Admin — Client Portal"
        description="Internal admin console for retainers, engagements and milestones."
        canonical="/portal/admin"
        noindex
      />
      <PortalHeader title="admin" subtitle="provision retainers · triage engagements · set milestones" />

      <main className="container mx-auto px-6 py-10 space-y-12">
        {/* Clients */}
        <section className="space-y-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">// clients</h2>
          {loading ? (
            <div className="h-20 rounded-lg border border-border bg-card/30 animate-pulse" />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {profiles.map((p) => (
                <div key={p.id} className="rounded-lg border border-border bg-card/50 p-4">
                  <Users className="w-4 h-4 text-primary mb-2" />
                  <p className="font-mono text-sm truncate">{p.full_name || '—'}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.email}</p>
                  {p.company && <p className="text-[10px] font-mono text-accent truncate">{p.company}</p>}
                </div>
              ))}
              {profiles.length === 0 && <p className="text-sm text-muted-foreground font-mono">no clients yet.</p>}
            </div>
          )}
        </section>

        {/* Provision retainer */}
        <section className="space-y-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">// provision retainer</h2>
          <form onSubmit={createRetainer} className="rounded-xl border border-border bg-card/50 p-6 grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <Label className="font-mono text-xs">Client</Label>
              <Select value={retForm.client_id} onValueChange={(v) => setRetForm({ ...retForm, client_id: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.full_name || p.email}
                      {p.company ? ` · ${p.company}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs">Tier</Label>
              <Select value={retForm.tier} onValueChange={(v) => setRetForm({ ...retForm, tier: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RETAINER_TIERS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs">Monthly hours</Label>
              <Input
                type="number"
                min={0}
                value={retForm.monthly_hours}
                onChange={(e) => setRetForm({ ...retForm, monthly_hours: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs">Monthly price (USD)</Label>
              <Input
                type="number"
                min={0}
                value={retForm.monthly_price}
                onChange={(e) => setRetForm({ ...retForm, monthly_price: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs">Renews at</Label>
              <Input
                type="date"
                value={retForm.renews_at}
                onChange={(e) => setRetForm({ ...retForm, renews_at: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 md:col-span-3">
              <Label className="font-mono text-xs">Notes</Label>
              <Textarea
                value={retForm.notes}
                onChange={(e) => setRetForm({ ...retForm, notes: e.target.value })}
                rows={2}
                maxLength={1000}
              />
            </div>
            <Button type="submit" disabled={busy} className="font-mono w-fit">
              {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}create
            </Button>
          </form>
        </section>

        {/* Retainers */}
        <section className="space-y-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">// active retainers</h2>
          <div className="space-y-3">
            {retainers.map((r) => (
              <div
                key={r.id}
                className="rounded-lg border border-border bg-card/50 p-4 flex flex-wrap items-end gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm truncate">{clientLabel(r.client_id)}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {r.tier} · ${r.monthly_price}/mo · renews {r.renews_at ?? '—'}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="font-mono text-[10px]">hours used</Label>
                  <Input
                    type="number"
                    className="w-24"
                    defaultValue={r.hours_used}
                    onBlur={(e) => {
                      const v = Math.max(0, Math.min(1000, Number(e.target.value) || 0));
                      if (v !== r.hours_used) updateRetainer(r.id, { hours_used: v });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-mono text-[10px]">status</Label>
                  <Select value={r.status} onValueChange={(v) => updateRetainer(r.id, { status: v })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['pending', 'active', 'paused', 'ended'].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            {retainers.length === 0 && <p className="text-sm text-muted-foreground font-mono">none yet.</p>}
          </div>
        </section>

        {/* Engagements + milestones */}
        <section className="space-y-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">// engagement queue</h2>
          <div className="space-y-4">
            {engagements.map((eng) => {
              const ms = milestones.filter((m) => m.engagement_id === eng.id);
              const draft = msForm[eng.id] ?? { title: '', due_date: '', description: '' };
              return (
                <div key={eng.id} className="rounded-xl border border-border bg-card/50 p-5 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono font-bold truncate">{eng.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {clientLabel(eng.client_id)} · {eng.scope} · {eng.priority} · {eng.created_at.slice(0, 10)}
                      </p>
                    </div>
                    <Select value={eng.status} onValueChange={(v) => updateEngagement(eng.id, v)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ENGAGEMENT_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {prettify(s)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {eng.details && (
                    <p className="text-sm text-muted-foreground border-l-2 border-border pl-3 whitespace-pre-wrap">
                      {eng.details}
                    </p>
                  )}

                  <div className="space-y-2">
                    {ms.map((m) => (
                      <div key={m.id} className="flex flex-wrap items-center gap-2 border border-border rounded-md p-2">
                        <span className="font-mono text-sm flex-1 min-w-0 truncate">{m.title}</span>
                        {m.due_date && (
                          <span className="text-[10px] font-mono text-muted-foreground">due {m.due_date}</span>
                        )}
                        <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono uppercase ${statusTone(m.status)}`}>
                          {prettify(m.status)}
                        </span>
                        <Select value={m.status} onValueChange={(v) => setMilestoneStatus(m, v)}>
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MILESTONE_STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                {prettify(s)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button size="icon" variant="ghost" onClick={() => deleteMilestone(m.id)} aria-label="Delete milestone">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-[2fr_1fr_auto] gap-2 items-end">
                    <div className="space-y-1">
                      <Label className="font-mono text-[10px]">new milestone</Label>
                      <Input
                        value={draft.title}
                        placeholder="Recon & attack surface mapping"
                        onChange={(e) => setMsForm({ ...msForm, [eng.id]: { ...draft, title: e.target.value } })}
                        maxLength={120}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="font-mono text-[10px]">due</Label>
                      <Input
                        type="date"
                        value={draft.due_date}
                        onChange={(e) => setMsForm({ ...msForm, [eng.id]: { ...draft, due_date: e.target.value } })}
                      />
                    </div>
                    <Button variant="outline" className="font-mono" onClick={() => addMilestone(eng)}>
                      <Save className="w-4 h-4 mr-1.5" /> add
                    </Button>
                  </div>
                </div>
              );
            })}
            {engagements.length === 0 && <p className="text-sm text-muted-foreground font-mono">queue empty.</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPortal;
