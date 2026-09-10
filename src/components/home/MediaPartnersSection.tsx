import React from 'react';
import { MEDIA_PARTNERS } from '../../data/ipvsData';

export const MediaPartnersSection: React.FC = () => {
  // 3 Media Partners as explicitly requested by user
  const mediaPartners3 = MEDIA_PARTNERS.slice(0, 3);

  return (
    <section className="py-10 sm:py-14 bg-[#F4F7FE] text-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>Industry Support</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Our Media Partners
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Supported by leading global industrial publications, trade journals, and process engineering media networks.
          </p>
        </div>

        {/* ===== MOBILE: Single horizontal row ===== */}
        <div className="sm:hidden flex gap-3 justify-center">
          {mediaPartners3.map((partner) => (
            <div 
              key={partner.id}
              className="flex-shrink-0 bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-col items-center justify-between text-center space-y-2 w-[30vw] max-w-[130px]"
            >
              <div className="w-full h-14 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center border border-slate-100">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h4 className="text-[10px] font-extrabold text-slate-900 font-heading leading-tight line-clamp-1">
                  {partner.name}
                </h4>
                <p className="text-[8px] text-slate-500 font-semibold mt-0.5 line-clamp-1">
                  {partner.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== DESKTOP: 3-column grid ===== */}
        <div className="hidden sm:grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {mediaPartners3.map((partner) => (
            <div 
              key={partner.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#1E65FF]/40 transition-all flex flex-col items-center justify-between text-center space-y-5 group"
            >
              <div className="w-full h-24 rounded-2xl overflow-hidden bg-white p-3 flex items-center justify-center border border-slate-100 shadow-inner">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#1E65FF] transition-colors font-heading">
                  {partner.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {partner.category}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

