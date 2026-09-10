import React from 'react';
import { ADVISORY_BOARD } from '../../data/ipvsData';

export const SpeakersSection: React.FC = () => {
  // Select top advisory members for speaker cards display
  const speakers = [
    {
      name: "Shankar Rajaram",
      role: "Director",
      company: "Grundfos Pumps India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Praveen Singh",
      role: "Vice President (Pumps)",
      company: "Andritz Technologies",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Abbas Lehry",
      role: "Managing Director",
      company: "Lehry Valves",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Chandrashekhar T.",
      role: "AVP & Segment Head",
      company: "Wilo Mather & Platt",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-20 bg-[#F4F7FE] text-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>Our Keynote Speakers</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Meet Our Speakers
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Industry pioneers driving innovations across pump design, smart valve positioners, and process automation.
          </p>
        </div>

        {/* Speakers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group text-center p-6"
            >
              <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#1E65FF]/20 group-hover:border-[#1E65FF] transition-colors">
                <img 
                  src={speaker.image} 
                  alt={speaker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1E65FF] transition-colors">
                {speaker.name}
              </h3>
              <p className="text-xs font-semibold text-[#1E65FF] mb-1">
                {speaker.role}
              </p>
              <p className="text-xs text-slate-500">
                {speaker.company}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
