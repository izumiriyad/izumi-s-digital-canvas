export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  priceFrom: number;
  duration: string;
  icon: 'globe' | 'plug' | 'search' | 'cloud' | 'smartphone' | 'coins';
  scope: string[];
  deliverables: string[];
  methodology: { phase: string; detail: string }[];
  tools: string[];
  outcomes: string[];
  faqs: ServiceFAQ[];
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: 'web-application-penetration-testing',
    name: 'Web Application Penetration Testing',
    tagline: 'Manual, exploit-driven testing of your web app — not a scanner report',
    summary:
      'A full grey-box penetration test of your web application mapped to OWASP WSTG and ASVS L2. Every finding is manually validated, CVSS-scored, and shipped with a reproducible proof of concept plus a concrete remediation path.',
    priceFrom: 750,
    duration: '1–2 weeks',
    icon: 'globe',
    scope: [
      'Authentication, session handling and password reset flows',
      'Authorization and multi-tenant isolation (IDOR, privilege escalation)',
      'Injection classes: SQLi, NoSQLi, SSTI, command injection',
      'Client-side: XSS, DOM sinks, CSP bypass, clickjacking',
      'Business-logic abuse, race conditions, workflow bypass',
      'File upload, SSRF, deserialization and dependency review',
    ],
    deliverables: [
      'Executive summary written for non-technical stakeholders',
      'Technical findings with CVSS 3.1 vectors and severity ranking',
      'Reproducible PoC for every finding (requests, payloads, screenshots)',
      'Prioritised remediation roadmap with effort estimates',
      'Free retest within 30 days plus a retest letter',
    ],
    methodology: [
      { phase: 'Recon & mapping', detail: 'Full crawl, endpoint inventory, tech fingerprint, auth matrix.' },
      { phase: 'Automated sweep', detail: 'Tuned scanners to clear low-hanging fruit fast, all results hand-verified.' },
      { phase: 'Manual exploitation', detail: 'The bulk of the engagement — chained abuse of logic and access control.' },
      { phase: 'Reporting', detail: 'Findings written up, scored, and walked through on a live call.' },
      { phase: 'Retest', detail: 'Fixes verified and the report reissued with closed findings.' },
    ],
    tools: ['Burp Suite Pro', 'Caido', 'ffuf', 'sqlmap', 'nuclei', 'custom Python tooling'],
    outcomes: [
      'Every exploitable path documented with evidence your engineers can replay',
      'A report that satisfies SOC 2 CC7.1 and PCI DSS 11.4 evidence requests',
      'Remediation guidance specific to your stack, not generic OWASP links',
    ],
    faqs: [
      {
        q: 'Do you need production access?',
        a: 'A staging environment that mirrors production is ideal. If only production is available, testing is throttled and destructive checks are excluded by agreement.',
      },
      {
        q: 'How disruptive is the test?',
        a: 'Non-destructive by default. Any test that could affect availability is scheduled with you in advance.',
      },
      {
        q: 'What do you need from me to start?',
        a: 'Scope (domains and roles), two test accounts per role, and a signed mutual NDA. Kickoff is usually within 3 business days.',
      },
    ],
    keywords: ['web application penetration testing', 'OWASP pentest', 'web app security audit'],
  },
  {
    slug: 'api-security-review',
    name: 'API Security Review',
    tagline: 'REST, GraphQL and gRPC surfaces tested against the OWASP API Top 10',
    summary:
      'APIs leak more than web UIs because authorization lives in a hundred handlers instead of one. This review enumerates every endpoint, builds an access-control matrix, and attacks it role by role.',
    priceFrom: 900,
    duration: '1–2 weeks',
    icon: 'plug',
    scope: [
      'Endpoint and schema enumeration (OpenAPI, GraphQL introspection, traffic capture)',
      'Broken object-level and function-level authorization across every role',
      'Mass assignment, over-exposure of fields, verbose errors',
      'Rate limiting, resource exhaustion and cost-based DoS',
      'Token handling: JWT flaws, scope confusion, refresh abuse',
      'Server-side request forgery and internal service pivoting',
    ],
    deliverables: [
      'Endpoint inventory with an authorization matrix per role',
      'CVSS-scored findings with curl/HTTPie reproduction steps',
      'Postman or Bruno collection of the attack requests',
      'Hardening checklist for gateway, schema and handler layers',
      'Free retest within 30 days',
    ],
    methodology: [
      { phase: 'Surface discovery', detail: 'Spec review, introspection, traffic capture from real clients.' },
      { phase: 'Matrix build', detail: 'Every endpoint x every role mapped to expected access.' },
      { phase: 'Differential abuse', detail: 'Automated cross-role replay to surface BOLA/BFLA at scale.' },
      { phase: 'Deep exploitation', detail: 'Chaining, token forgery, tenant hopping, business-logic abuse.' },
      { phase: 'Reporting & retest', detail: 'Scored writeup, live walkthrough, verified fixes.' },
    ],
    tools: ['Burp Suite Pro', 'Autorize', 'graphql-cop', 'nuclei', 'custom differential replay harness'],
    outcomes: [
      'A definitive answer on whether tenant data can cross tenants',
      'Machine-readable evidence your CI can regression-test against',
      'Gateway and schema hardening you can ship the same sprint',
    ],
    faqs: [
      {
        q: 'Do you support GraphQL?',
        a: 'Yes — introspection abuse, query depth and cost attacks, batching bypass and resolver-level authorization are all in scope.',
      },
      {
        q: 'What if we have no API documentation?',
        a: 'Then discovery is part of the engagement: traffic capture from your clients plus fuzzing builds the inventory.',
      },
      {
        q: 'Can you test internal-only APIs?',
        a: 'Yes, over a VPN or bastion host you provide.',
      },
    ],
    keywords: ['API security review', 'OWASP API Top 10', 'GraphQL security audit'],
  },
  {
    slug: 'osint-and-attack-surface-audit',
    name: 'OSINT & Attack Surface Audit',
    tagline: 'What an attacker learns about you before touching a single server',
    summary:
      'A passive-first reconnaissance engagement: exposed subdomains, forgotten hosts, leaked credentials, code and secret exposure, and the human footprint an attacker uses to phish you.',
    priceFrom: 250,
    duration: '3–5 days',
    icon: 'search',
    scope: [
      'Subdomain and host enumeration with takeover checks',
      'Certificate transparency, DNS hygiene, SPF/DKIM/DMARC posture',
      'Credential and secret exposure across paste sites, breach corpora and public repos',
      'Cloud bucket and artifact exposure',
      'Employee footprint and phishing pretext mapping',
      'Shadow IT and forgotten staging environments',
    ],
    deliverables: [
      'Ranked exposure inventory with screenshots and source links',
      'Takedown and remediation checklist',
      'Phishing susceptibility briefing',
      'Continuous-monitoring recommendations',
    ],
    methodology: [
      { phase: 'Passive collection', detail: 'Zero-touch gathering from public sources only.' },
      { phase: 'Correlation', detail: 'Assets tied to owners, environments and business criticality.' },
      { phase: 'Light validation', detail: 'Non-intrusive confirmation of live and takeover-prone assets.' },
      { phase: 'Reporting', detail: 'Exposure ranked by attacker value, not raw count.' },
    ],
    tools: ['amass', 'subfinder', 'httpx', 'dnsx', 'trufflehog', 'custom OSINT pipeline'],
    outcomes: [
      'A real asset inventory — usually 20–40% larger than the one you had',
      'Immediate takedown wins on abandoned hosts and leaked keys',
      'A defensible baseline for your external attack surface',
    ],
    faqs: [
      {
        q: 'Is this intrusive?',
        a: 'No. Collection is passive; validation is limited to non-intrusive HTTP requests you authorise.',
      },
      {
        q: 'Can this run continuously?',
        a: 'Yes — a monthly retainer keeps the inventory current and alerts on new exposure.',
      },
      { q: 'Do I need to prove domain ownership?', a: 'Yes, before any active validation step.' },
    ],
    keywords: ['OSINT audit', 'attack surface management', 'external asset discovery'],
  },
  {
    slug: 'cloud-security-audit',
    name: 'Cloud Security Audit',
    tagline: 'AWS, GCP and Azure configuration reviewed the way an attacker reads it',
    summary:
      'A configuration and IAM review of your cloud estate, focused on the privilege escalation paths and blast radius that CSPM dashboards score green.',
    priceFrom: 1200,
    duration: '1–2 weeks',
    icon: 'cloud',
    scope: [
      'IAM policy review and privilege-escalation path mapping',
      'Public exposure: buckets, snapshots, load balancers, metadata endpoints',
      'Network segmentation, security groups and egress control',
      'Secret management, KMS usage and key rotation',
      'Logging, monitoring and detection coverage gaps',
      'Container and Kubernetes workload posture',
    ],
    deliverables: [
      'Privilege-escalation graph from every entry-point identity',
      'Findings mapped to CIS Benchmarks and your compliance framework',
      'Terraform/IaC remediation snippets where applicable',
      'Detection-gap summary for your SOC or SIEM',
    ],
    methodology: [
      { phase: 'Inventory', detail: 'Read-only role enumerates accounts, identities and resources.' },
      { phase: 'Graph analysis', detail: 'Escalation and lateral paths computed across identities.' },
      { phase: 'Exposure testing', detail: 'External validation of anything internet-reachable.' },
      { phase: 'Reporting', detail: 'Findings ranked by blast radius, not by resource count.' },
    ],
    tools: ['ScoutSuite', 'Prowler', 'cloudsplaining', 'PMapper', 'kube-bench'],
    outcomes: [
      'A named list of identities that can reach admin, and how',
      'CIS-mapped evidence for auditors',
      'Concrete IaC changes rather than dashboard scores',
    ],
    faqs: [
      { q: 'What access do you need?', a: 'A read-only audit role (SecurityAudit or equivalent) per account.' },
      { q: 'Multi-account orgs?', a: 'Supported — pricing scales with account count, quoted up front.' },
      { q: 'Do you touch production data?', a: 'Never. The review is metadata and configuration only.' },
    ],
    keywords: ['cloud security audit', 'AWS security review', 'IAM privilege escalation'],
  },
  {
    slug: 'mobile-application-security-testing',
    name: 'Mobile Application Security Testing',
    tagline: 'iOS and Android binaries, storage and backend traffic under the microscope',
    summary:
      'Static and dynamic analysis of your mobile app plus the API behind it, following the OWASP MASVS. Because the client is in the attacker\'s hands, every trust assumption gets tested.',
    priceFrom: 800,
    duration: '1–2 weeks',
    icon: 'smartphone',
    scope: [
      'Binary analysis, hardcoded secrets, obfuscation quality',
      'Insecure local storage, keychain/keystore misuse, backup exposure',
      'TLS validation, certificate pinning and pinning bypass',
      'Runtime manipulation: root/jailbreak detection, hooking, tamper resistance',
      'Deep link, IPC and WebView attack surface',
      'The backing API tested from an attacker-controlled client',
    ],
    deliverables: [
      'MASVS-mapped findings for both platforms',
      'Patched/instrumented build demonstrating each bypass',
      'Hardening plan for client and server sides',
      'Free retest within 30 days',
    ],
    methodology: [
      { phase: 'Static analysis', detail: 'Decompilation, secret scanning, permission and manifest review.' },
      { phase: 'Dynamic analysis', detail: 'Frida/Objection instrumentation on rooted devices.' },
      { phase: 'Traffic analysis', detail: 'Pinning bypass then full API testing as a hostile client.' },
      { phase: 'Reporting & retest', detail: 'Scored findings, live walkthrough, verified fixes.' },
    ],
    tools: ['MobSF', 'Frida', 'Objection', 'jadx', 'Ghidra', 'Burp Suite Pro'],
    outcomes: [
      'Proof of what a rooted device can extract or bypass',
      'App-store and MASVS evidence for security review',
      'Server-side fixes that survive a compromised client',
    ],
    faqs: [
      { q: 'Do you need source code?', a: 'Not required. A grey-box test with source is faster and deeper if you can share it.' },
      { q: 'Both platforms?', a: 'Priced per platform; a bundle discount applies when both are in scope.' },
      { q: 'React Native / Flutter?', a: 'Yes — bundle extraction and framework-specific storage flaws are covered.' },
    ],
    keywords: ['mobile app penetration testing', 'OWASP MASVS', 'iOS Android security audit'],
  },
  {
    slug: 'smart-contract-and-web3-audit',
    name: 'Smart Contract & Web3 Audit',
    tagline: 'Solidity, protocol economics and the dApp layer reviewed line by line',
    summary:
      'A manual audit of your contracts and the interface in front of them: reentrancy, oracle manipulation, access control, upgrade safety and the economic assumptions your protocol depends on.',
    priceFrom: 3000,
    duration: '2–4 weeks',
    icon: 'coins',
    scope: [
      'Line-by-line Solidity review with invariant identification',
      'Reentrancy, arithmetic, and external-call ordering flaws',
      'Access control, ownership, pausing and upgrade (proxy) safety',
      'Oracle and price manipulation, MEV and sandwich exposure',
      'Economic and incentive modelling of the protocol',
      'Front-end dApp: signature phishing, approval hygiene, RPC trust',
    ],
    deliverables: [
      'Severity-ranked findings with exploit test cases (Foundry)',
      'Invariant and fuzzing suite you keep',
      'Gas and design notes alongside security findings',
      'Public audit report suitable for your community',
    ],
    methodology: [
      { phase: 'Spec review', detail: 'Intended behaviour and invariants documented before reading code.' },
      { phase: 'Manual audit', detail: 'Line-by-line review against those invariants.' },
      { phase: 'Fuzz & invariant testing', detail: 'Foundry harness attempts to break each invariant.' },
      { phase: 'Reporting & fix review', detail: 'Findings issued, fixes reviewed, final report published.' },
    ],
    tools: ['Foundry', 'Slither', 'Echidna', 'Tenderly', 'Ethers.js harnesses'],
    outcomes: [
      'Exploit-backed findings, not theoretical warnings',
      'A reusable invariant suite for future releases',
      'A publishable report that raises investor and user confidence',
    ],
    faqs: [
      { q: 'How is pricing determined?', a: 'By lines of code, protocol complexity and external integrations. Quoted after a scoping call.' },
      { q: 'Do you re-audit after fixes?', a: 'Yes — one fix-review round is included, and the final report reflects it.' },
      { q: 'Which chains?', a: 'Any EVM chain. Non-EVM ecosystems are scoped case by case.' },
    ],
    keywords: ['smart contract audit', 'Solidity security audit', 'web3 security'],
  },
];

export const getService = (slug?: string) => services.find((s) => s.slug === slug);
