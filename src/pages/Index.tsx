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
import TailoredAssessmentCTA from '@/components/TailoredAssessmentCTA';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SectionTransition from '@/components/SectionTransition';
import SEO from '@/components/SEO';
import TrustBar from '@/components/TrustBar';
import SocialProofToast from '@/components/SocialProofToast';
import AIChatbot from '@/components/AIChatbot';
import CalendlyEmbed from '@/components/CalendlyEmbed';
import CVETicker from '@/components/CVETicker';
import QuoteCalculator from '@/components/QuoteCalculator';
import ROICalculator from '@/components/ROICalculator';
import AttackChainVisualizer from '@/components/AttackChainVisualizer';
import CVSSCalculator from '@/components/CVSSCalculator';
import HallOfFame from '@/components/HallOfFame';
import ThreatModelGallery from '@/components/ThreatModelGallery';
import ScopeWizard from '@/components/ScopeWizard';
import GitHubHeatmap from '@/components/GitHubHeatmap';
import TrustExtras from '@/components/TrustExtras';
import BacklinkBadge from '@/components/BacklinkBadge';
import SecurityScorecard from '@/components/SecurityScorecard';
import RetainerTiers from '@/components/RetainerTiers';
import RetainerComparison from '@/components/RetainerComparison';


const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('FinTech');

  useEffect(() => {
    // Preload hero background image
    const img = new Image();
    img.src = '/src/assets/hero-bg.jpg';
  }, []);

  return (
    <>
      <SEO
        title="Aftab Ahomod Riyad — Offensive Security Engineer"
        description="Penetration testing, API security, OSINT and offensive automation. 500+ vulnerabilities disclosed across 50+ companies."
        canonical="/"
        type="profile"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Aftab Ahomod Riyad',
            jobTitle: 'Offensive Security Engineer',
            url: '/',
            sameAs: [
              'https://www.linkedin.com/in/zeroizumi/',
              'https://www.upwork.com/freelancers/~012d71f9fb100a123f',
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Aftab Ahomod Riyad — Security Consulting',
            areaServed: 'Worldwide',
            serviceType: ['Penetration Testing', 'API Security', 'OSINT', 'Security Automation'],
          },
        ]}
      />
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
          <SocialProofToast />
          <AIChatbot />

          {/* Main Sections */}
          <main>
            <HeroSection />
            <CVETicker />
            <TrustBar />
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
              <CaseStudiesSection onIndustryChange={setSelectedIndustry} />
            </SectionTransition>
            <SectionTransition style="slide-up">
              <TailoredAssessmentCTA defaultIndustry={selectedIndustry} />
            </SectionTransition>
            <SectionTransition style="flip">
              <PricingSection />
            </SectionTransition>
            <SectionTransition style="slide-left" delay={0.1}>
              <RetainerTiers />
            </SectionTransition>
            <SectionTransition style="slide-right" delay={0.1}>
              <RetainerComparison />
            </SectionTransition>
            <SectionTransition style="slide-up" delay={0.1}>

              <QuoteCalculator />
            </SectionTransition>
            <SectionTransition style="zoom">
              <SecurityScorecard />
            </SectionTransition>

            <SectionTransition style="zoom">
              <ScopeWizard />
            </SectionTransition>
            <SectionTransition style="slide-left">
              <AttackChainVisualizer />
            </SectionTransition>
            <SectionTransition style="zoom">
              <ThreatModelGallery />
            </SectionTransition>
            <SectionTransition style="slide-right">
              <CVSSCalculator />
            </SectionTransition>
            <SectionTransition style="zoom">
              <ROICalculator />
            </SectionTransition>
            <SectionTransition style="slide-up">
              <HallOfFame />
            </SectionTransition>
            <SectionTransition style="slide-up">
              <GitHubHeatmap />
            </SectionTransition>
            <SectionTransition style="curtain">
              <TrustExtras />
            </SectionTransition>
            <SectionTransition style="slide-up">
              <BacklinkBadge />
            </SectionTransition>
            <SectionTransition style="slide-up">
              <FAQSection />
            </SectionTransition>
            <SectionTransition style="zoom">
              <CalendlyEmbed />
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
