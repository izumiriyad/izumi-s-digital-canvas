import { useState, useEffect, lazy } from 'react';
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
import ProcessSection from '@/components/ProcessSection';
import Footer from '@/components/Footer';
import SectionTransition from '@/components/SectionTransition';
import SEO from '@/components/SEO';
import TrustBar from '@/components/TrustBar';
import SocialProofToast from '@/components/SocialProofToast';
import AIChatbot from '@/components/AIChatbot';
import CVETicker from '@/components/CVETicker';

import LazySection from '@/components/LazySection';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

const CaseStudiesSection = lazy(() => import('@/components/CaseStudiesSection'));
const TailoredAssessmentCTA = lazy(() => import('@/components/TailoredAssessmentCTA'));
const PricingSection = lazy(() => import('@/components/PricingSection'));
const RetainerTiers = lazy(() => import('@/components/RetainerTiers'));
const RetainerComparison = lazy(() => import('@/components/RetainerComparison'));
const QuoteCalculator = lazy(() => import('@/components/QuoteCalculator'));
const SecurityScorecard = lazy(() => import('@/components/SecurityScorecard'));
const ScopeWizard = lazy(() => import('@/components/ScopeWizard'));
const AttackChainVisualizer = lazy(() => import('@/components/AttackChainVisualizer'));
const ThreatModelGallery = lazy(() => import('@/components/ThreatModelGallery'));
const CVSSCalculator = lazy(() => import('@/components/CVSSCalculator'));
const ROICalculator = lazy(() => import('@/components/ROICalculator'));
const HallOfFame = lazy(() => import('@/components/HallOfFame'));
const GitHubHeatmap = lazy(() => import('@/components/GitHubHeatmap'));
const TrustExtras = lazy(() => import('@/components/TrustExtras'));
const BacklinkBadge = lazy(() => import('@/components/BacklinkBadge'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const CalendlyEmbed = lazy(() => import('@/components/CalendlyEmbed'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const ResumeSection = lazy(() => import('@/components/ResumeSection'));
const CertificationsSection = lazy(() => import('@/components/CertificationsSection'));

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
          <PWAInstallPrompt />

          {/* Main Sections */}
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-primary/50 focus:bg-card focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-primary">
            Skip to content
          </a>
          <main id="main">
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
            <LazySection label="certifications">
              <SectionTransition style="slide-left">
                <CertificationsSection />
              </SectionTransition>
            </LazySection>
            <LazySection label="resume">
              <SectionTransition style="zoom" delay={0.1}>
                <ResumeSection />
              </SectionTransition>
            </LazySection>
            <SectionTransition style="slide-right">
              <ProcessSection />
            </SectionTransition>
            <LazySection label="casestudies">
              <SectionTransition style="zoom">
                <CaseStudiesSection onIndustryChange={setSelectedIndustry} />
              </SectionTransition>
            </LazySection>
            <LazySection label="tailoredassessmentcta">
              <SectionTransition style="slide-up">
                <TailoredAssessmentCTA defaultIndustry={selectedIndustry} />
              </SectionTransition>
            </LazySection>
            <LazySection label="pricing">
              <SectionTransition style="flip">
                <PricingSection />
              </SectionTransition>
            </LazySection>
            <LazySection label="retainertiers">
              <SectionTransition style="slide-left" delay={0.1}>
                <RetainerTiers />
              </SectionTransition>
            </LazySection>
            <LazySection label="retainercomparison">
              <SectionTransition style="slide-right" delay={0.1}>
                <RetainerComparison />
              </SectionTransition>
            </LazySection>
            <LazySection label="quotecalculator">
              <SectionTransition style="slide-up" delay={0.1}>
  
                <QuoteCalculator />
              </SectionTransition>
            </LazySection>
            <LazySection label="securityscorecard">
              <SectionTransition style="zoom">
                <SecurityScorecard />
              </SectionTransition>
            </LazySection>

            <LazySection label="scopewizard">
              <SectionTransition style="zoom">
                <ScopeWizard />
              </SectionTransition>
            </LazySection>
            <LazySection label="attackchainvisualizer">
              <SectionTransition style="slide-left">
                <AttackChainVisualizer />
              </SectionTransition>
            </LazySection>
            <LazySection label="threatmodelgallery">
              <SectionTransition style="zoom">
                <ThreatModelGallery />
              </SectionTransition>
            </LazySection>
            <LazySection label="cvsscalculator">
              <SectionTransition style="slide-right">
                <CVSSCalculator />
              </SectionTransition>
            </LazySection>
            <LazySection label="roicalculator">
              <SectionTransition style="zoom">
                <ROICalculator />
              </SectionTransition>
            </LazySection>
            <LazySection label="halloffame">
              <SectionTransition style="slide-up">
                <HallOfFame />
              </SectionTransition>
            </LazySection>
            <LazySection label="githubheatmap">
              <SectionTransition style="slide-up">
                <GitHubHeatmap />
              </SectionTransition>
            </LazySection>
            <LazySection label="trustextras">
              <SectionTransition style="curtain">
                <TrustExtras />
              </SectionTransition>
            </LazySection>
            <LazySection label="backlinkbadge">
              <SectionTransition style="slide-up">
                <BacklinkBadge />
              </SectionTransition>
            </LazySection>
            <LazySection label="faq">
              <SectionTransition style="slide-up">
                <FAQSection />
              </SectionTransition>
            </LazySection>
            <LazySection label="calendlyembed">
              <SectionTransition style="zoom">
                <CalendlyEmbed />
              </SectionTransition>
            </LazySection>
            <LazySection label="contact">
              <SectionTransition style="curtain">
                <ContactSection />
              </SectionTransition>
            </LazySection>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
