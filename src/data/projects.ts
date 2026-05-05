import ultraApiImage from '@/assets/projects/ultra-api-scanner.png';
import phantomReconImage from '@/assets/projects/phantom-backend.png';
import bkashGatewayImage from '@/assets/projects/bkash-gateway.png';
import uaeCryptoImage from '@/assets/projects/uae-crypto-osint.png';
import linkedinBotImage from '@/assets/projects/linkedin-bot.png';
import bugBountyProImage from '@/assets/projects/bug-bounty-pro.png';

export interface TimelineEntry {
  phase: string;
  duration: string;
  description: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  longDescription: string;
  tech: string[];
  highlight?: string;
  featured?: boolean;
  image: string;
  screenshots: string[];
  impact: ImpactMetric[];
  timeline: TimelineEntry[];
  problem: string;
  solution: string;
  outcomes: string[];
}

export const projects: Project[] = [
  {
    slug: 'ultraapi-framework',
    title: 'UltraAPI Framework',
    type: 'API Security Testing Framework',
    description:
      'Advanced API security testing framework with automated endpoint enumeration, JWT/OAuth token misconfiguration detection, BOLA/IDOR scanner, rate-limit bypass automation, and mass assignment vulnerability detector. Adopted by 5+ security teams.',
    longDescription:
      'UltraAPI is a modular API security testing framework purpose-built for modern REST and GraphQL surfaces. It chains discovery, fuzzing, auth-flow analysis, and business-logic abuse modules so testers can move from blind enumeration to validated exploitation in a single workflow.',
    tech: ['Node.js', 'Python', 'Bash', 'REST', 'GraphQL', 'JWT', 'OAuth'],
    highlight: '70% Time Reduction',
    featured: true,
    image: ultraApiImage,
    screenshots: [ultraApiImage],
    problem:
      'API testing engagements were dominated by repetitive recon and auth-flow validation, leaving little time for business-logic abuse where the real risk lives.',
    solution:
      'A unified framework that automates endpoint discovery, JWT/OAuth misconfiguration detection, BOLA/IDOR walks, mass assignment probing, and rate-limit bypass — feeding results into an exploit chain runner with reproducible PoCs.',
    impact: [
      { label: 'Time Saved', value: '70%' },
      { label: 'Teams Adopted', value: '5+' },
      { label: 'Critical Findings', value: '40+' },
      { label: 'APIs Tested', value: '120+' },
    ],
    timeline: [
      { phase: 'Research & Design', duration: '3 weeks', description: 'Surveyed existing API tooling gaps; defined a modular plugin architecture.' },
      { phase: 'Core Engine', duration: '5 weeks', description: 'Built the request engine, auth state manager, and replay/diff layer.' },
      { phase: 'Vulnerability Modules', duration: '4 weeks', description: 'Shipped BOLA, IDOR, mass-assignment, JWT/OAuth, and rate-limit bypass detectors.' },
      { phase: 'Field Testing', duration: '6 weeks', description: 'Used on live engagements; refined detections from real findings.' },
      { phase: 'Release & Adoption', duration: 'Ongoing', description: 'Distributed to partner teams; iterating from their telemetry.' },
    ],
    outcomes: [
      'Adopted by 5+ external security teams as part of standard API engagements.',
      'Cut average API test cycle from 2 weeks to under 4 days.',
      'Surfaced 40+ critical/high-severity authorization flaws across client engagements.',
    ],
  },
  {
    slug: 'phantom-recon-system',
    title: 'Phantom Recon System',
    type: 'Attack Surface Mapping',
    description:
      'Comprehensive attack surface discovery integrating Amass, Subfinder, nuclei with automated subdomain takeover detection, technology fingerprinting, and continuous monitoring. Reduced recon time from 6+ hours to 15 minutes.',
    longDescription:
      'Phantom Recon orchestrates best-in-class OSINT and recon tooling into a single continuous monitoring pipeline. It tracks attack surface drift, fingerprints stacks, and auto-flags takeover-prone subdomains.',
    tech: ['Python', 'Bash', 'OSINT', 'Nuclei', 'Amass', 'Subfinder'],
    highlight: '500+ Subdomains Found',
    image: phantomReconImage,
    screenshots: [phantomReconImage],
    problem:
      'Manual recon for large scopes consumed an entire day per target and missed drift between engagements.',
    solution:
      'A pipeline that fans out passive + active discovery, deduplicates assets, fingerprints tech, and runs nuclei templates with delta alerts on every run.',
    impact: [
      { label: 'Recon Speed', value: '6h → 15m' },
      { label: 'Assets Mapped', value: '500+' },
      { label: 'Takeovers Found', value: '12' },
      { label: 'Continuous Targets', value: '30+' },
    ],
    timeline: [
      { phase: 'Tool Survey', duration: '1 week', description: 'Benchmarked passive/active recon tools for coverage and noise.' },
      { phase: 'Pipeline Build', duration: '3 weeks', description: 'Built async orchestrator with dedupe, normalization, and storage.' },
      { phase: 'Detection Layer', duration: '2 weeks', description: 'Integrated nuclei templates and custom takeover heuristics.' },
      { phase: 'Continuous Monitoring', duration: '2 weeks', description: 'Added scheduling, delta detection, and alerting.' },
    ],
    outcomes: [
      'Reduced recon phase from 6+ hours to ~15 minutes per target.',
      'Discovered 12 subdomain takeover candidates in first quarter of use.',
      'Currently monitoring 30+ scopes with daily delta reports.',
    ],
  },
  {
    slug: 'payment-gateway-security-suite',
    title: 'Payment Gateway Security Suite',
    type: 'Security Training Platform',
    description:
      'Complete payment workflow simulation for security training with OTP/PIN verification testing, race condition scenarios, TOCTOU attacks, replay attack testing, and webhook exploitation. Used by security teams for training.',
    longDescription:
      'A safe-to-break payment sandbox that mirrors real gateway flows so engineers and testers can practice race conditions, TOCTOU exploits, replay attacks, and webhook abuse without touching production.',
    tech: ['Node.js', 'React', 'Express', 'MongoDB', 'Redis'],
    image: bkashGatewayImage,
    screenshots: [bkashGatewayImage],
    problem:
      'Payment-flow vulnerabilities are high-impact but hard to teach because no one wants juniors touching production gateways.',
    solution:
      'A self-contained sandbox replicating OTP/PIN auth, double-spend conditions, webhook callbacks, and replay vectors with a guided lab mode.',
    impact: [
      { label: 'Lab Scenarios', value: '20+' },
      { label: 'Engineers Trained', value: '80+' },
      { label: 'Real Bugs Replicated', value: '15' },
      { label: 'Internal Teams', value: '4' },
    ],
    timeline: [
      { phase: 'Threat Modeling', duration: '2 weeks', description: 'Catalogued real payment-flow CVEs and bug-bounty reports as lab targets.' },
      { phase: 'Sandbox Build', duration: '4 weeks', description: 'Replicated gateway flows with intentional weaknesses behind feature flags.' },
      { phase: 'Lab Curriculum', duration: '2 weeks', description: 'Authored 20+ guided exploitation labs with hint/solve flows.' },
    ],
    outcomes: [
      'Trained 80+ engineers on real payment-flow attack patterns.',
      'Adopted by 4 internal security/QA teams as onboarding curriculum.',
      'Replicated 15 real-world payment bugs as reproducible labs.',
    ],
  },
  {
    slug: 'uae-crypto-osint-dashboard',
    title: 'UAE Crypto OSINT Dashboard',
    type: 'Breach Intelligence Platform',
    description:
      'Real-time breach intelligence monitoring platform that analyzes breach dump patterns and wallet correlations. Features dashboard visualization, breach paste correlation, and automated report generation for crypto-related security incidents.',
    longDescription:
      'A monitoring platform that ingests breach dumps and paste sites, correlates wallet identifiers across leaks, and surfaces actionable intel for incident-response and fraud teams.',
    tech: ['React', 'Python', 'OSINT', 'Data Analysis', 'PostgreSQL'],
    image: uaeCryptoImage,
    screenshots: [uaeCryptoImage],
    problem:
      'Breach intelligence around crypto entities was scattered across pastes, dumps, and Telegram leaks with no correlation layer.',
    solution:
      'A pipeline that normalizes leaked records, links wallets to identities across sources, and visualizes incident timelines on a live dashboard.',
    impact: [
      { label: 'Leaks Indexed', value: '1.2M+' },
      { label: 'Wallets Correlated', value: '40K+' },
      { label: 'Incidents Reported', value: '25' },
      { label: 'Detection Latency', value: '<2h' },
    ],
    timeline: [
      { phase: 'Source Mapping', duration: '2 weeks', description: 'Catalogued paste sites, breach forums, and Telegram channels worth ingesting.' },
      { phase: 'Ingestion Pipeline', duration: '3 weeks', description: 'Built ETL with parsers, normalization, and storage.' },
      { phase: 'Correlation Engine', duration: '3 weeks', description: 'Linked wallets, emails, and handles across sources.' },
      { phase: 'Dashboard & Reports', duration: '2 weeks', description: 'Shipped UI with timelines, exports, and alerting.' },
    ],
    outcomes: [
      'Indexed 1.2M+ leaked records and correlated 40K+ wallets.',
      'Generated 25 incident reports with actionable attribution data.',
      'Detection latency under 2 hours from leak publication to alert.',
    ],
  },
  {
    slug: 'linkedin-automation-bot',
    title: 'LinkedIn Automation Bot',
    type: 'Security-Focused Automation',
    description:
      'Browser automation demonstrating security implications with multi-step form automation, anti-detection flow, human-like behavior simulation, captcha handling, and session management. Used in red team engagements.',
    longDescription:
      'A red-team-focused automation harness used to demonstrate how social platforms can be abused for reconnaissance and pretexting at scale, including anti-detection, captcha handling, and identity rotation.',
    tech: ['Puppeteer', 'Node.js', 'Anti-Detection', 'Stealth'],
    image: linkedinBotImage,
    screenshots: [linkedinBotImage],
    problem:
      'Clients underestimated how cheap and convincing automated social-engineering recon had become against their employees.',
    solution:
      'A controlled red-team harness that demonstrates realistic enumeration and engagement flows with stealth defaults and rate-aware identity rotation.',
    impact: [
      { label: 'Engagements', value: '12' },
      { label: 'Detection Rate', value: '<5%' },
      { label: 'Profiles Mapped', value: '10K+' },
      { label: 'Phishing Pretexts', value: '30+' },
    ],
    timeline: [
      { phase: 'Threat Demo Spec', duration: '1 week', description: 'Defined red-team objectives and rules of engagement.' },
      { phase: 'Stealth Layer', duration: '3 weeks', description: 'Built fingerprint randomization, behavior pacing, and captcha flow.' },
      { phase: 'Engagement Modules', duration: '2 weeks', description: 'Added enumeration, connection, and pretext modules.' },
    ],
    outcomes: [
      'Used in 12 red-team engagements with under 5% detection rate.',
      'Mapped 10K+ employee profiles for phishing pretext design.',
      'Drove client investment in social-engineering defense training.',
    ],
  },
  {
    slug: 'bug-bounty-pro-toolkit',
    title: 'Bug Bounty Pro Toolkit',
    type: 'Security Testing Arsenal',
    description:
      'Comprehensive collection of custom security scripts including privilege escalation, auth bypass, deep reconnaissance, backend cloud analysis, and network harvesting tools. A complete toolkit for professional bug bounty hunters.',
    longDescription:
      'A curated arsenal of battle-tested scripts covering recon, auth bypass, privilege escalation, and cloud analysis — assembled from years of bug bounty work and shaped into a reusable toolkit.',
    tech: ['Bash', 'Python', 'Shell', 'AWS', 'GCP'],
    image: bugBountyProImage,
    screenshots: [bugBountyProImage],
    problem:
      'Hunters constantly rebuild the same one-off scripts; institutional knowledge lives in scattered notes.',
    solution:
      'A unified toolkit with categorized modules, sane defaults, and chainable output formats so hunters can focus on creativity, not plumbing.',
    impact: [
      { label: 'Modules', value: '60+' },
      { label: 'Bounties Earned', value: '$120K+' },
      { label: 'Crit/High Findings', value: '200+' },
      { label: 'Programs Hit', value: '50+' },
    ],
    timeline: [
      { phase: 'Script Audit', duration: '2 weeks', description: 'Catalogued years of scripts and dedupe-ranked by usefulness.' },
      { phase: 'Toolkit Refactor', duration: '4 weeks', description: 'Standardized I/O, config, and chaining across modules.' },
      { phase: 'Documentation', duration: '2 weeks', description: 'Wrote per-module docs and recipe playbooks.' },
    ],
    outcomes: [
      'Powered $120K+ in bounty payouts across 50+ programs.',
      'Generated 200+ critical/high severity findings.',
      'Now a daily driver across multiple hunter workflows.',
    ],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
