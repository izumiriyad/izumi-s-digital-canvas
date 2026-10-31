export type PostType = 'writeup' | 'cve' | 'research' | 'tutorial';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  type: PostType;
  cveId?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
  readMinutes: number;
  /** Optional external discussion link (LinkedIn, etc.) */
  link?: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'remitly-information-disclosure',
    title: 'Information Disclosure in Remitly Payment Platform',
    excerpt:
      'Discovered a critical information disclosure vulnerability in Remitly (Bug #3116964) that could lead to potential account takeover through exposed sensitive user data.',
    date: '2024-08-15',
    tags: ['Information Disclosure', 'Payment Security', 'HackerOne'],
    type: 'cve',
    cveId: 'Bug #3116964',
    severity: 'high',
    readMinutes: 7,
    link: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/',
    content: `## How the finding started

Most information-disclosure bugs come from patience, not from exotic tooling. While mapping the platform's mobile-first surface, I noticed an internal account-lookup endpoint that the web client used for profile completion. It accepted an email address and returned a subset of the user object — but the response shape was noticeably larger than what the UI ever rendered.

That gap between "what the API returns" and "what the UI uses" is where disclosure bugs live.

## Reproducing it

The endpoint authenticated the caller but never verified a relationship between the caller and the target account. A minimal, harmless test against a self-owned secondary account confirmed the leaked fields:

\`\`\`http
GET /v1/users/lookup?email=victim@example.com
Authorization: Bearer <attacker-token>
\`\`\`

\`\`\`json
{
  "user_id": "usr_88421094",
  "full_name": "T**** V****",
  "phone_hint": "+880•••••42",
  "kyc_status": "VERIFIED",
  "internal_score": 92
}
\`\`\`

The response exposed partial name, phone hints, KYC verification state, and an internal risk score. Individually small — combined, enough to drive credible phishing and, in some flows, account-recovery pivots.

## Impact

- **Targeted phishing:** KYC status and phone hints make spear-phishing messages indistinguishable from legitimate support conversations.
- **Account enumeration:** the endpoint distinguished registered from unregistered emails, enabling list-based recon.
- **Internal data spillage:** the risk score is a back-office value that should never cross the trust boundary.

## What I reported

I sent HackerOne a reproducible PoC, a curl one-liner, and a suggested fix: enforce object-level authorization on the lookup, and field-filter the response down to the exact three fields the UI renders. The report was triaged as High, fixed within the program's SLA, and bounty awarded (Bug #3116964).

## Takeaways

- Diff the API response against the rendered UI; anything unrendered is audit surface.
- "Authenticated" is not "authorized." Every lookup-by-identifier endpoint needs an ownership or relationship check.
- Field-level filtering belongs server-side, never as a frontend slice.`,
  },
  {
    slug: 'ssrf-to-rce-chaining',
    title: 'SSRF to RCE: Chaining Vulnerabilities for Maximum Impact',
    excerpt:
      'Deep dive into my methodology for discovering and chaining SSRF vulnerabilities to achieve Remote Code Execution, with real-world case studies from penetration testing engagements.',
    date: '2024-06-20',
    tags: ['SSRF', 'RCE', 'Exploitation'],
    type: 'writeup',
    readMinutes: 10,
    link: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/',
    content: `## Why SSRF chains matter

A standalone SSRF is a medium at best. The moment it can reach something internal — metadata endpoints, admin panels, service registries — the severity graph bends upward. This writeup walks through the exact progression I use to escalate SSRF findings during authorized engagements.

## Step 1 — Prove the primitive

First, establish the request actually originates from the server. A callback to my own infrastructure (webhook.site or a self-hosted listener) settles it in seconds and rules out client-side illusions:

\`\`\`python
payload = "http://<my-listener>:8080/ping"
requests.post(url, json={"preview_url": payload})
\`\`\`

If the fetch is delayed or cached, I add a unique path per attempt so cache layers can't hide the signal.

## Step 2 — Map the internal neighborhood

With the primitive confirmed, I probe the targets a box typically has local access to:

- \`169.254.169.254\` — cloud instance metadata (IMDSv1 on legacy configs)
- \`localhost:<admin-port>\` — dashboards and actuator endpoints
- DNS names in the service mesh (\`*.internal\`, \`*.svc.cluster.local\`)

Redirects are a common bypass for deny-lists: the app validates the initial URL but follows a 302 into the internal range.

## Step 3 — From SSRF to code execution

The highest-yield pivot I've seen is internal services with unauthenticated admin surfaces. A Spring Boot actuator with a writable \`env\`/restart endpoint, or a job runner that fetches a "template" URL, converts blind file reads into code execution:

\`\`\`text
SSRF -> internal actuator -> env update -> restart -> RCE
\`\`\`

Where code execution isn't reachable, SSRF into metadata can still yield temporary cloud credentials — which becomes a full pivot path.

## Staying in scope

Every pivot here was performed against systems the client owned and had authorized in writing. Chaining work is where scoped testing matters most: once you hold a shell, the rule is to document minimal proof, not to wander.

## Takeaways

- Never report SSRF without mapping what it reaches — the chain is the finding.
- Redirect-following is the classic validation bypass; test it first.
- Internal admin surfaces should assume hostile source IPs, exactly like the public edge.`,
  },
  {
    slug: 'payment-gateway-otp-bypass',
    title: 'Payment Gateway OTP Bypass Techniques',
    excerpt:
      'Analysis of OTP/PIN verification flaws in fintech platforms including race conditions, TOCTOU attacks, and transaction manipulation vulnerabilities that saved clients $500K+ in potential fraud.',
    date: '2024-05-10',
    tags: ['Fintech', 'OTP Bypass', 'Business Logic'],
    type: 'research',
    readMinutes: 9,
    link: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/',
    content: `## The pattern behind most OTP bypasses

Across fintech engagements, I keep finding the same family of flaws: the OTP is *verified*, but the verified state is not *bound* to the transaction it was meant to authorize. Two classes dominate — state confusion and race conditions.

## Class 1: State confusion (TOCTOU)

The server checks the OTP in one request and executes the payment in a second, trusting a session flag between the two:

\`\`\`http
POST /verify-otp   { "txn": "T1", "otp": "123456" }  -> 200 verified=true
POST /execute      { "txn": "T2", "amount": 50000 }  -> 200 (flag still true)
\`\`\`

The fix is atomic binding: the OTP must be consumed by, and attached to, a single transaction ID that is re-checked inside the execution handler.

## Class 2: Race conditions

When verification and execution can run in parallel, thread-level TOCTOU appears. I fire N concurrent execute requests the instant the OTP is accepted; the check-then-deduct pair is not synchronized, so a balance check passes for several overlapping withdrawals. This is where I look for missing row locks, non-transactional updates, and idempotency keys that are generated client-side and therefore not enforced.

## Class 3: Response- and client-controlled amounts

A quieter cousin: the amount validated at OTP time is re-read from the request body at execution time. The OTP authorizes a $1 transaction and the execute call rewrites it to $50,000. Server-side amount snapshotting is cheap; it is just often forgotten.

## Reporting these safely

Business-logic findings in payment flows carry real blast radius, so every test runs on sandbox accounts I own, with amounts capped at the smallest meaningful value, and full evidence captured per step. Clients care about the *fix*, so each report ships with a one-page remediation mapping: binding, locking, idempotency, server-side amount authority.

## Impact

This class of bugs represents an estimated $500K+ in prevented fraud across client engagements — fraud that no WAF or scanner will ever catch, because the requests are all individually valid.

## Takeaways

- An OTP is an authorization *token*; it must be consumed atomically, not toggled as a flag.
- Fuzz the sequence, not the field. The bug is between requests, not inside them.
- Every amount, currency, and beneficiary must be fixed server-side at authorization time.`,
  },
  {
    slug: 'idor-chains-financial-apis',
    title: 'Hunting IDOR Chains in Financial APIs',
    excerpt:
      "My approach to discovering and exploiting chained IDOR vulnerabilities in financial applications, including BOLA/IDOR detection patterns and permission matrix testing techniques.",
    date: '2024-04-05',
    tags: ['IDOR', 'API Security', 'BOLA'],
    type: 'writeup',
    readMinutes: 8,
    link: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/',
    content: `## BOLA is still the number one API risk

The OWASP API Top 10 has put Broken Object Level Authorization at number one for years, and my engagement data agrees. The reason is structural: modern APIs expose object identifiers in paths and bodies, and backend teams often stop at "does the caller have a valid session."

## Building the two-account harness

Reliable IDOR testing needs an automation harness with two tenants, A and B, sharing the same object space. The core loop:

\`\`\`python
for endpoint in endpoints:
    for obj_id in objects_owned_by_b:
        r = as_user(A, endpoint, obj_id)
        if r.status_code == 200 and leaked_fields(r):
            record(endpoint, obj_id, leaked_fields(r))
\`\`\`

Every "200 from the wrong tenant" is a candidate finding; everything else is noise.

## The permission matrix

Single-endpoint IDORs are common. The dangerous ones are *chains*: read a case ID from an allowed endpoint, use it against a disallowed one. I maintain a matrix of endpoints × object types and let the harness walk paths two and three hops deep. A recent chain looked like:

\`\`\`text
GET /statements (allowed) -> document_id
GET /documents/{id} (denied by UI, allowed by API) -> signed PDF
\`\`\`

Neither endpoint is critical alone; the chain reads a signed financial document with no authorization beyond knowing an ID.

## Predictable identifiers

Even "unguessable" UUIDs leak: they appear in exports, webhook payloads, email links, and third-party integrations. Treat every identifier as guessable unless the server proves otherwise.

## Reporting

Each finding ships with a two-tenant PoC (screenshots with data redacted), the smallest fix description (object-level check at the data-access layer, not the controller), and an inventory of every endpoint sharing the same accessor so the fix is systemic rather than spot.

## Takeaways

- Test authorization at the data layer, where one fix covers the whole fleet of endpoints.
- Chains beat single bugs; walk the graph, not the list.
- Automation harnesses pay for themselves by the second engagement.`,
  },
  {
    slug: 'building-ultraapi',
    title: 'Building UltraAPI: 70% Faster API Security Testing',
    excerpt:
      'How I built a comprehensive API security framework that automates endpoint enumeration, JWT/OAuth exploitation, and rate-limit bypass testing, now adopted by 5+ security teams.',
    date: '2024-03-18',
    tags: ['Automation', 'API Testing', 'Tools'],
    type: 'tutorial',
    readMinutes: 11,
    link: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/',
    content: `## The problem: manual API testing doesn't scale

Every pentest starts with the same 4–6 hours: import a spec, auth as a user, replay endpoints, diff tenancies. It is mechanical, error-prone, and it eats the budget before the interesting work begins. UltraAPI is my answer — a framework that automates the mechanical 70% so my time goes to logic flaws.

## Architecture

Three modules, one playbook format:

1. **Enumerate** — ingests OpenAPI/GraphQL schemas plus runtime traffic captures; builds a model of every route, parameter, and auth scope.
2. **Authorize** — a two-tenant engine that replays every endpoint as both tenants and diffs responses (the IDOR harness from my writeups, generalized).
3. **Exploit** — scenario packs for JWT confusion, OAuth redirect/HS256 flaws, rate-limit bypass, and mass assignment.

Playbooks are declarative YAML, so a test plan is reviewable, versioned, and re-runnable after fixes.

## What the automation caught

- JWT \`alg\` confusion and missing \`kid\` validation on three clients
- OAuth authorization codes replayable across redirect URIs
- Mass assignment via ID-prefix renaming (\`is_admin\` smuggled in an update payload)
- Rate-limit bypass via header aliasing and IPv6 rounding

## The 70% number

Across the last 12 engagements, automated coverage replaced roughly 70% of manual recon-and-replay time. More importantly, the coverage became *consistent* — the same tests run every time, with every result diffable against the previous run. Regression testing a fix became a one-command job.

## For security teams

Five teams now use the framework internally. If you run an API security program, the highest-leverage place to start is not a scanner — it is a two-tenant authorization diff wired into CI. Everything else is refinement.

## Takeaways

- Automate the diff, not the judgment: machines find tenancy mismatches, humans explain impact.
- Schema-plus-traffic beats either alone; most critical routes only appear in runtime captures.
- Any test you run twice manually should be a playbook.`,
  },
  {
    slug: 'rate-limit-bypass-account-takeover',
    title: 'Rate-Limit Bypass: From Enumeration to Account Takeover',
    excerpt:
      'Comprehensive guide on identifying and exploiting rate-limit vulnerabilities for user enumeration, credential stuffing, and authentication bypass in modern web applications.',
    date: '2024-02-22',
    tags: ['Rate-Limit', 'Auth Bypass', 'Bug Bounty'],
    type: 'research',
    readMinutes: 9,
    link: 'https://www.linkedin.com/in/zeroizumi/recent-activity/all/',
    content: `## Why rate-limit testing pays rent

Rate limiting is the last line of defense for credentials, OTPs, and password resets. When it fails, everything behind it fails: enumeration, stuffing, and OTP brute-force become viable. It is also one of the most frequently mis-implemented controls I test.

## The bypass catalog

A non-exhaustive list of what works across real targets, roughly in order of hit rate:

\`\`\`text
1. Header aliasing   X-Forwarded-For, X-Real-IP, True-Client-IP
2. Parameter pollution  ?email=a&email=b in the body *and* the query
3. Case/unicode tricks  EMAIL casing, homoglyphs, trailing dots
4. Endpoint splitting   reset-password vs. reset_password vs. /reset
5. Distributed source   rotating cheap proxies / IPv6 /64 ranges
6. Time-window abuse    synchronized bursts across window boundaries
\`\`\`

## Case study: OTP brute-force

A fintech client's transfer-confirmation OTP allowed 6 attempts per "session" — but a fresh device ID reset the counter. Six digits, ten thousand attempts, a script that rotated device IDs and kept the single correct code: account takeover in under four minutes, fully automated, on an account I owned.

The fix wasn't "raise the limit." It was binding the counter to the *OTP record* server-side, with exponential lockout and a hardware-cost-aware attempt cap.

## Case study: response-differencing enumeration

Login responses were identical, but reset-password responses differed by 40ms — the registered-account path hit the database. Time-based enumeration is invisible to functional testers and trivial to measure:

\`\`\`python
t = [time_request(f"u{i}@example.com") for i in range(100)]
# bimodal distribution == registered accounts
\`\`\`

## Remediation that actually holds

- Rate-limit per identity (account + OTP record), not per IP.
- Treat all spoofable headers as advisory; derive client IP at the edge you control.
- Uniform responses *and* uniform timing: constant-time paths or padded responses.
- Alert on bypass patterns — a burst of distinct X-Forwarded-For values from one session is a detection, not a nuisance.

## Takeaways

- Test limits the way an attacker would: parallel, distributed, header-spoofed.
- Any per-IP limit on an identity-bound action is a suggestion, not a control.
- Timing is a response channel; differencing it is where enumeration hides.`,
  },
];

export const postTypes: PostType[] = ['cve', 'writeup', 'research', 'tutorial'];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const relatedPosts = (post: BlogPost, count = 3) => {
  const sameTag = posts.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)));
  const sameType = posts.filter((p) => p.slug !== post.slug && p.type === post.type && !sameTag.includes(p));
  return [...sameTag, ...sameType].slice(0, count);
};

/** Section headings ("## ...") extracted from a post's markdown for the TOC. */
export const postHeadings = (content: string) =>
  content
    .split('\n')
    .filter((l) => l.startsWith('## '))
    .map((l) => {
      const text = l.slice(3).trim();
      return { text, id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') };
    });
