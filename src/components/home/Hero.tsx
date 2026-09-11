import React, { useState, useRef } from 'react';
import { 
  Play, 
  ArrowRight, 
  Award, 
  CheckCircle2,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { getMediaUrl } from '../../utils/media';

interface HeroProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const reelCdnUrl = "https://res.cloudinary.com/lh8mihme/video/upload/f_auto,q_auto/v1789126184/wkbci960unajh9puvtys.mp4";
  const reelLocalUrl = "/ipvs-reel.mp4";

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

          {/* Right Column - IPVS Official Main Logo + Autoplay Vertical Reel */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end">
            
            {/* IPVS Main Logo Card */}
            <div className="flex justify-center lg:justify-end mb-4 lg:mb-5 w-full max-w-[310px] sm:max-w-[340px]">
              <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/30 hover:scale-105 transition-all duration-300 w-full flex items-center justify-between space-x-3 group">
                <img 
                  src={getMediaUrl("/ipvs_logo.jpg")} 
                  alt="IPVS 2026 Main Exhibition Official Logo" 
                  className="h-14 sm:h-16 w-auto object-contain rounded-lg"
                />
                <div className="text-left pr-2">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#0e89d0]">Official Exhibition</span>
                  <h4 className="text-sm font-black text-slate-900 font-heading leading-tight">IPVS 2026</h4>
                  <p className="text-[11px] text-slate-500 font-medium">HITEX Hyderabad • Dec 03-04</p>
                </div>
              </div>
            </div>

            {/* Vertical Reel Video Device Frame */}
            <div className="relative w-full max-w-[280px] sm:max-w-[310px] lg:max-w-[330px]">
              <div 
                onClick={() => setIsVideoOpen(true)}
                className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/30 bg-slate-950 aspect-[9/16] group cursor-pointer"
              >
                {/* Autoplay Reel Video */}
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={reelCdnUrl} type="video/mp4" />
                  <source src={reelLocalUrl} type="video/mp4" />
                  <source src="/ipvs reel.mp4" type="video/mp4" />
                </video>

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                {/* Top Overlay: Live Reel Tag & Interactive Controls */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-auto">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase border border-white/20 flex items-center space-x-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>IPVS REEL</span>
                  </span>

                  <div className="flex items-center space-x-2">
                    {/* Sound Toggle Button */}
                    <button
                      type="button"
                      onClick={toggleSound}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110 shadow-md"
                      title={isMuted ? "Tap to Unmute" : "Mute Video"}
                      aria-label="Toggle sound"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-white/90" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-cyan-400" />
                      )}
                    </button>

                    {/* Expand to Fullscreen Modal Button */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setIsVideoOpen(true); }}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110 shadow-md"
                      title="Watch Fullscreen"
                      aria-label="Expand video"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-white/90" />
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay: Video Title & Action CTA */}
                <div className="absolute bottom-4 left-4 right-4 text-left z-10 pointer-events-none">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-cyan-300 tracking-wider uppercase block drop-shadow-sm flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Official Event Showcase</span>
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-white font-heading leading-tight drop-shadow-md">
                      Pumps, Valves & Automation 2026
                    </h4>
                    <p className="text-[11px] text-slate-200 drop-shadow-sm">
                      HITEX Hyderabad • Dec 03-04
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge Detail: 100+ Exhibitors */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white text-slate-900 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-slate-200 flex items-center space-x-2.5 z-20 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#111183]/10 text-[#111183] flex items-center justify-center font-black text-lg">
                  100+
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Exhibitors</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Global & Indian Brands</p>
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

      {/* Fullscreen Reel Video Modal Preview with Sound */}
      {isVideoOpen && (
        <div 
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] max-h-[92vh] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3.5 right-3.5 text-white hover:text-slate-300 text-sm font-bold z-30 bg-black/70 hover:bg-black w-9 h-9 rounded-full flex items-center justify-center transition-all border border-white/20 shadow-lg"
              aria-label="Close Modal"
            >
              ✕
            </button>
            <video 
              autoPlay 
              controls 
              playsInline 
              className="w-full h-full object-cover"
            >
              <source src={reelCdnUrl} type="video/mp4" />
              <source src={reelLocalUrl} type="video/mp4" />
              <source src="/ipvs reel.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

