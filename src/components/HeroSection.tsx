import { motion } from 'framer-motion';
import { Code, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Terminal from './Terminal';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      {/* Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-accent text-lg mb-4"
            >
              Security Researcher | Offensive Engineer | Automation Architect
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gradient">Aftab Ahomod</span>
              <br />
              <span className="text-foreground">Riyad</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Breaking systems for peaking my Dopamine dependency.
              <br />
              <span className="text-primary">5+ years</span> in offensive security & custom tool development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="neon"
                size="lg"
                onClick={scrollToProjects}
                className="group"
              >
                <Code className="mr-2 group-hover:animate-pulse" />
                View My Arsenal
              </Button>
              <Button
                variant="neon-outline"
                size="lg"
                onClick={scrollToContact}
              >
                <Mail className="mr-2" />
                Let's Build Something
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '200+', label: 'Targets Scanned' },
                { value: '15+', label: 'Tools Built' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold font-mono text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Terminal */}
          <div className="flex justify-center lg:justify-end">
            <Terminal />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="text-primary w-8 h-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
