import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { ADVISORY_BOARD } from '../../data/ipvsData';

export const AdvisorySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'advisory' | 'technical'>('all');

  const filteredMembers = filter === 'all' 
    ? ADVISORY_BOARD 
    : ADVISORY_BOARD.filter(m => m.category === filter);

  return (
    <section id="advisory" className="py-10 sm:py-14 bg-[#F8FAFC] text-slate-900 relative">
      
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E65FF]/10 border border-[#1E65FF]/20 text-[#1E65FF] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>INDUSTRY LEADERSHIP & GUIDANCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Advisory Board & Technical Committee
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Steered by industry stalwarts from India's leading pump & valve manufacturers and fluid engineering institutions.
          </p>
        </div>

        {/* Filter Switcher Tabs */}
        <div className="flex justify-center">
          <div className="p-1 rounded-2xl bg-white border border-slate-200 shadow-sm flex space-x-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-[#1E65FF] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Committee Members ({ADVISORY_BOARD.length})
            </button>
            <button
              onClick={() => setFilter('advisory')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'advisory'
                  ? 'bg-[#1E65FF] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Advisory Board (9)
            </button>
            <button
              onClick={() => setFilter('technical')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'technical'
                  ? 'bg-[#1E65FF] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Technical Committee (2)
            </button>
          </div>
        </div>

        {/* Advisory Cards Grid matching user screenshots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
          {filteredMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between text-center"
            >
              <div>
                {/* 1. Member Photo Top Frame */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* 2. Member Name */}
                <h3 className="text-base font-extrabold text-[#0D327B] group-hover:text-[#1E65FF] transition-colors leading-tight mb-3 font-heading">
                  {member.name}
                </h3>

                {/* 3. Company Logo Container under the Name */}
                {member.companyLogo && (
                  <div className="h-12 w-full bg-slate-50 rounded-lg p-1.5 border border-slate-200/80 shadow-inner flex items-center justify-center mb-3">
                    <img 
                      src={member.companyLogo} 
                      alt={member.company}
                      className="h-full w-auto object-contain max-h-9 max-w-[90%]"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* 4. Designation & Company Title below the Logo */}
              <div className="pt-2 border-t border-slate-100 space-y-0.5">
                <p className="text-xs font-bold text-slate-800 leading-snug">
                  {member.designation}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider line-clamp-2">
                  {member.company}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
