import React from 'react';
import { SmartPumpsSection } from '../components/technologies/SmartPumpsSection';
import { MarqueeTicker } from '../components/layout/MarqueeTicker';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { Layers, ArrowRight } from 'lucide-react';

interface SmartPumpPageProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const SmartPumpPage: React.FC<SmartPumpPageProps> = ({ onOpenModal }) => {
  return (
    <div className="pt-28 pb-20 animate-in fade-in duration-300">
      
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 text-center relative">
        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>SPECIALIZED EXHIBITION LANDING PAGE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading mb-4">
            Smart IoT <span className="text-gradient-cyan">Pumps Showcase</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Automated smart pumping systems, predictive maintenance platforms, digital twin simulations, VFD controllers, and cloud telemetry for modern process industries.
          </p>


          <div className="mt-8 flex flex-row justify-center gap-2.5 sm:gap-3 w-full max-w-md mx-auto">
            <button 
              onClick={() => onOpenModal('exhibitor')}
              className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl text-[11px] sm:text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-lg flex items-center justify-center text-center whitespace-nowrap"
            >
              <span>Book Stall</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
            <button 
              onClick={() => onOpenModal('visitor')}
              className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white transition-all flex items-center justify-center text-center whitespace-nowrap"
            >
              <span>Visitor Pass</span>
            </button>
          </div>
        </div>
      </section>

      <MarqueeTicker />

      <SmartPumpsSection onOpenModal={onOpenModal} />

      {/* Real Past Exhibition Photo Gallery (5-Card Row + Full Lightbox Modal) */}
      <PastExhibitionGallery onOpenModal={onOpenModal} />

      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 pt-8">
        <InlineRegistrationForm />
      </div>

    </div>
  );
};

