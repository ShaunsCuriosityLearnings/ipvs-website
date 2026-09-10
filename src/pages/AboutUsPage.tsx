import React from 'react';
import { MarqueeTicker } from '../components/layout/MarqueeTicker';
import { AdvisorySection } from '../components/advisory/AdvisorySection';
import { AboutSection } from '../components/home/AboutSection';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { EVENT_DETAILS } from '../data/ipvsData';

import { Building2, MapPin, Calendar, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutUsPageProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenModal }) => {
  return (
    <div className="pt-24 pb-12 animate-in fade-in duration-300">
      
      {/* Page Sub-Hero Banner */}
      <section className="py-10 sm:py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 relative border-b border-slate-800">
        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>ABOUT IPVS 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading mb-4">
            Powering India's <span className="text-gradient-cyan">Process Industry Future</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Organized by Orbit Exhibitions Pvt Ltd, bringing together manufacturers, technology providers, EPC consultants, and plant managers under one roof.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mt-8 text-xs text-slate-300">
            <span className="flex items-center bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-cyan-400 mr-2" />
              {EVENT_DETAILS.dates}
            </span>
            <span className="flex items-center bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-rose-400 mr-2" />
              {EVENT_DETAILS.venue}, Hyderabad
            </span>
            <span className="flex items-center bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <Building2 className="w-3.5 h-3.5 text-emerald-400 mr-2" />
              Orbit Exhibitions Pvt Ltd
            </span>
          </div>
        </div>
      </section>

      {/* Running Marquee Ticker */}
      <MarqueeTicker />

      {/* Main About Component */}
      <AboutSection onOpenModal={onOpenModal} onNavigate={() => {}} />

      {/* Real Past Exhibition Photo Gallery (5-Card Row + Full Lightbox Modal) */}
      <PastExhibitionGallery onOpenModal={onOpenModal} />

      {/* Advisory & Leadership Team */}
      <AdvisorySection />

      {/* Organizer Callout Box */}
      <section className="py-10 sm:py-12 max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">EXHIBITION ORGANIZERS</span>
            <h3 className="text-2xl font-extrabold text-white font-heading">Orbit Exhibitions Pvt. Ltd.</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              With over two decades of track record, Orbit Exhibitions is a leader in conceptualizing and executing high-impact B2B industrial trade shows in India, fostering international trade and technical knowledge exchange.
            </p>
            <p className="text-xs text-slate-400">
              Corporate Office: 103, Navyug Industrial Estate, Tokershi Jivraj Rd, Sewri, Mumbai, MH 400015
            </p>
          </div>

          <div className="flex flex-row gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <button 
              onClick={() => onOpenModal('exhibitor')}
              className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl text-[11px] sm:text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg flex items-center justify-center text-center whitespace-nowrap"
            >
              <span>Book Stall</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
            <button 
              onClick={() => onOpenModal('visitor')}
              className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl text-[11px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center justify-center text-center whitespace-nowrap"
            >
              <span>Visitor Pass</span>
            </button>
          </div>
        </div>
      </section>

      {/* Embedded Registration Form */}
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 pt-8">
        <InlineRegistrationForm />
      </div>

    </div>
  );
};

