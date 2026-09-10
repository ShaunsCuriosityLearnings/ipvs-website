import React from 'react';
import { Check, Building2, Ticket } from 'lucide-react';

interface PricingSectionProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="py-20 bg-[#F4F7FE] text-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>Exhibition & Participation</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Participation & Registration
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Select the perfect option for your trade delegation or exhibition booth at IPVS 2026 Hyderabad.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Free Trade Visitor */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left">
            <div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase">
                Trade Pass
              </span>
              <div className="my-6">
                <span className="text-4xl font-black text-slate-900 font-heading">FREE</span>
                <span className="text-xs text-slate-500 block mt-1">Pre-Registration Required</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 mb-8">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Access to 2-Day Exhibition Floor</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Entry to Open Technical Demos</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#1E65FF] mr-2 flex-shrink-0" />
                  <span>Official Event Directory PDF</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Full Exhibition Floor Access</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenModal('visitor')}
              className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-[#1E65FF] transition-colors flex items-center justify-center"
            >
              <Ticket className="w-4 h-4 mr-2" />
              Get Free Pass
            </button>
          </div>

          {/* Card 2: Shell Scheme Stall */}
          <div className="bg-gradient-to-b from-[#1E65FF] to-[#0D47A1] text-white rounded-3xl p-8 shadow-2xl shadow-[#1E65FF]/40 border-2 border-white relative flex flex-col justify-between text-left transform md:-translate-y-2">
            
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#1E65FF] font-black text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
              RECOMMENDED FOR EXHIBITORS
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
                Shell Scheme Stall
              </span>
              <div className="my-6">
                <span className="text-2xl font-extrabold text-white font-heading">Turnkey Booth</span>
                <span className="text-xs text-slate-200 block mt-1">Pre-built Octanorm Structure</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-100 mb-8">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#00D2FF] mr-2 flex-shrink-0" />
                  <span>Octanorm Wall Panels & Fascia Board</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#00D2FF] mr-2 flex-shrink-0" />
                  <span>Table, 2 Chairs & Waste Bin</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#00D2FF] mr-2 flex-shrink-0" />
                  <span>3 LED Spotlights & 5A Power Point</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#00D2FF] mr-2 flex-shrink-0" />
                  <span>Full Carpeted Flooring</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenModal('exhibitor')}
              className="w-full py-3.5 rounded-xl bg-white text-[#1E65FF] font-extrabold text-xs hover:bg-slate-100 transition-colors flex items-center justify-center shadow-lg"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Inquire Shell Booth
            </button>
          </div>

          {/* Card 3: Bare Space Stall */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left">
            <div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase">
                Bare Space Stall
              </span>
              <div className="my-6">
                <span className="text-2xl font-extrabold text-slate-900 font-heading">Custom Space</span>
                <span className="text-xs text-slate-500 block mt-1">Raw Exhibition Floor Plot</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 mb-8">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#1E65FF] mr-2 flex-shrink-0" />
                  <span>Raw Floor Space for Custom Booth</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#1E65FF] mr-2 flex-shrink-0" />
                  <span>Ideal for Heavy Pumps & Live Demos</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#1E65FF] mr-2 flex-shrink-0" />
                  <span>Maximum Branding Flexibility</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-[#1E65FF] mr-2 flex-shrink-0" />
                  <span>Customizable Layout Options</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenModal('exhibitor')}
              className="w-full py-3.5 rounded-xl bg-[#1E65FF] text-white font-bold text-xs hover:bg-[#0D47A1] transition-colors flex items-center justify-center"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Inquire Bare Space
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
