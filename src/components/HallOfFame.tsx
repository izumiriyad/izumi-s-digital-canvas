import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import SectionTitle from './SectionTitle';

const COMPANIES = [
  'Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'Netflix', 'Uber', 'Airbnb',
  'Shopify', 'Stripe', 'Cloudflare', 'GitHub', 'GitLab', 'Atlassian', 'Twilio',
  'DigitalOcean', 'Adobe', 'IBM', 'Oracle', 'Salesforce', 'Slack', 'Dropbox',
  'Reddit', 'PayPal', 'Square', 'Coinbase', 'Binance', 'OKX', 'BitGo', 'Kraken',
];

const HallOfFame = () => {
  return (
    <section className="py-20" id="hall-of-fame">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-10">
          <SectionTitle text="Hall of Fame" />
          <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            Organizations that publicly acknowledged disclosed vulnerabilities
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {COMPANIES.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -3 }}
              className="aspect-[3/2] flex items-center justify-center rounded-lg border border-primary/20 bg-card/60 backdrop-blur-sm hover:border-primary/60 hover:shadow-[0_0_20px_hsl(152_100%_50%/0.2)] transition-all"
            >
              <span className="font-mono text-xs md:text-sm text-muted-foreground hover:text-primary">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HallOfFame;
