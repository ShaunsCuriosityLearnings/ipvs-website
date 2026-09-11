import React from 'react';
import { MEDIA_PARTNERS } from '../../data/ipvsData';

export const MediaPartnersSection: React.FC = () => {
  // 3 Media Partners as explicitly requested by user
  const mediaPartners3 = MEDIA_PARTNERS.slice(0, 3);

  return (
    <section className="py-8 sm:py-10 bg-[#F4F7FE] text-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>Industry Support</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
            Our Media Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Supported by leading global industrial publications, trade journals, and process engineering media networks.
          </p>
        </div>

        {/* ===== MOBILE: Single horizontal row ===== */}
        <div className="sm:hidden flex gap-3 justify-center">
          {mediaPartners3.map((partner) => (
            <div 
              key={partner.id}
              className="flex-shrink-0 bg-white rounded-xl p-2.5 border-t-2 border-t-[#1E65FF] border-x-0 border-b-0 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] flex flex-col items-center justify-between text-center space-y-1.5 w-[30vw] max-w-[130px]"
            >
              <div className="w-full h-12 rounded-lg overflow-hidden bg-slate-50 p-1 flex items-center justify-center">
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

        {/* ===== DESKTOP: 3-column grid with Top Accent Border ===== */}
        <div className="hidden sm:grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          {mediaPartners3.map((partner) => (
            <div 
              key={partner.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border-t-4 border-t-[#1E65FF] border-x-0 border-b-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-between text-center space-y-4 group"
            >
              <div className="w-full h-20 rounded-xl overflow-hidden bg-slate-50/80 p-2.5 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#1E65FF] transition-colors font-heading">
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

