# Lighthouse CI

Automated performance + accessibility budgets so homepage upgrades stay fast and compliant.

## Run locally

```bash
npm run lhci          # build + collect (3 runs/page) + assert + upload report
npm run lhci:collect  # collect only (requires an existing ./dist)
npm run lhci:assert   # re-assert the last collected run
```

Reports land in `.lighthouseci/` (git-ignored) and a shareable HTML report URL is
printed at the end of the run.

## Pages audited

- `/` (homepage — the strict one)
- `/services`
- `/sample-report`

Portal/auth routes are excluded: they're `noindex` and require a session.

## Budgets

| Metric | Threshold | Level |
| --- | --- | --- |
| Performance score | ≥ 0.85 | error |
| Accessibility score | ≥ 0.95 | error |
| SEO score | ≥ 0.95 | error |
| Best practices score | ≥ 0.90 | warn |
| FCP | ≤ 2.0 s | error |
| LCP | ≤ 2.5 s | error |
| CLS | ≤ 0.1 | error |
| TBT | ≤ 300 ms | error |
| Total byte weight | ≤ 1.6 MB | warn |
| Unused JS | ≤ 250 KB | warn |

Hard accessibility failures (build-breaking): `color-contrast`, `button-name`,
`link-name`, `image-alt`, `aria-required-attr`, `duplicate-id-aria`,
`html-has-lang`, `meta-viewport`.

## CI

`.github/workflows/lighthouse.yml` runs on every push/PR to `main`. It builds the
app, audits the static `dist/` output with an SPA fallback, uploads the HTML
reports as an artifact, and fails the job when any `error`-level budget regresses.

Add these repo secrets so the build step has its env vars:
`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.

## Tuning

Edit `lighthouserc.cjs`. Prefer tightening thresholds over silencing audits; if a
budget is genuinely unattainable, downgrade it to `warn` with a comment rather
than turning it `off`.
