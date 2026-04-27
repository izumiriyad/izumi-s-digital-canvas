import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import MatrixRain from '@/components/MatrixRain';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import FloatingHireButton from '@/components/FloatingHireButton';
import BackToTop from '@/components/BackToTop';
import CustomCursor from '@/components/CustomCursor';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ResumeSection from '@/components/ResumeSection';
import PricingSection from '@/components/PricingSection';
import ProcessSection from '@/components/ProcessSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SectionTransition from '@/components/SectionTransition';

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
          <CustomCursor />
          <MatrixRain />
          <div className="grid-overlay" />

          {/* Navigation */}
          <ScrollProgress />
          <Navbar />
          <FloatingHireButton />
          <BackToTop />

          {/* Main Sections */}
          <main>
            <HeroSection />
            <SectionTransition style="slide-up">
              <ProjectsSection />
            </SectionTransition>
            <SectionTransition style="slide-left" delay={0.1}>
              <BlogSection />
            </SectionTransition>
            <SectionTransition style="zoom">
              <TestimonialsSection />
            </SectionTransition>
            <SectionTransition style="slide-right" delay={0.1}>
              <AboutSection />
            </SectionTransition>
            <SectionTransition style="flip">
              <ClientLogosSection />
            </SectionTransition>
            <SectionTransition style="curtain">
              <SkillsSection />
            </SectionTransition>
            <SectionTransition style="slide-left">
              <CertificationsSection />
            </SectionTransition>
            <SectionTransition style="zoom" delay={0.1}>
              <ResumeSection />
            </SectionTransition>
            <SectionTransition style="slide-right">
              <ProcessSection />
            </SectionTransition>
            <SectionTransition style="zoom">
              <CaseStudiesSection />
            </SectionTransition>
            <SectionTransition style="flip">
              <PricingSection />
            </SectionTransition>
            <SectionTransition style="slide-up">
              <FAQSection />
            </SectionTransition>
            <SectionTransition style="curtain">
              <ContactSection />
            </SectionTransition>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
