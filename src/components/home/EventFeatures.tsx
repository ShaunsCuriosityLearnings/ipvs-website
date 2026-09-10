import React from 'react';
import { Users, Cpu, Layers, Building2, ChevronRight } from 'lucide-react';

interface EventFeaturesProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const EventFeatures: React.FC<EventFeaturesProps> = ({ onOpenModal }) => {
  const features = [
    {
      icon: Users,
      title: "Speaker Lineup",
      desc: "Top industry leaders, plant directors, and technical experts sharing insights on Ethanol, Water & Pharma flow systems."
    },
    {
      icon: Layers,
      title: "Networking People",
      desc: "Dedicated B2B matchmaking sessions connecting OEMs with high-volume buyers, EPC contractors, and distributors."
    },
    {
      icon: Cpu,
      title: "Engaging Keynote",
      desc: "Deep-dive sessions on Industry 4.0, Smart Valves, IoT Pumps, and predictive condition monitoring for process plants."

    },
    {
      icon: Building2,
      title: "Exhibition Space",
      desc: "Over 10,000 SQM of active display space featuring 100+ Exhibitors and live machinery demonstrations."
    }
  ];

  return (
    <section className="py-20 bg-[#F4F7FE] text-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>Event Features</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Unifying For A Better World
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Discover why IPVS 2026 is the most essential gathering for industrial fluid handling and process engineering professionals in India.
          </p>
        </div>

        {/* 4 Cards Grid (Matching Eventik Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <div 
                key={idx}
                className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group text-left flex flex-col justify-between"
              >
                {/* Top Right Blue Circle Badge Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#1E65FF] text-white flex items-center justify-center shadow-lg shadow-[#1E65FF]/30 group-hover:scale-110 transition-transform mb-6">
                  <IconComp className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1E65FF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {feature.desc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-[#1E65FF] group-hover:translate-x-1 transition-transform">
                  <span>Learn Details</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
