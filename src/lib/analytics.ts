/**
 * Lightweight, privacy-friendly funnel analytics.
 * Events are kept in-memory + localStorage (last 200) and pushed to
 * window.dataLayer so any external tag manager can pick them up later.
 */

export type FunnelEvent =
  | 'cta_hire_click'
  | 'cta_book_call'
  | 'cta_contact_submit'
  | 'quote_calculator_complete'
  | 'roi_calculator_complete'
  | 'scorecard_scan'
  | 'scope_wizard_complete'
  | 'chatbot_open'
  | 'chatbot_message'
  | 'report_view'
  | 'service_view'
  | 'project_view'
  | 'retainer_interest'
  | 'pwa_install_prompt'
  | 'pwa_installed';

const KEY = 'izumi_funnel_events';
const MAX = 200;

interface StoredEvent {
  name: FunnelEvent;
  props?: Record<string, string | number | boolean>;
  path: string;
  ts: number;
}

const read = (): StoredEvent[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredEvent[]) : [];
  } catch {
    return [];
  }
};

export const track = (
  name: FunnelEvent,
  props?: Record<string, string | number | boolean>,
) => {
  const event: StoredEvent = {
    name,
    props,
    path: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/',
    ts: Date.now(),
  };

  try {
    const next = [...read(), event].slice(-MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage full or blocked — non-fatal */
  }

  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...props });
  // Forward funnel events to GA4 when gtag is available
  w.gtag?.('event', name, props);

  if (import.meta.env.DEV) {
    console.debug('[funnel]', name, props ?? '');
  }
};

export const getFunnelEvents = (): StoredEvent[] => read();

export const clearFunnelEvents = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
};
