export interface Retainer {
  id: string;
  client_id: string;
  tier: string;
  status: string;
  monthly_hours: number;
  hours_used: number;
  monthly_price: number;
  started_at: string | null;
  renews_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface Engagement {
  id: string;
  client_id: string;
  retainer_id: string | null;
  title: string;
  industry: string | null;
  scope: string;
  priority: string;
  status: string;
  details: string | null;
  target_start: string | null;
  created_at: string;
}

export interface Milestone {
  id: string;
  engagement_id: string;
  client_id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  sort_order: number;
  completed_at: string | null;
}

export const RETAINER_TIERS = ['Watchtower', 'Sentinel', 'Red Cell'] as const;
export const ENGAGEMENT_STATUSES = ['submitted', 'scoping', 'in_progress', 'reporting', 'remediation', 'closed'] as const;
export const MILESTONE_STATUSES = ['pending', 'in_progress', 'blocked', 'done'] as const;
export const PRIORITIES = ['low', 'normal', 'high', 'critical'] as const;
export const SCOPES = [
  'Web application',
  'API / GraphQL',
  'Cloud infrastructure',
  'Mobile application',
  'Web3 / smart contract',
  'OSINT / external footprint',
  'Incident response',
] as const;

export const statusTone = (status: string) => {
  switch (status) {
    case 'done':
    case 'closed':
    case 'active':
      return 'text-primary border-primary/40 bg-primary/10';
    case 'in_progress':
    case 'reporting':
      return 'text-accent border-accent/40 bg-accent/10';
    case 'blocked':
      return 'text-destructive border-destructive/40 bg-destructive/10';
    default:
      return 'text-muted-foreground border-border bg-muted/30';
  }
};

export const priorityTone = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'text-destructive border-destructive/40 bg-destructive/10';
    case 'high':
      return 'text-accent border-accent/40 bg-accent/10';
    default:
      return 'text-muted-foreground border-border bg-muted/30';
  }
};

export const prettify = (value: string) => value.replace(/_/g, ' ');
