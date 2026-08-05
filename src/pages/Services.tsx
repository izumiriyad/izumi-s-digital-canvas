import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Plug, Search, Cloud, Smartphone, Coins, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';
import SEO from '@/components/SEO';
import { services } from '@/data/services';

const icons = { globe: Globe, plug: Plug, search: Search, cloud: Cloud, smartphone: Smartphone, coins: Coins };

const Services = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Security Services — Pentest, API, Cloud, Mobile, Web3"
      description="Offensive security services: web and API penetration testing, OSINT attack surface audits, cloud reviews, mobile testing and smart contract audits."
      canonical="/services"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Security Services',
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.name,
          url: `/services/${s.slug}`,
        })),
      }}
    />
    <ScrollProgress />
    <Navbar />
    <BackToTop />

    <main className="container mx-auto px-6 pt-28 pb-20 max-w-6xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Security <span className="text-primary">Services</span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mb-12">
        Six focused engagements. Each one is manual, exploit-driven work with a report your engineers and your
        auditors can both use. Pick the surface you need tested.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/services/${s.slug}`}
                className="group block h-full p-6 rounded-xl border border-border hover:border-primary/50 bg-card/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">{s.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{s.tagline}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-mono">
                      <span className="text-primary">from ${s.priceFrom.toLocaleString()}</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" /> {s.duration}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View scope <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
    <Footer />
  </div>
);

export default Services;
