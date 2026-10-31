# AGENTS.md — Technical Decisions

- Blog content lives in `src/data/posts.ts` (single source); `/blog` archive, `/blog/:slug` detail pages, and the homepage BlogSection all read from it. Add new posts there, then add the slug to `scripts/generate-sitemap.ts` and an `<item>` in `public/rss.xml`.
- `src/lib/site.ts` exports `SITE_URL` (the primary domain). The SEO component resolves `/`-prefixed images against it so og:image is always absolute.
- `public/pgp-key.txt` and `public/policy-signed.txt` belong to the disclosure policy (`/disclosure`); the policy text in `/tmp`-generated `policy-signed.txt` is clearsigned — regenerate the signature with the private key whenever the policy text changes. The private key is the user's own asset (saved in Files), never referenced in app code.
