import React from 'react';
import { AdvisorySection } from '../components/advisory/AdvisorySection';
import { MarqueeTicker } from '../components/layout/MarqueeTicker';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { Award } from 'lucide-react';
import { SEO } from '../components/common/SEO';

interface AdvisoryPageProps {
  onOpenModal?: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const AdvisoryPage: React.FC<AdvisoryPageProps> = ({ onOpenModal }) => {
  return (
    <div className="pt-28 pb-20 animate-in fade-in duration-300">
      <SEO 
        title="Advisory Board & Technical Committee | IPVS 2026"
        description="Meet the esteemed advisory board and technical leaders guiding IPVS 2026, representing Grundfos, ANDRITZ, Wilo, and premier Indian engineering institutions."
        canonical="https://ipvs.in/advisory-board"
      />
      
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 text-center relative">
        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>ADVISORY & TECHNICAL COMMITTEE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading mb-4">
            Industry Leaders & <span className="text-gradient-cyan">Advisory Board</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Distinguished leaders from Grundfos, Andritz Technologies, Wilo Mather & Platt, Fivebro Water, Lehry Instrumentation, BDK Valve, and Delval Flow.
          </p>
        </div>
      </section>

      <MarqueeTicker />

      <AdvisorySection />

      {/* Real Past Exhibition Photo Gallery (5-Card Row + Full Lightbox Modal) */}
      <PastExhibitionGallery onOpenModal={onOpenModal} />

      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 pt-8">
        <InlineRegistrationForm />
      </div>

    </div>
  );
};

