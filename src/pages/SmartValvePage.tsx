import React from 'react';
import { SmartValveSection } from '../components/technologies/SmartValveSection';
import { MarqueeTicker } from '../components/layout/MarqueeTicker';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { Cpu, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';


interface SmartValvePageProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const SmartValvePage: React.FC<SmartValvePageProps> = ({ onOpenModal }) => {
  return (
    <div className="pt-28 pb-20 animate-in fade-in duration-300">
      <SEO 
        title="Smart Valves & Flow Automation Machinery | IPVS 2026"
        description="Explore intelligent actuator valves, emergency shutdown systems, cryogenic flow controls, and smart industrial automation solutions at IPVS 2026 Hyderabad."
        canonical="https://ipvs.in/smart-valve-automation"
      />
      
      <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 text-center relative">
        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>SPECIALIZED EXHIBITION LANDING PAGE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading mb-4">
            Smart Valve <span className="text-gradient-cyan">Automation 2026</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Discover advanced valve automation, electric & pneumatic actuators, digital positioners, IIoT integration, and emergency shutdown systems shaping Industry 4.0.
          </p>

          <div className="mt-8 flex flex-row justify-center gap-2.5 sm:gap-3 w-full max-w-md mx-auto">
            <button 
              onClick={() => onOpenModal('exhibitor')}
              className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-950 bg-blue-400 hover:bg-blue-300 transition-all shadow-lg flex items-center justify-center text-center whitespace-nowrap"
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

      <SmartValveSection onOpenModal={onOpenModal} />

      {/* Real Past Exhibition Photo Gallery (5-Card Row + Full Lightbox Modal) */}
      <PastExhibitionGallery onOpenModal={onOpenModal} />

      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 pt-8">
        <InlineRegistrationForm />
      </div>

    </div>
  );
};

