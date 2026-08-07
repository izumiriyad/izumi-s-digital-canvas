import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Gauge,
  Loader2,
  Plus,
  Target,
  User,
} from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import PortalHeader from '@/components/portal/PortalHeader';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Engagement,
  Milestone,
  PRIORITIES,
  Retainer,
  SCOPES,
  prettify,
  priorityTone,
  statusTone,
} from '@/lib/portal';

const engagementSchema = z.object({
  title: z.string().trim().min(3, { message: 'Title must be at least 3 characters' }).max(120),
  scope: z.string().trim().min(1, { message: 'Pick a scope' }).max(80),
  industry: z.string().trim().max(80).optional(),
  priority: z.string().max(20),
  details: z.string().trim().max(2000).optional(),
  target_start: z.string().max(20).optional(),
});

const Portal = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [retainers, setRetainers] = useState<Retainer[]>([]);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');

  const [form, setForm] = useState({
    title: '',
    scope: '',
    industry: '',
    priority: 'normal',
    details: '',
    target_start: '',
  });

  useEffect(() => {
    setFullName(profile?.full_name ?? '');
    setCompany(profile?.company ?? '');
  }, [profile]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const [r, e, m] = await Promise.all([
      supabase.from('retainers').select('*').order('created_at', { ascending: false }),
      supabase.from('engagements').select('*').order('created_at', { ascending: false }),
      supabase.from('milestones').select('*').order('sort_order', { ascending: true }),
    ]);
    if (r.error || e.error || m.error) toast.error('Could not load portal data');
    setRetainers((r.data as Retainer[]) ?? []);
    setEngagements((e.data as Engagement[]) ?? []);
    setMilestones((m.data as Milestone[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const activeRetainer = useMemo(
    () => retainers.find((r) => r.status === 'active') ?? retainers[0] ?? null,
    [retainers]
  );

  const milestonesFor = (engagementId: string) => milestones.filter((m) => m.engagement_id === engagementId);

  const totals = useMemo(() => {
    const done = milestones.filter((m) => m.status === 'done').length;
    return {
      done,
      total: milestones.length,
      open: engagements.filter((e) => e.status !== 'closed').length,
    };
  }, [milestones, engagements]);

  const submitEngagement = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    const parsed = engagementSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('engagements').insert({
      client_id: user.id,
      retainer_id: activeRetainer?.id ?? null,
      title: parsed.data.title,
      scope: parsed.data.scope,
      industry: parsed.data.industry || null,
      priority: parsed.data.priority,
      details: parsed.data.details || null,
      target_start: parsed.data.target_start || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Engagement submitted — you will get a scoping reply shortly.');
    setForm({ title: '', scope: '', industry: '', priority: 'normal', details: '', target_start: '' });
    setShowForm(false);
    load();
  };

  const saveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim().slice(0, 100) || null, company: company.trim().slice(0, 120) || null })
      .eq('id', user.id);
    setSavingProfile(false);
    if (error) return toast.error(error.message);
    toast.success('Profile updated');
    refreshProfile();
  };

  const hoursPct = activeRetainer?.monthly_hours
    ? Math.min(100, Math.round((activeRetainer.hours_used / activeRetainer.monthly_hours) * 100))
    : 0;

  return (
    <div className="min-h-screen">
      <SEO
        title="Client Portal — Retainer & Milestones"
        description="Manage your security retainer, submit engagement details and track milestone progress."
        canonical="/portal"
        noindex
      />
      <PortalHeader title="portal" subtitle="retainer · engagements · milestones" />

      <main className="container mx-auto px-6 py-10 space-y-10">
        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Gauge, label: 'Retainer', value: activeRetainer ? activeRetainer.tier : 'None' },
            { icon: Activity, label: 'Open engagements', value: String(totals.open) },
            { icon: Target, label: 'Milestones done', value: `${totals.done}/${totals.total}` },
            {
              icon: CalendarClock,
              label: 'Renews',
              value: activeRetainer?.renews_at ?? '—',
            },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card/50 p-4">
              <stat.icon className="w-4 h-4 text-primary mb-2" />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{stat.label}</p>
              <p className="font-mono text-lg font-bold truncate">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Retainer */}
        <section className="space-y-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">// retainer</h2>
          {loading ? (
            <div className="h-28 rounded-lg border border-border bg-card/30 animate-pulse" />
          ) : activeRetainer ? (
            <div className="rounded-xl border border-primary/30 bg-card/60 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xl font-bold text-primary">{activeRetainer.tier}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    since {activeRetainer.started_at ?? '—'} · ${activeRetainer.monthly_price}/mo
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md border text-[10px] font-mono uppercase ${statusTone(
                    activeRetainer.status
                  )}`}
                >
                  {prettify(activeRetainer.status)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>hours consumed this cycle</span>
                  <span>
                    {activeRetainer.hours_used} / {activeRetainer.monthly_hours}h
                  </span>
                </div>
                <Progress value={hoursPct} className="h-2" />
              </div>
              {activeRetainer.notes && (
                <p className="text-sm text-muted-foreground border-l-2 border-border pl-3">{activeRetainer.notes}</p>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card/30 p-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                No retainer is attached to your account yet. Submit an engagement below or request an invoice and it will
                appear here once provisioned.
              </p>
              <Button variant="outline" className="font-mono" asChild>
                <a href="/#retainers">view retainer tiers</a>
              </Button>
            </div>
          )}
        </section>

        {/* Engagements */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">// engagements</h2>
            <Button size="sm" className="font-mono" onClick={() => setShowForm((v) => !v)}>
              <Plus className="w-3.5 h-3.5 mr-1.5" /> new engagement
            </Button>
          </div>

          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={submitEngagement}
              className="rounded-xl border border-border bg-card/60 p-6 space-y-4 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="font-mono text-xs">Title</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Q3 external web app pentest"
                    maxLength={120}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-mono text-xs">Scope</Label>
                  <Select value={form.scope} onValueChange={(v) => setForm({ ...form, scope: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCOPES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="font-mono text-xs">Priority</Label>
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="font-mono text-xs">Industry</Label>
                  <Input
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    placeholder="FinTech"
                    maxLength={80}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="font-mono text-xs">Target start</Label>
                  <Input
                    type="date"
                    value={form.target_start}
                    onChange={(e) => setForm({ ...form, target_start: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="font-mono text-xs">Details</Label>
                  <Textarea
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    placeholder="Assets in scope, environments, credentials availability, constraints, out-of-scope items…"
                    rows={4}
                    maxLength={2000}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting} className="font-mono">
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}submit
                </Button>
                <Button type="button" variant="ghost" className="font-mono" onClick={() => setShowForm(false)}>
                  cancel
                </Button>
              </div>
            </motion.form>
          )}

          {loading ? (
            <div className="h-32 rounded-lg border border-border bg-card/30 animate-pulse" />
          ) : engagements.length === 0 ? (
            <p className="text-sm text-muted-foreground font-mono">no engagements yet.</p>
          ) : (
            <div className="space-y-4">
              {engagements.map((eng) => {
                const ms = milestonesFor(eng.id);
                const done = ms.filter((m) => m.status === 'done').length;
                return (
                  <div key={eng.id} className="rounded-xl border border-border bg-card/50 p-5 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-mono font-bold truncate">{eng.title}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {eng.scope}
                          {eng.industry ? ` · ${eng.industry}` : ''} · submitted {eng.created_at.slice(0, 10)}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded border text-[10px] font-mono uppercase ${priorityTone(
                            eng.priority
                          )}`}
                        >
                          {eng.priority}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded border text-[10px] font-mono uppercase ${statusTone(
                            eng.status
                          )}`}
                        >
                          {prettify(eng.status)}
                        </span>
                      </div>
                    </div>

                    {eng.details && (
                      <p className="text-sm text-muted-foreground border-l-2 border-border pl-3 whitespace-pre-wrap">
                        {eng.details}
                      </p>
                    )}

                    {ms.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                          <FileText className="w-3.5 h-3.5" /> milestones {done}/{ms.length}
                        </div>
                        <ol className="relative border-l border-border ml-1.5 space-y-4">
                          {ms.map((m) => (
                            <li key={m.id} className="pl-5 relative">
                              <span className="absolute -left-[7px] top-1 bg-background">
                                {m.status === 'done' ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                ) : m.status === 'in_progress' ? (
                                  <Clock className="w-3.5 h-3.5 text-accent" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-muted-foreground" />
                                )}
                              </span>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-mono text-sm">{m.title}</p>
                                <span
                                  className={`px-1.5 py-0.5 rounded border text-[9px] font-mono uppercase ${statusTone(
                                    m.status
                                  )}`}
                                >
                                  {prettify(m.status)}
                                </span>
                                {m.due_date && (
                                  <span className="text-[10px] font-mono text-muted-foreground">due {m.due_date}</span>
                                )}
                              </div>
                              {m.description && (
                                <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : (
                      <p className="text-xs font-mono text-muted-foreground">
                        milestones appear once the engagement is scoped.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Profile */}
        <section className="space-y-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">// account</h2>
          <div className="rounded-xl border border-border bg-card/50 p-6 grid md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1.5">
              <Label className="font-mono text-xs">Full name</Label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs">Company</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} maxLength={120} />
            </div>
            <Button onClick={saveProfile} disabled={savingProfile} variant="outline" className="font-mono">
              {savingProfile ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <User className="w-4 h-4 mr-2" />}
              save
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portal;
