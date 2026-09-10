import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  Award, 
  CheckCircle2
} from 'lucide-react';
import { getMediaUrl } from '../../utils/media';

interface HeroProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="hero" className="relative bg-gradient-to-br from-[#111183] via-[#0f4f9e] to-[#0e89d0] text-white pt-36 sm:pt-40 lg:pt-44 pb-32 sm:pb-36 lg:pb-40 overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00D2FF]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column - Main Headline & Information */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Subhead Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#38BDF8] text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Business Expo 2026</span>
              <span className="text-white/40">|</span>
              <span className="text-white">December 03-04, 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Discover Technologies Driving India's <span className="text-[#38BDF8]">Fastest Growing Industries</span>
            </h1>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
              From Ethanol Plants and Water Treatment to pharmaceuticals, chemicals, food processing, and Industry 4.0, discover the latest Pumps, Valves & Automation and process technologies under one roof.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                <span>100+ Exhibitors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                <span>+7000 Visitors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                <span>HITEX Exhibition Center, Hyderabad</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                <span>Ethanol, Pharma & Water Sectors</span>
              </div>
            </div>

            {/* Key Focus Sectors Strip */}
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-xs text-slate-200 space-y-1">
              <span className="text-[#38BDF8] font-bold block uppercase tracking-wider text-[11px]">
                We are mainly focused towards:
              </span>
              <p className="text-slate-100 font-medium leading-relaxed">
                Pumps, Valves | Oil & Gas | Pharma | Water | Chemicals | Power | Steel | Food | Cement | EPC | OEM
              </p>
            </div>

            {/* CTA Buttons - Single row on mobile */}
            <div className="flex flex-row items-center gap-2 sm:gap-4 pt-4 w-full">
              <button 
                onClick={() => onOpenModal('exhibitor')}
                className="flex-1 sm:flex-initial px-3 sm:px-8 py-3.5 sm:py-4 rounded-xl text-[11px] sm:text-sm font-bold text-white bg-gradient-to-r from-[#111183] to-[#0e89d0] hover:from-[#0d0d6c] hover:to-[#0c74b1] shadow-xl shadow-blue-950/50 border border-white/20 transition-all uppercase tracking-wider flex items-center justify-center text-center whitespace-nowrap"
              >
                <span>Become Exhibitor</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
              </button>

              <button 
                onClick={() => onOpenModal('visitor')}
                className="flex-1 sm:flex-initial px-3 sm:px-8 py-3.5 sm:py-4 rounded-xl text-[11px] sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all uppercase tracking-wider flex items-center justify-center text-center whitespace-nowrap backdrop-blur-md"
              >
                <span>Register As Visitor</span>
              </button>
            </div>

          </div>

          {/* Right Column - IPVS Official Main Logo + Event Video Preview */}
          <div className="lg:col-span-5 relative">
            
            {/* IPVS Main Logo Card - Positioned in the Top-Right of Hero as drawn by User */}
            <div className="flex justify-center lg:justify-end mb-4 lg:mb-5">
              <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/30 hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3 group">
                <img 
                  src={getMediaUrl("/ipvs_logo.jpg")} 
                  alt="IPVS 2026 Main Exhibition Official Logo" 
                  className="h-16 sm:h-20 lg:h-24 w-auto object-contain rounded-lg"
                />
                <div className="text-left pr-2 hidden sm:block">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#0e89d0]">Official Exhibition</span>
                  <h4 className="text-sm font-black text-slate-900 font-heading leading-tight">IPVS 2026</h4>
                  <p className="text-[11px] text-slate-500 font-medium">HITEX Hyderabad • Dec 03-04</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Speaker Video Container Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=70" 
                  alt="IPVS Keynote Conference Speaker"
                  className="w-full h-[380px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111183]/90 via-transparent to-transparent"></div>

                {/* Floating Video Play Button Badge */}
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="absolute inset-0 m-auto w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-[#111183] shadow-2xl transition-transform transform hover:scale-110 cursor-pointer group-hover:shadow-blue-900/50"
                  aria-label="Play Conference Video"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>

                {/* Bottom Speaker Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-left">
                  <div>
                    <h4 className="text-lg font-bold text-white">IPVS 2026 Keynote Summit</h4>
                    <p className="text-xs text-slate-300">Live Demonstrations & Technical Sessions</p>
                  </div>
                  <div className="flex -space-x-2">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Speaker" loading="lazy" decoding="async" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Speaker" loading="lazy" decoding="async" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Speaker" loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>

              {/* Floating Badge Detail */}
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-200 flex items-center space-x-3 hidden sm:flex">
                <div className="w-12 h-12 rounded-xl bg-[#111183]/10 text-[#111183] flex items-center justify-center font-bold text-xl">
                  100+
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 uppercase">Exhibitors</p>
                  <p className="text-[11px] text-slate-500">Global & Indian Brands</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Signature Blue SVG Wave Curve Divider (Transitioning to Light Body) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg 
          className="relative block w-full h-16 sm:h-24 lg:h-28 text-[#F4F7FE]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* Video Modal Preview */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-slate-300 text-xl font-bold z-10 bg-black/50 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/xWqE6zKnFjU?autoplay=1&rel=0" 
                title="IPVS Event Official Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
