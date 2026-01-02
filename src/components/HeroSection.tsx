import { motion } from 'framer-motion';
import { Code, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Terminal from './Terminal';
import AnimatedCounter from './AnimatedCounter';
import TypingEffect from './TypingEffect';
import heroBg from '@/assets/hero-bg.jpg';
import profilePhoto from '@/assets/izumi-profile.jpg';

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

            {/* Name with Typing Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gradient">
                <TypingEffect text="Aftab Ahomod" delay={500} speed={80} />
              </span>
              <br />
              <span className="text-foreground">
                <TypingEffect text="Riyad" delay={1700} speed={100} />
              </span>
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

            {/* Stats Row with Animated Counters */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              <AnimatedCounter value="5+" label="Years Experience" duration={1.5} />
              <AnimatedCounter value="200+" label="Targets Scanned" duration={2} />
              <AnimatedCounter value="15+" label="Tools Built" duration={1.8} />
            </div>
          </div>

          {/* Right Content - Profile Photo & Terminal */}
          <div className="flex flex-col items-center lg:items-end gap-8">
            {/* Profile Photo with Glowing Border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {/* Intense outer glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-xl opacity-60 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 animate-pulse" />
              
              {/* Secondary glow layer */}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur-lg opacity-40 group-hover:opacity-80 transition-all duration-500" />
              
              {/* Inner glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Profile image container */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-primary group-hover:border-primary/100 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,136,0.3)] group-hover:shadow-[0_0_60px_rgba(0,255,136,0.6),0_0_100px_rgba(0,153,255,0.4)]">
                <img
                  src={profilePhoto}
                  alt="Aftab Ahomod Riyad - Security Researcher"
                  className="w-full h-full object-cover group-hover:brightness-110 group-hover:contrast-105 transition-all duration-300"
                />
                
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none group-hover:via-primary/10 transition-all duration-300" />
              </div>
              
              {/* Floating particles around photo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full blur-sm" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-accent rounded-full blur-sm" />
                <div className="absolute top-1/2 left-0 w-1 h-1 bg-primary rounded-full blur-sm" />
              </motion.div>
            </motion.div>

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
