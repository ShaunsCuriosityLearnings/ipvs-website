import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ESTEEMED_EXHIBITORS } from '../../data/ipvsData';
import { ArrowRight, Building2 } from 'lucide-react';

export const EsteemedExhibitorsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 sm:py-14 bg-[#F8FAFC] text-slate-900 relative">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-8 sm:space-y-10 text-center">

        {/* ==========================================
            HEADER (MATCHING REFERENCE IMAGE 1)
            ========================================== */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-bold uppercase tracking-wider">
            <span>Our Exhibitors</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
            Trusted by 100+ Leading Industrial Brands & Manufacturers
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Leading trade participants showcasing smart pumps, valve automation, process equipment, and fluid handling technologies at IPVS 2026.
          </p>
        </div>

        {/* ==========================================
            LOGO CARDS GRID (MATCHING REFERENCE IMAGES 1 & 2)
            ========================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {ESTEEMED_EXHIBITORS.map((exhibitor) => (
            <div
              key={exhibitor.id}
              onClick={() => navigate('/exhibitor')}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-between text-center min-h-[120px] sm:min-h-[135px]"
            >
              {/* Logo Container with Proper Scaling */}
              <div className="h-12 sm:h-14 w-full flex items-center justify-center p-1">
                <img
                  src={exhibitor.logo}
                  alt={exhibitor.name}
                  className="max-h-10 sm:max-h-12 w-auto max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Brand Name Text under the Logo */}
              <div className="w-full pt-2 border-t border-slate-100/80">
                <h3 className="text-xs font-extrabold text-slate-900 font-heading tracking-tight line-clamp-1 group-hover:text-[#1E65FF] transition-colors">
                  {exhibitor.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ==========================================
            BOTTOM CTA BUTTON
            ========================================== */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/exhibitor')}
            className="px-7 py-3.5 rounded-xl bg-[#111183] hover:bg-[#0e89d0] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-cyan-900/30 inline-flex items-center space-x-2.5 group"
          >
            <Building2 className="w-4 h-4 text-cyan-300 group-hover:text-white" />
            <span>Explore More</span>
            <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
