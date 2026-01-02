import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import MatrixRain from '@/components/MatrixRain';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FloatingHireButton from '@/components/FloatingHireButton';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ResumeSection from '@/components/ResumeSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload hero background image
    const img = new Image();
    img.src = '/src/assets/hero-bg.jpg';
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <div className="relative min-h-screen">
          {/* Background Effects */}
          <MatrixRain />
          <div className="grid-overlay" />

          {/* Navigation */}
          <Navbar />
          <FloatingHireButton />

          {/* Main Sections */}
          <main>
            <HeroSection />
            <ProjectsSection />
            <BlogSection />
            <TestimonialsSection />
            <AboutSection />
            <SkillsSection />
            <ResumeSection />
            <PricingSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
