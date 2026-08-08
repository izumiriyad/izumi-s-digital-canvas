/**
 * Lighthouse CI configuration.
 *
 * Budgets are intentionally strict on the homepage (the page that keeps
 * receiving upgrades) and slightly looser on heavy sub-pages.
 *
 * Run locally:  npm run lhci
 */
module.exports = {
  ci: {
    collect: {
      // Serve the production build, not the dev server.
      staticDistDir: "./dist",
      // SPA: any unknown path must fall back to index.html
      isSinglePageApplication: true,
      url: [
        "http://localhost/index.html",
        "http://localhost/services",
        "http://localhost/sample-report",
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        // Portal/auth routes are noindex + gated, skip SEO noise there.
        skipAudits: ["canonical", "uses-http2", "redirects-http"],
      },
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        /* ---- Category budgets ---- */
        "categories:performance": ["error", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.95 }],

        /* ---- Core Web Vitals budgets ---- */
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }],
        "speed-index": ["warn", { maxNumericValue: 3400 }],
        interactive: ["warn", { maxNumericValue: 3800 }],

        /* ---- Weight budgets ---- */
        "total-byte-weight": ["warn", { maxNumericValue: 1_600_000 }],
        "unused-javascript": ["warn", { maxNumericValue: 250_000 }],
        "unused-css-rules": ["warn", { maxNumericValue: 60_000 }],
        "modern-image-formats": ["warn", { maxNumericValue: 100_000 }],

        /* ---- Accessibility hard requirements ---- */
        "color-contrast": "error",
        "button-name": "error",
        "link-name": "error",
        "image-alt": "error",
        "aria-required-attr": "error",
        "duplicate-id-aria": "error",
        "html-has-lang": "error",
        "meta-viewport": "error",
        "heading-order": "warn",

        /* ---- Noise we accept on a marketing SPA ---- */
        "unsized-images": "off",
        "legacy-javascript": "off",
        "csp-xss": "off",
        "errors-in-console": "warn",
        "third-party-cookies": "off",
        "bf-cache": "off",
        "valid-source-maps": "off",
        "uses-long-cache-ttl": "off",
        "non-composited-animations": "off",
      },
    },
    upload: {
      // Free, no-account storage of HTML reports (7-day retention).
      target: "temporary-public-storage",
    },
  },
};
