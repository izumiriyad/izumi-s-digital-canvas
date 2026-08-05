# Next-Level Upgrades — Round 3

The obvious wins are already shipped (quote/ROI calculators, CVE ticker, attack-chain, CVSS, Hall of Fame, threat models, scope wizard, command palette, trust/compliance, chatbot with citations, per-route SEO). What's left splits into two buckets: **finish the skipped items** and **add depth that competitors can't copy**.

## A. Finish what was skipped

1. **Dynamic OG image generator** — edge function renders per-page social cards (project title, severity, CVE count) so every share looks designed instead of generic.
2. **RAG chatbot upgrade** — index your project/CVE/blog data into the database with embeddings so answers quote real case-study numbers instead of the static prompt.
3. **Programmatic service pages** — `/services/:slug` (web pentest, API review, OSINT, cloud, mobile, web3) each with its own SEO metadata, scope, deliverables, price, FAQ. Biggest untapped organic-traffic lever.
4. **3D threat globe** in hero — optional, lazy-loaded so it never touches initial bundle.

## B. Real depth (my recommendations)

5. **Live report viewer** — an interactive sample pentest report: collapsible findings, CVSS chips, PoC code blocks, remediation tabs. Buyers want to see the deliverable before paying.
6. **Vulnerability lab / playground** — a safe sandboxed demo (SQLi, XSS, IDOR) where visitors "exploit" a fake target and watch your write-up appear. Sticky, shareable, proves skill.
7. **Client portal (auth)** — sign-in area where a client sees their engagement status, findings list, and retest requests. Turns the portfolio into a product.
8. **Engagement request pipeline in the database** — the tailored-assessment form writes to your backend (not just Formspree) with a private admin dashboard: status, industry, value, notes.
9. **Security scorecard tool** — visitor enters a domain, gets a free surface-level grade (headers, TLS, DNS hygiene) via edge function, then a CTA to book. Lead magnet that actually works.
10. **Automated CVE/blog feed** — scheduled function pulls NVD data into the database so `/cve` and the ticker stay current without edits.

## C. Polish pass

11. **Performance budget** — route-level code splitting, lazy-load heavy sections (charts, globe, gallery), target Lighthouse 95+. The homepage currently mounts ~25 sections at once.
12. **Homepage restructure** — 25 stacked sections is too long; group into tabbed/anchored clusters (Work · Tools · Pricing · Trust) so visitors reach the CTA faster.
13. **Accessibility + reduced-motion audit** — WCAG AA contrast, focus rings, keyboard nav for lightbox/carousel/palette, honor `prefers-reduced-motion` across rain/cursor/parallax.
14. **PWA + print stylesheet** — installable offline shell, clean A4 resume export.
15. **Analytics + funnel events** — track CTA clicks, calculator completions, chatbot intents so you know what converts.

---

## My top 5 if you want one pick

1. Programmatic service pages (#3) — SEO revenue
2. Live report viewer (#5) — closes deals
3. Security scorecard lead magnet (#9)
4. Homepage restructure + performance (#11, #12)
5. Engagement pipeline with admin dashboard (#8)

Tell me the numbers and I'll build them in phases.
