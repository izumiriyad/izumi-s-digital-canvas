import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Crown, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  icon: typeof Shield;
  features: string[];
  highlighted?: boolean;
  cta: string;
  fiverrLink?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Digital Footprint',
    description: 'Single executive or small team OSINT assessment',
    price: '$60',
    priceNote: 'Starting price',
    icon: Shield,
    features: [
      'Social media security posture audit',
      'Publicly available personal info audit',
      'Email & phone exposure detection',
      'Basic threat report with findings',
      'Actionable security recommendations',
      '3-5 day delivery',
    ],
    cta: 'Order on Fiverr',
    fiverrLink: 'https://www.fiverr.com/s/Ldb93Po',
  },
  {
    name: 'Full OSINT Investigation',
    description: 'Comprehensive corporate & executive team assessment',
    price: '$90',
    priceNote: 'Starting price',
    icon: Zap,
    features: [
      'Complete digital footprint analysis',
      'Company structure & hierarchy mapping',
      'Technology stack identification',
      'Vendor & partner relationship discovery',
      'Historical data breach exposure check',
      'Credential leak detection',
      'Corporate email compromise assessment',
      'Detailed intelligence report',
      '5-7 day delivery',
    ],
    highlighted: true,
    cta: 'Order on Fiverr',
    fiverrLink: 'https://www.fiverr.com/s/Ldb93Po',
  },
  {
    name: 'Social Engineering',
    description: 'Full-scale OSINT + social engineering simulation',
    price: '$160',
    priceNote: 'Starting price',
    icon: Crown,
    features: [
      'Complete OSINT investigation included',
      'Multi-vector attack simulation',
      'Phishing & pretexting campaigns',
      'Phone-based social engineering tests',
      'Dark web monitoring & threat intel',
      'Comprehensive risk analysis',
      'Executive briefing & training',
      'Remediation roadmap',
      '7-10 day delivery',
    ],
    cta: 'Order on Fiverr',
    fiverrLink: 'https://www.fiverr.com/s/Ldb93Po',
  },
];

const comparisonFeatures = [
  { feature: 'Social Media Posture Audit', basic: true, full: true, retainer: true },
  { feature: 'Personal Info Exposure Detection', basic: true, full: true, retainer: true },
  { feature: 'Email & Phone Leak Detection', basic: true, full: true, retainer: true },
  { feature: 'Professional Network Analysis', basic: false, full: true, retainer: true },
  { feature: 'Company Hierarchy Mapping', basic: false, full: true, retainer: true },
  { feature: 'Technology Stack Identification', basic: false, full: true, retainer: true },
  { feature: 'Vendor/Partner Discovery', basic: false, full: true, retainer: true },
  { feature: 'Data Breach Exposure Analysis', basic: false, full: true, retainer: true },
  { feature: 'Credential Leak Detection', basic: false, full: true, retainer: true },
  { feature: 'Dark Web Monitoring', basic: false, full: false, retainer: true },
  { feature: 'Phishing Simulation', basic: false, full: false, retainer: true },
  { feature: 'Phone-Based SE Testing', basic: false, full: false, retainer: true },
  { feature: 'Executive Training', basic: false, full: false, retainer: true },
  { feature: 'Delivery Time', basic: '3-5 days', full: '5-7 days', retainer: '7-10 days' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const renderCellValue = (value: boolean | string) => {
  if (value === true) {
    return <Check className="w-5 h-5 text-primary mx-auto" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  }
  return <span className="text-sm text-foreground">{value}</span>;
};

const PricingSection = () => {
  const handleContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="text-gradient">OSINT & Social Engineering</span>
          </h2>
          <p className="section-subtitle">
            Discover what attackers can learn about your organization before they strike. Professional intelligence gathering and security assessments.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group ${tier.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Highlighted Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-mono z-10">
                  RECOMMENDED
                </div>
              )}

              <div
                className={`h-full p-8 rounded-xl border transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-card border-primary/50 shadow-[0_0_40px_rgba(0,255,136,0.15)]'
                    : 'bg-card/50 border-border hover:border-primary/30'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                    tier.highlighted
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10'
                  } transition-colors`}
                >
                  <tier.icon className="w-6 h-6" />
                </div>

                {/* Tier Name */}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{tier.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">{tier.priceNote}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {tier.fiverrLink ? (
                  <Button
                    asChild
                    variant={tier.highlighted ? 'neon' : 'neon-outline'}
                    className="w-full"
                  >
                    <a href={tier.fiverrLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {tier.cta}
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={handleContact}
                    variant={tier.highlighted ? 'neon' : 'neon-outline'}
                    className="w-full"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {tier.cta}
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-primary font-mono">//</span> Feature Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-primary/30">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <span>Basic</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-primary">
                    <div className="flex flex-col items-center gap-1">
                      <Zap className="w-5 h-5 text-primary" />
                      <span>Full</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <Crown className="w-5 h-5 text-accent" />
                      <span>Retainer</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-border/50 transition-colors hover:bg-primary/5 ${
                      index % 2 === 0 ? 'bg-card/30' : 'bg-transparent'
                    }`}
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.feature}</td>
                    <td className="py-3 px-4 text-center">{renderCellValue(row.basic)}</td>
                    <td className="py-3 px-4 text-center bg-primary/5">{renderCellValue(row.full)}</td>
                    <td className="py-3 px-4 text-center">{renderCellValue(row.retainer)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Enterprise Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            Need a custom scope or enterprise solution?{' '}
            <button
              onClick={handleContact}
              className="text-primary hover:underline font-medium"
            >
              Let's discuss your requirements
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
