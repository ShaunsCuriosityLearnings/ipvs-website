import React from 'react';
import { Play, Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { EVENT_DETAILS } from '../../data/ipvsData';

interface AboutSectionProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <section id="about" className="py-10 sm:py-14 bg-[#F4F7FE] text-slate-800 relative">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Image Collage & Play Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=70"
                  alt="Industrial Expo Exhibition Floor"
                  className="w-full h-[380px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Floating Overlay Second Photo with Play Button (Matching Mockup) */}
              <div className="absolute -bottom-8 -right-4 w-52 sm:w-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=70"
                  alt="Conference Presentation"
                  className="w-full h-40 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Blue Play Icon Square Badge (Matching Eventik Mockup) */}
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-16 h-16 bg-[#1E65FF] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#1E65FF]/40 cursor-pointer hover:bg-[#0D47A1] transition-colors">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>

              {/* Dotted Matrix Background Graphic */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[radial-gradient(#1E65FF_2px,transparent_2px)] [background-size:12px_12px] opacity-40 pointer-events-none"></div>

            </div>
          </div>

          {/* Right Column: About Text & Highlights */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Subhead Tagline */}
            <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
              <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
              <span>ABOUT IPVS</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight font-heading">
              India’s Premier Exhibition for <br />
              <span className="text-[#1E65FF]">Pumps, Valves & Process Industries</span>
            </h2>

            {/* Description */}
            <p className="text-base text-slate-600 leading-relaxed">
              Bringing together manufacturers, technology providers, EPC companies, automation experts, consultants and industrial buyers to explore cutting-edge innovations shaping the future of process industries.
            </p>

            {/* 2 Highlight Feature Boxes (Matching Attached Mockup Design) */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Product Showcases & Launches</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Experience the latest pumps, valves, automation, instrumentation and process technologies from industry leaders.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Business Networking & Partnerships</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Connect with OEMs, EPC companies, consultants, distributors, plant owners and key decision makers.
                </p>
              </div>
            </div>

            {/* Action Area: Reserve Your Stall & Pre-Register as Visitor - Single row on mobile */}
            <div className="pt-4 flex flex-row items-center gap-2 sm:gap-4 w-full">
              <button
                onClick={() => onOpenModal('exhibitor')}
                className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl text-[11px] sm:text-sm font-bold text-white bg-[#1E65FF] hover:bg-[#0D47A1] shadow-lg shadow-[#1E65FF]/30 transition-all flex items-center justify-center uppercase tracking-wider whitespace-nowrap text-center"
              >
                <span>Reserve Stall</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
              </button>

              <button
                onClick={() => onOpenModal('visitor')}
                className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl text-[11px] sm:text-sm font-bold text-[#1E65FF] bg-white border border-slate-300 hover:bg-slate-100 transition-all flex items-center justify-center uppercase tracking-wider whitespace-nowrap text-center"
              >
                <span>Visitor Pass</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2 text-[#1E65FF]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
