import React from 'react';
import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/home/AboutSection';
import { PastHighlightsSection } from '../components/home/PastHighlightsSection';
import { AdvisoryCommitteeSection } from '../components/home/AdvisoryCommitteeSection';
import { EsteemedExhibitorsSection } from '../components/home/EsteemedExhibitorsSection';
import { LatestNewsSection } from '../components/home/LatestNewsSection';
import { MediaPartnersSection } from '../components/home/MediaPartnersSection';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { SEO } from '../components/common/SEO';

interface HomePageProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
  onNavigateToSection: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenModal, onNavigateToSection }) => {
  return (
    <div className="animate-in fade-in duration-300 bg-[#F4F7FE]">
      <SEO 
        title="IPVS 2026 | India's Premier Industrial Pumps, Valves & Process Systems Exhibition"
        description="Connect with 100+ global exhibitors and 5,000+ trade buyers across Ethanol, Pharma, Water Treatment, and Heavy Process industries at HITEX Hyderabad (Dec 03-04, 2026)."
        canonical="https://ipvs.in/"
      />
      
      {/* 1. Hero Section */}
      <Hero onOpenModal={onOpenModal} onNavigate={onNavigateToSection} />

      {/* 2. ABOUT IPVS Section */}
      <AboutSection onOpenModal={onOpenModal} onNavigate={onNavigateToSection} />

      {/* 3. Event Registration for Exhibitors & Highlights Gallery (6 Cards) */}
      <PastHighlightsSection onOpenModal={onOpenModal} />

      {/* 4. Real Past Exhibition Photo Gallery (5-Card Row + Full Lightbox Modal) */}
      <PastExhibitionGallery onOpenModal={onOpenModal} />

      {/* 5. Advisory Committee Members Section */}
      <AdvisoryCommitteeSection />

      {/* 6. Our Esteemed Exhibitors (Moving Logos & Cards) */}
      <EsteemedExhibitorsSection />

      {/* 7. Top Blogs Section */}
      <LatestNewsSection />

      {/* 8. Our Media Partners (3 Media Partners) */}
      <MediaPartnersSection />

      {/* 9. FAQ Section */}
      <FaqAccordion onOpenModal={onOpenModal} />

      {/* Universal Embedded Form (Form on Every Page requirement) */}
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 pb-6 sm:pb-8">
        <InlineRegistrationForm 
          title="Reserve Your Space at IPVS 2026"
          subtitle="Pre-register for your free visitor pass or inquire about exhibitor booth options at HITEX Hyderabad."
        />
      </div>

    </div>
  );
};
