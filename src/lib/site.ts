/** Canonical site origin — used to build absolute URLs for SEO/social tags. */
export const SITE_URL = 'https://izumi-creations-hub.lovable.app';

/** Build an absolute social/OG image URL from a path starting with "/". */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;
