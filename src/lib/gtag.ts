/**
 * Google Analytics (GA4) via gtag.js.
 * The measurement ID comes from the Google Analytics connector and is
 * exposed client-side as VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY.
 */

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as
  | string
  | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

export const initGoogleAnalytics = () => {
  if (initialized || !measurementId) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
};

export const trackPageView = (path: string) => {
  if (!measurementId || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
};

export const trackEvent = (
  name: string,
  params?: Record<string, string | number | boolean>,
) => {
  if (!window.gtag) return;
  window.gtag("event", name, params);
};
