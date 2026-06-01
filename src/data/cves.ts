export interface CVERecord {
  id: string;
  title: string;
  vendor: string;
  product: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cvss: number;
  year: number;
  category: string;
  summary: string;
  status: 'Disclosed' | 'Fixed' | 'Coordinated';
  writeupUrl?: string;
}

export const cves: CVERecord[] = [
  {
    id: 'CVE-2024-XXXX-1',
    title: 'Authentication Bypass via JWT alg=none',
    vendor: 'Confidential FinTech',
    product: 'Merchant Portal API',
    severity: 'Critical',
    cvss: 9.8,
    year: 2024,
    category: 'Authentication',
    status: 'Fixed',
    summary:
      'JWT verification accepted alg=none tokens, allowing complete authentication bypass for any merchant account by crafting an unsigned token.',
  },
  {
    id: 'CVE-2024-XXXX-2',
    title: 'IDOR in Tenant Refund Endpoint',
    vendor: 'Confidential Payments Platform',
    product: 'Refund Service',
    severity: 'High',
    cvss: 8.1,
    year: 2024,
    category: 'Access Control',
    status: 'Fixed',
    summary:
      'Missing tenant ownership check on the refund endpoint allowed horizontal privilege escalation across merchant tenants via predictable invoice IDs.',
  },
  {
    id: 'CVE-2023-XXXX-3',
    title: 'SSRF in Medical Image Upload',
    vendor: 'Confidential HealthTech',
    product: 'Telemedicine Backend',
    severity: 'High',
    cvss: 7.7,
    year: 2023,
    category: 'SSRF',
    status: 'Coordinated',
    summary:
      'Upload-by-URL feature for radiology images permitted SSRF against internal metadata endpoints, exposing IAM credentials.',
  },
  {
    id: 'CVE-2024-XXXX-4',
    title: 'Reentrancy in NFT Bid-Cancel',
    vendor: 'Confidential Web3',
    product: 'NFT Marketplace',
    severity: 'Critical',
    cvss: 9.3,
    year: 2024,
    category: 'Smart Contract',
    status: 'Fixed',
    summary:
      'bidCancel() emitted external call before state update, enabling reentrancy that could drain escrowed bids during volatile auctions.',
  },
  {
    id: 'CVE-2023-XXXX-5',
    title: 'Subdomain Takeover via Dangling CNAME',
    vendor: 'Confidential Retail Group',
    product: 'Marketing Subdomain',
    severity: 'High',
    cvss: 7.5,
    year: 2023,
    category: 'Infrastructure',
    status: 'Fixed',
    summary:
      'Abandoned vendor pointing to a deprovisioned SaaS allowed full subdomain takeover with valid TLS via the SaaS provider.',
  },
  {
    id: 'CVE-2024-XXXX-6',
    title: 'CI/CD Pipeline Command Injection',
    vendor: 'Confidential DevOps SaaS',
    product: 'Pipeline Runner',
    severity: 'Critical',
    cvss: 9.6,
    year: 2024,
    category: 'Injection',
    status: 'Fixed',
    summary:
      'Unsanitized branch name flowed into a shell context inside the pipeline runner, enabling arbitrary code execution on shared runners.',
  },
  {
    id: 'CVE-2024-XXXX-7',
    title: 'Race Condition in Wallet Withdraw',
    vendor: 'Confidential Crypto Exchange',
    product: 'Withdrawal Service',
    severity: 'High',
    cvss: 8.2,
    year: 2024,
    category: 'Business Logic',
    status: 'Fixed',
    summary:
      'TOCTOU between balance check and ledger debit allowed concurrent withdraws to exceed available balance via parallel requests.',
  },
  {
    id: 'CVE-2023-XXXX-8',
    title: 'Mass Assignment in Profile Update',
    vendor: 'Confidential B2B SaaS',
    product: 'User Service',
    severity: 'High',
    cvss: 7.6,
    year: 2023,
    category: 'API',
    status: 'Fixed',
    summary:
      'Profile update endpoint accepted role and is_admin fields, allowing any authenticated user to elevate to administrator.',
  },
];
