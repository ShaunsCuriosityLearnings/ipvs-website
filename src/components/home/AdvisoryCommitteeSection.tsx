import React from 'react';
import { ADVISORY_BOARD } from '../../data/ipvsData';

/* ---- Inline keyframes for the marquee ---- */
const marqueeStyles = `
@keyframes advisory-scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes advisory-scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
`;

/* Compact card used inside the mobile marquee rows */
const MobileCard: React.FC<{ member: typeof ADVISORY_BOARD[number] }> = ({ member }) => (
  <div className="flex-shrink-0 w-[30vw] max-w-[140px] bg-[#F8FAFC] rounded-xl p-2 border border-slate-200 shadow-sm text-center">
    <div className="aspect-[4/5] w-full rounded-lg overflow-hidden mb-1.5 bg-slate-100 border border-slate-200">
      <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
    </div>
    <h3 className="text-[10px] font-extrabold text-[#0D327B] leading-tight mb-1 line-clamp-2 font-heading">{member.name}</h3>
    {member.companyLogo && (
      <div className="h-7 w-full bg-white rounded p-0.5 border border-slate-200 flex items-center justify-center mb-1">
        <img src={member.companyLogo} alt={member.company} className="h-full w-auto object-contain max-h-5 max-w-[90%]" loading="lazy" />
      </div>
    )}
    <p className="text-[8px] font-bold text-slate-700 leading-snug line-clamp-1">{member.designation}</p>
    <p className="text-[7px] text-slate-500 font-semibold uppercase tracking-wider line-clamp-1">{member.company}</p>
  </div>
);

export const AdvisoryCommitteeSection: React.FC = () => {
  /* Split members into 2 rows for mobile marquee */
  const mid = Math.ceil(ADVISORY_BOARD.length / 2);
  const row1 = ADVISORY_BOARD.slice(0, mid);
  const row2 = ADVISORY_BOARD.slice(mid);

  return (
    <section className="py-10 sm:py-14 bg-white text-slate-900 border-t border-slate-100">
      {/* Inject keyframes */}
      <style>{marqueeStyles}</style>

      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>Industry Leadership</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Advisory Committee Members – IPVS
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Steered by industry stalwarts from India's leading pump & valve manufacturers and fluid engineering institutions.
          </p>
        </div>

        {/* ===== MOBILE: 3-col auto-scrolling marquee (2 rows) ===== */}
        <div className="md:hidden space-y-3 overflow-hidden">
          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-3"
              style={{ animation: 'advisory-scroll-left 25s linear infinite', width: 'max-content' }}
            >
              {[...row1, ...row1].map((member, i) => (
                <MobileCard key={`r1-${member.id}-${i}`} member={member} />
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-3"
              style={{ animation: 'advisory-scroll-right 28s linear infinite', width: 'max-content' }}
            >
              {[...row2, ...row2].map((member, i) => (
                <MobileCard key={`r2-${member.id}-${i}`} member={member} />
              ))}
            </div>
          </div>
        </div>

        {/* ===== DESKTOP: Original 6-column static grid ===== */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-5 items-stretch">
          {ADVISORY_BOARD.map((member) => (
            <div 
              key={member.id}
              className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between text-center"
            >
              <div>
                {/* 1. Member Photo Top Frame */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200 shadow-inner">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* 2. Member Name */}
                <h3 className="text-sm sm:text-base font-extrabold text-[#0D327B] group-hover:text-[#1E65FF] transition-colors leading-tight mb-3 font-heading">
                  {member.name}
                </h3>

                {/* 3. Company Logo Container under the Name */}
                {member.companyLogo && (
                  <div className="h-12 w-full bg-white rounded-lg p-1.5 border border-slate-200 shadow-sm flex items-center justify-center mb-3">
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
              <div className="pt-2 border-t border-slate-200/80 space-y-0.5">
                <p className="text-[11px] font-bold text-slate-800 leading-snug">
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
