import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, Target, Sparkles, ArrowRight, FileText, Workflow } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import ParallaxSection from '@/components/ParallaxSection';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import MethodologySection from '@/components/MethodologySection';
import SecurityPostureChart from '@/components/SecurityPostureChart';
import SEO from '@/components/SEO';
import { Images } from 'lucide-react';
import { getProjectBySlug, projects } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title} — Case Study | Aftab Ahomod`;
    }
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-background">
      <SEO
        title={`${project.title} — Case Study`}
        description={project.description.length > 155 ? project.description.slice(0, 152) + '…' : project.description}
        canonical={`/projects/${project.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: project.title,
          description: project.description,
          author: { '@type': 'Person', name: 'Aftab Ahomod Riyad' },
          about: project.type,
          keywords: project.tech.join(', '),
        }}
      />
      <ScrollProgress />
      <Navbar />
      <BackToTop />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-6 max-w-6xl">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-3">
              {project.type}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-6">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="font-mono text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Hero screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden border border-border shadow-2xl mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none z-10" />
            <img
              src={project.screenshots[0]}
              alt={`${project.title} screenshot`}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </section>

        {/* Screenshot gallery */}
        <section className="container mx-auto px-6 max-w-6xl py-8">
          <div className="flex items-center gap-3 mb-8">
            <Images className="w-5 h-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Screenshots</h2>
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              {project.screenshots.length} {project.screenshots.length === 1 ? 'image' : 'images'} · click to expand
            </span>
          </div>
          <ScreenshotGallery screenshots={project.screenshots} title={project.title} />
        </section>

        {/* Impact metrics */}
        <ParallaxSection variant="dots" glowColor="primary">
          <section className="container mx-auto px-6 max-w-6xl py-16">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Impact Metrics</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.impact.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-mono">
                    {m.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </ParallaxSection>

        {/* Problem / Solution */}
        <section className="container mx-auto px-6 max-w-6xl py-16 grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center gap-2 text-accent mb-3">
              <Target className="w-5 h-5" />
              <h3 className="text-xl font-semibold">The Problem</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center gap-2 text-primary mb-3">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-xl font-semibold">The Solution</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>
        </section>

        {/* Timeline */}
        <section className="container mx-auto px-6 max-w-6xl py-16">
          <div className="flex items-center gap-3 mb-10">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Engagement Timeline</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-accent/60" />
            <div className="space-y-8">
              {project.timeline.map((step, i) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${
                    i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'
                  }`}
                >
                  <div
                    className={`hidden md:block ${
                      i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="text-xs font-mono uppercase tracking-wider text-accent mb-1">
                      Phase {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-muted-foreground">{step.duration}</div>
                  </div>
                  <div
                    className={`bg-card border border-border rounded-xl p-6 ${
                      i % 2 === 0 ? 'md:ml-12' : 'md:mr-12'
                    }`}
                  >
                    <div className="md:hidden text-xs font-mono uppercase tracking-wider text-accent mb-1">
                      Phase {String(i + 1).padStart(2, '0')} · {step.duration}
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{step.phase}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="container mx-auto px-6 max-w-6xl py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Outcomes</h2>
          <ul className="space-y-4">
            {project.outcomes.map((o) => (
              <li
                key={o}
                className="flex items-start gap-3 bg-card border border-border rounded-lg p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{o}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA + other projects */}
        <section className="container mx-auto px-6 max-w-6xl py-16">
          <div className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border rounded-2xl p-8 md:p-12 text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Need a similar engagement?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Tell me about your scope and I'll scope a tailored assessment built around the
              same playbook used here.
            </p>
            <Button asChild size="lg">
              <Link to="/#contact">
                Start a conversation <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <h3 className="text-xl font-semibold mb-6">Other engagements</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                    {p.type}
                  </div>
                  <div className="font-semibold group-hover:text-primary transition-colors">
                    {p.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
