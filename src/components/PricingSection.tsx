import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Crown, Mail } from 'lucide-react';
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
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic Pentest',
    description: 'Essential security assessment for startups and small applications',
    price: '$500',
    priceNote: 'Starting price',
    icon: Shield,
    features: [
      'Single web application assessment',
      'OWASP Top 10 vulnerability testing',
      'Basic API security review',
      'Authentication & session testing',
      'Executive summary report',
      '1 round of retesting included',
      '5-7 day delivery',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Full Assessment',
    description: 'Comprehensive security audit for established platforms',
    price: '$1,500',
    priceNote: 'Starting price',
    icon: Zap,
    features: [
      'Full web app + API pentest',
      'Business logic vulnerability testing',
      'JWT/OAuth exploitation testing',
      'Payment gateway security review',
      'IDOR/BOLA vulnerability hunting',
      'Detailed technical report with POCs',
      'Remediation guidance & consultation',
      '2 rounds of retesting included',
      '10-14 day delivery',
    ],
    highlighted: true,
    cta: 'Most Popular',
  },
  {
    name: 'Security Retainer',
    description: 'Ongoing security partnership for continuous protection',
    price: '$2,000',
    priceNote: 'per month',
    icon: Crown,
    features: [
      'Dedicated security researcher',
      'Continuous vulnerability monitoring',
      'Priority response (24h SLA)',
      'Monthly security assessments',
      'Custom tool development',
      'Red team simulation exercises',
      'Security training for your team',
      'Unlimited retesting',
      'Direct Slack/Discord access',
    ],
    cta: 'Contact Me',
  },
];

const comparisonFeatures = [
  { feature: 'Web Application Testing', basic: true, full: true, retainer: true },
  { feature: 'API Security Review', basic: 'Basic', full: 'Full', retainer: 'Continuous' },
  { feature: 'OWASP Top 10 Coverage', basic: true, full: true, retainer: true },
  { feature: 'Business Logic Testing', basic: false, full: true, retainer: true },
  { feature: 'Authentication Testing', basic: true, full: true, retainer: true },
  { feature: 'JWT/OAuth Exploitation', basic: false, full: true, retainer: true },
  { feature: 'Payment Gateway Review', basic: false, full: true, retainer: true },
  { feature: 'Custom Tool Development', basic: false, full: false, retainer: true },
  { feature: 'Red Team Exercises', basic: false, full: false, retainer: true },
  { feature: 'Retesting Rounds', basic: '1', full: '2', retainer: 'Unlimited' },
  { feature: 'Delivery Time', basic: '5-7 days', full: '10-14 days', retainer: 'Ongoing' },
  { feature: 'Response SLA', basic: '72h', full: '48h', retainer: '24h' },
  { feature: 'Report Type', basic: 'Summary', full: 'Detailed + POCs', retainer: 'Full + Training' },
  { feature: 'Direct Communication', basic: 'Email', full: 'Email + Call', retainer: 'Slack/Discord' },
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
            <span className="text-gradient">Security Packages</span>
          </h2>
          <p className="section-subtitle">
            Transparent pricing for professional security services. Custom quotes available for enterprise needs.
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
                <Button
                  onClick={handleContact}
                  variant={tier.highlighted ? 'neon' : 'neon-outline'}
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {tier.cta}
                </Button>
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
