// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// TODO: replace with your project URL once a custom domain is set.
const BASE_URL = '';

interface SitemapEntry {
  path: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
}

const projectSlugs = [
  'ultraapi-framework',
  'phantom-recon-system',
  'payment-gateway-security-suite',
  'uae-crypto-osint-dashboard',
  'linkedin-automation-bot',
  'bug-bounty-pro-toolkit',
];

const serviceSlugs = [
  'web-application-penetration-testing',
  'api-security-review',
  'osint-and-attack-surface-audit',
  'cloud-security-audit',
  'mobile-application-security-testing',
  'smart-contract-and-web3-audit',
];

const entries: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    changefreq: 'monthly' as const,
    priority: '0.8',
  })),
  { path: '/report', changefreq: 'monthly', priority: '0.7' },
  { path: '/cve', changefreq: 'weekly', priority: '0.8' },
  { path: '/whoami', changefreq: 'monthly', priority: '0.5' },
  { path: '/compare', changefreq: 'monthly', priority: '0.6' },
  ...projectSlugs.map((slug) => ({
    path: `/projects/${slug}`,
    changefreq: 'monthly' as const,
    priority: '0.7',
  })),
];

function generate(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join('\n')
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join('\n');
}

writeFileSync(resolve('public/sitemap.xml'), generate(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
