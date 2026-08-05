import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Plug,
  Search,
  Cloud,
  Smartphone,
  Coins,
  Wrench,
  Target,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';
import SEO from '@/components/SEO';
import NotFound from './NotFound';
import { getService, services } from '@/data/services';

const icons = { globe: Globe, plug: Plug, search: Search, cloud: Cloud, smartphone: Smartphone, coins: Coins };

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <NotFound />;

  const Icon = icons[service.icon];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${service.name} — from $${service.priceFrom}`}
        description={service.summary}
        canonical={`/services/${service.slug}`}
        type="website"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.name,
            description: service.summary,
            serviceType: service.name,
            areaServed: 'Worldwide',
            provider: { '@type': 'Person', name: 'Aftab Ahomod Riyad' },
            offers: {
              '@type': 'Offer',
              price: service.priceFrom,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: service.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'Services', item: '/services' },
              { '@type': 'ListItem', position: 3, name: service.name, item: `/services/${service.slug}` },
            ],
          },
        ]}
      />
      <ScrollProgress />
      <Navbar />
      <BackToTop />

      <main className="container mx-auto px-6 pt-28 pb-20 max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
          <Link to="/services" className="inline-flex items-center gap-2 hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" /> All services
          </Link>
        </nav>

        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 inline-flex mb-5">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{service.name}</h1>
          <p className="text-lg text-primary/90 mb-5">{service.tagline}</p>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{service.summary}</p>

          <div className="flex flex-wrap gap-3 mt-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-sm font-mono text-primary">
              <DollarSign className="w-4 h-4" /> from ${service.priceFrom.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm font-mono text-muted-foreground">
              <Clock className="w-4 h-4" /> {service.duration}
            </span>
            <Link
              to="/report"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm hover:border-primary/50 transition"
            >
              <FileText className="w-4 h-4" /> See a sample report
            </Link>
          </div>
        </motion.header>

        <section className="mt-14 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> What&apos;s in scope
            </h2>
            <ul className="space-y-2">
              {service.scope.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> What you receive
            </h2>
            <ul className="space-y-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold mb-6">Methodology</h2>
          <ol className="relative border-l border-border ml-2 space-y-6">
            {service.methodology.map((m, i) => (
              <li key={m.phase} className="ml-6">
                <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 border border-primary text-[9px] font-mono text-primary">
                  {i + 1}
                </span>
                <h3 className="font-medium">{m.phase}</h3>
                <p className="text-sm text-muted-foreground">{m.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" /> Tooling
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.tools.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full border border-border bg-card/60 text-xs font-mono text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-14 p-6 rounded-xl border border-primary/30 bg-card/60">
          <h2 className="text-xl font-semibold mb-4">Outcomes</h2>
          <ul className="space-y-2">
            {service.outcomes.map((o) => (
              <li key={o} className="flex gap-2 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {o}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold mb-6">Frequently asked</h2>
          <div className="space-y-4">
            {service.faqs.map((f) => (
              <details key={f.q} className="group p-4 rounded-lg border border-border bg-card/40">
                <summary className="cursor-pointer font-medium text-sm list-none flex justify-between gap-4">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14 text-center p-8 rounded-xl border border-primary/30 bg-primary/5">
          <h2 className="text-2xl font-bold mb-3">Ready to scope this engagement?</h2>
          <p className="text-muted-foreground mb-6">First response within 24 hours. Mutual NDA before any scoping call.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/#book"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              Book a scoping call
            </Link>
            <Link to="/#contact" className="px-6 py-3 rounded-lg border border-border hover:border-primary/50 transition">
              Send details
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-lg font-semibold mb-4">Other services</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/services/${o.slug}`}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition text-sm"
              >
                <span className="font-medium">{o.name}</span>
                <span className="block text-xs text-muted-foreground mt-1 font-mono">from ${o.priceFrom.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
