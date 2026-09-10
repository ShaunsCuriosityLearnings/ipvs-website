import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Rajesh K. Mehta",
      role: "VP Plant Operations",
      company: "Reliance Petrochemicals",
      quote: "IPVS Expo is the definitive platform for discovering heavy-duty slurry pumps and automated valve assemblies under one roof.",
      rating: 5
    },
    {
      name: "Ananya Deshmukh",
      role: "Chief Process Engineer",
      company: "Dr. Reddy's Laboratories",
      quote: "The technical depth of smart valve automation and IoT pump monitoring demonstrated here gave us actionable insights for our plant.",
      rating: 5
    },
    {
      name: "Vikramjit Singh",
      role: "Director Procurement",
      company: "Praj Industries",
      quote: "Extremely well organized by Orbit Exhibitions. We finalized three key supplier contracts for our bio-ethanol expansion project.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white text-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>Testimonials</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            What Attendees Say
          </h2>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-[#F4F7FE] rounded-3xl p-8 border border-slate-200 shadow-sm relative text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#1E65FF]/20" />
                </div>

                <p className="text-sm text-slate-600 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-base font-bold text-slate-900">{t.name}</h4>
                <p className="text-xs font-semibold text-[#1E65FF]">{t.role}</p>
                <p className="text-[11px] text-slate-500">{t.company}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
