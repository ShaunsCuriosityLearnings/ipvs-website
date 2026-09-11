import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight, Ticket, Camera, ZoomIn } from 'lucide-react';
import { getMediaUrl } from '../../utils/media';

interface PastExhibitionGalleryProps {
  onOpenModal?: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
  className?: string;
}

// 81 past exhibition images from public/we (including latest finalle series, all optimized to lightweight WebP)
const PAST_GALLERY_IMAGES = [
  // --- Latest Featured Brand Stalls & Live Action (finalle 1-5) ---
  { id: 1, src: '/we/finalle (5).webp', title: 'ANDRITZ World-Class Luminous Exhibition Stall', category: 'Exhibition Floor', brand: 'ANDRITZ' },
  { id: 2, src: '/we/finalle (1).webp', title: 'Grundfos Industrial Pumps & Game Zone Stall', category: 'Exhibition Floor', brand: 'GRUNDFOS' },
  { id: 3, src: '/we/finalle (3).webp', title: 'Wilo Advanced Multistage Pumps Live Showcase', category: 'Exhibition Floor', brand: 'WILO' },
  { id: 4, src: '/we/finalle (4).webp', title: 'Sant Valves & Heavy Machinery Live Operational Demonstration', category: 'Live Demos', brand: 'SANT VALVES' },
  { id: 5, src: '/we/finalle (2).webp', title: 'Wilo VIP Customer Inquiries & Executive Deal Discussions', category: 'B2B Meetings', brand: 'WILO' },

  // --- Curated Flagship Expo Moments (webkeep 0-7) ---
  { id: 6, src: '/we/webkeep.webp', title: 'Exhibition Grand Inauguration Ceremony', category: 'Inauguration' },
  { id: 7, src: '/we/webkeep1.webp', title: 'Industrial Pumps & Systems Showcase Floor', category: 'Exhibition Floor' },
  { id: 8, src: '/we/webkeep2.webp', title: 'Smart Valve Machinery & Automation Display', category: 'Exhibition Floor' },
  { id: 9, src: '/we/webkeep3.webp', title: 'B2B Business Networking & Procurement Session', category: 'B2B Meetings' },
  { id: 10, src: '/we/webkeep4.webp', title: 'Technical Product Live Operational Demonstration', category: 'Live Demos' },
  { id: 11, src: '/we/webkeep5.webp', title: 'VIP Dignitary Stall Tour & Inspection', category: 'Inauguration' },
  { id: 12, src: '/we/webkeep6.webp', title: 'Exhibitor Product Unveiling & Media Launch', category: 'Live Demos' },
  { id: 13, src: '/we/webkeep7.webp', title: 'High-Level Industry Conference & Technical Summit', category: 'B2B Meetings' },

  // --- High-Resolution Exhibition Archive (DSC Series) ---
  { id: 14, src: '/we/DSC01526.webp', title: 'Main Pavilion Opening', category: 'Inauguration' },
  { id: 15, src: '/we/DSC01536.webp', title: 'Industrial Flow Equipment Stall', category: 'Exhibition Floor' },
  { id: 16, src: '/we/DSC01538.webp', title: 'Process Flow Equipment Display', category: 'Exhibition Floor' },
  { id: 17, src: '/we/DSC01567.webp', title: 'Buyer & Vendor Interactions', category: 'B2B Meetings' },
  { id: 18, src: '/we/DSC01582.webp', title: 'VIP Lamp Lighting Ceremony', category: 'Inauguration' },
  { id: 19, src: '/we/DSC01596.webp', title: 'Live Pump Demonstration', category: 'Live Demos' },
  { id: 20, src: '/we/DSC01599.webp', title: 'Delegate Registration Arena', category: 'Exhibition Floor' },
  { id: 21, src: '/we/DSC01600.webp', title: 'Actuator & Valve Unveiling', category: 'Live Demos' },
  { id: 22, src: '/we/DSC01621.webp', title: 'Leadership Technical Forum', category: 'B2B Meetings' },
  { id: 23, src: '/we/DSC01632.webp', title: 'Fluid Control Machinery Stall', category: 'Exhibition Floor' },
  { id: 24, src: '/we/DSC01645.webp', title: 'Ethanol & Biofuels Pavilion', category: 'Exhibition Floor' },
  { id: 25, src: '/we/DSC01647.webp', title: 'International Exhibitor Booth', category: 'Exhibition Floor' },
  { id: 26, src: '/we/DSC01657.webp', title: 'Piping & Fitting Demos', category: 'Live Demos' },
  { id: 27, src: '/we/DSC01683.webp', title: 'Inaugural Dignitaries Stage', category: 'Inauguration' },
  { id: 28, src: '/we/DSC01705.webp', title: 'Smart IoT Pumps Display', category: 'Exhibition Floor' },
  { id: 29, src: '/we/DSC01709.webp', title: 'Industrial Trade Delegation', category: 'Exhibition Floor' },
  { id: 30, src: '/we/DSC01712.webp', title: 'Chemical Process Valves Setup', category: 'Exhibition Floor' },
  { id: 31, src: '/we/DSC01730.webp', title: 'Industry Leadership Discussions', category: 'B2B Meetings' },
  { id: 32, src: '/we/DSC01735.webp', title: 'Exhibitor Excellence Awards', category: 'Inauguration' },
  { id: 33, src: '/we/DSC01738.webp', title: 'Heavy Duty Process Valves', category: 'Exhibition Floor' },
  { id: 34, src: '/we/DSC01750.webp', title: 'Live Pump Pressure Testing Rig', category: 'Live Demos' },
  { id: 35, src: '/we/DSC01758.webp', title: 'Engineering Consultants Meet', category: 'B2B Meetings' },
  { id: 36, src: '/we/DSC01763.webp', title: 'Pharma Processing Systems Stall', category: 'Exhibition Floor' },
  { id: 37, src: '/we/DSC01774.webp', title: 'Visitors Exploring Technologies', category: 'Exhibition Floor' },
  { id: 38, src: '/we/DSC01778.webp', title: 'Piping & Actuator Machinery Display', category: 'Exhibition Floor' },
  { id: 39, src: '/we/DSC01787.webp', title: 'Distributor & Dealer Conference', category: 'B2B Meetings' },
  { id: 40, src: '/we/DSC01788.webp', title: 'Smart Control Valve Automation Demo', category: 'Live Demos' },
  { id: 41, src: '/we/DSC01823.webp', title: 'Official Exhibition Ribbon Cutting', category: 'Inauguration' },
  { id: 42, src: '/we/DSC01835.webp', title: 'Global Automation Pavilion', category: 'Exhibition Floor' },
  { id: 43, src: '/we/DSC01844.webp', title: 'High Pressure Water Jet Pumps', category: 'Exhibition Floor' },
  { id: 44, src: '/we/DSC01850.webp', title: 'CEO & Plant Head Discussions', category: 'B2B Meetings' },
  { id: 45, src: '/we/DSC01884.webp', title: 'Exhibitor Pavilion Guided Tour', category: 'Exhibition Floor' },
  { id: 46, src: '/we/DSC01902.webp', title: 'Fluid Handling Solutions Arena', category: 'Exhibition Floor' },
  { id: 47, src: '/we/DSC01952.webp', title: 'Inaugural Address by Industry Leaders', category: 'Inauguration' },
  { id: 48, src: '/we/DSC01964.webp', title: 'B2B Procurement Deal Signings', category: 'B2B Meetings' },
  { id: 49, src: '/we/DSC01967.webp', title: 'Submersible Pumps Exhibition Area', category: 'Exhibition Floor' },
  { id: 50, src: '/we/DSC01978.webp', title: 'High Temperature Process Valves', category: 'Exhibition Floor' },
  { id: 51, src: '/we/DSC01982.webp', title: 'Visitor Registration & Entry Arena', category: 'Exhibition Floor' },
  { id: 52, src: '/we/DSC01984.webp', title: 'Technical Whitepaper & Report Release', category: 'B2B Meetings' },
  { id: 53, src: '/we/DSC01988.webp', title: 'Networking Lounge Discussions', category: 'B2B Meetings' },
  { id: 54, src: '/we/DSC02017.webp', title: 'VIP Tour of Innovation Stalls', category: 'Inauguration' },
  { id: 55, src: '/we/DSC02033.webp', title: 'Solar Powered Pump Demo Unit', category: 'Live Demos' },
  { id: 56, src: '/we/DSC02034.webp', title: 'Industrial Wastewater Treatment Systems', category: 'Exhibition Floor' },
  { id: 57, src: '/we/DSC02041.webp', title: 'Plant Engineers Technical Q&A Meet', category: 'B2B Meetings' },
  { id: 58, src: '/we/DSC02086.webp', title: 'Steel & Energy Valve Solutions', category: 'Exhibition Floor' },
  { id: 59, src: '/we/DSC02095.webp', title: 'Heavy Process Engineering Stall', category: 'Exhibition Floor' },
  { id: 60, src: '/we/DSC02164.webp', title: 'International B2B Matchmaking', category: 'B2B Meetings' },
  { id: 61, src: '/we/DSC02180.webp', title: 'Dynamic Hydraulic Testing Display', category: 'Live Demos' },
  { id: 62, src: '/we/DSC02185.webp', title: 'Orbit Exhibitions Director Welcome Address', category: 'Inauguration' },
  { id: 63, src: '/we/DSC02198.webp', title: 'Biofuel & Ethanol Pump Machinery', category: 'Exhibition Floor' },
  { id: 64, src: '/we/DSC02231.webp', title: 'Custom Gaskets & Seals Showcase', category: 'Exhibition Floor' },
  { id: 65, src: '/we/DSC02259.webp', title: 'Buyer-Seller Networking Meet', category: 'B2B Meetings' },
  { id: 66, src: '/we/DSC02261.webp', title: 'Electric Actuator Live Automation Rig', category: 'Live Demos' },
  { id: 67, src: '/we/DSC02265.webp', title: 'Inaugural Plaque Unveiling Ceremony', category: 'Inauguration' },
  { id: 68, src: '/we/DSC02281.webp', title: 'High Capacity Chemical Centrifugal Pumps', category: 'Exhibition Floor' },
  { id: 69, src: '/we/DSC02285.webp', title: 'Process Automation Systems Stall', category: 'Exhibition Floor' },
  { id: 70, src: '/we/DSC02292.webp', title: 'Stall Catalog & Specs Exchange', category: 'B2B Meetings' },
  { id: 71, src: '/we/DSC02296.webp', title: 'Pneumatic Valve Automation Demo', category: 'Live Demos' },
  { id: 72, src: '/we/DSC02305.webp', title: 'VIP Dignitaries Official Photo Session', category: 'Inauguration' },
  { id: 73, src: '/we/DSC02307.webp', title: 'Heavy Duty Industrial Slurry Pumps', category: 'Exhibition Floor' },
  { id: 74, src: '/we/DSC02316.webp', title: 'Consultant & EPC Engineering Roundtable', category: 'B2B Meetings' },
  { id: 75, src: '/we/DSC02345.webp', title: 'Precision Metering Pump Demo', category: 'Live Demos' },
  { id: 76, src: '/we/DSC02348.webp', title: 'Keynote Speaker Presentation', category: 'Inauguration' },
  { id: 77, src: '/we/DSC02350.webp', title: 'Cryogenic Valve Display', category: 'Exhibition Floor' },
  { id: 78, src: '/we/DSC02356.webp', title: 'Water Desalination Pump Systems', category: 'Exhibition Floor' },
  { id: 79, src: '/we/DSC02384.webp', title: 'Global Exporters B2B Lounge', category: 'B2B Meetings' },
  { id: 80, src: '/we/DSC02396.webp', title: 'Valves & Actuators Association Stall', category: 'Exhibition Floor' },
  { id: 81, src: '/we/DSC02398.webp', title: 'Closing Ceremony & Exhibitor Felicitation', category: 'Inauguration' }
].map(img => ({
  ...img,
  src: getMediaUrl(img.src)
}));

export const PastExhibitionGallery: React.FC<PastExhibitionGalleryProps> = ({
  onOpenModal,
  className = ""
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Exhibition Floor', 'Inauguration', 'B2B Meetings', 'Live Demos'];

  const filteredImages = selectedCategory === 'All' 
    ? PAST_GALLERY_IMAGES 
    : PAST_GALLERY_IMAGES.filter(img => img.category === selectedCategory);

  const handlePrevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + PAST_GALLERY_IMAGES.length) % PAST_GALLERY_IMAGES.length);
    }
  };

  const handleNextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % PAST_GALLERY_IMAGES.length);
    }
  };

  return (
    <section className={`py-8 sm:py-10 bg-[#F4F7FE] text-slate-900 ${className}`}>
      
      {/* Outer Editorial Container */}
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto">
        
        <div className="bg-white rounded-3xl sm:rounded-[32px] p-5 sm:p-7 lg:p-8 border border-slate-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            {/* ========================================================
                LEFT COLUMN: EDITORIAL TYPOGRAPHY & OVERVIEW
                ======================================================== */}
            <div className="lg:col-span-4 space-y-4 lg:pr-4 flex flex-col justify-between h-full text-left">
              
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111183]/10 text-[#111183] text-xs font-bold uppercase tracking-wider">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Exhibition Showcase</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                  Exhibition <br />
                  <span className="text-[#0e89d0] font-bold">Glimpses</span>
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pt-1">
                  <p>
                    Experience genuine photographs from IPVS editions featuring global leaders including <strong>ANDRITZ, Grundfos, Wilo, Sant Valves</strong>, and 100+ industrial exhibitors alongside 7,000+ trade buyers.
                  </p>
                  <p>
                    From high-volume pump test rigs and smart control valves to high-level B2B networking and dignitaries' addresses at HITEX Hyderabad.
                  </p>
                </div>
              </div>

              {/* View Full Gallery CTA Button */}
              <div className="pt-2 lg:pt-4 space-y-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#111183] to-[#0e89d0] hover:from-[#0d0d6c] hover:to-[#0c74b1] text-white font-extrabold text-xs transition-all shadow-lg hover:shadow-blue-900/30 flex items-center justify-between sm:justify-start space-x-4 group uppercase tracking-wider"
                >
                  <span>Explore Full Gallery ({PAST_GALLERY_IMAGES.length}+ Photos)</span>
                  <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-slate-400 font-medium">
                  Click on any photo to inspect high-resolution full screen.
                </p>
              </div>

            </div>

            {/* ========================================================
                RIGHT COLUMN: ASYMMETRIC BENTO GRID (FEATURING FINALLE IMAGES)
                ======================================================== */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              
              {/* --- COLUMN 1: Featuring ANDRITZ & GRUNDFOS (finalle 5 & 1) --- */}
              <div className="flex flex-col gap-3.5 sm:gap-4">
                
                {/* 1. ANDRITZ Illuminated Grand Stall (finalle 5) */}
                <div 
                  onClick={() => setLightboxIndex(0)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/11] cursor-pointer shadow-sm border-0 hover:shadow-md"
                >
                  <img 
                    src={PAST_GALLERY_IMAGES[0].src} 
                    alt={PAST_GALLERY_IMAGES[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-left">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">ANDRITZ</span>
                    <p className="text-xs font-semibold text-white truncate">{PAST_GALLERY_IMAGES[0].title}</p>
                  </div>
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[10px] font-bold backdrop-blur-md">
                    Featured
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2. Grundfos Industrial Pumps & Game Zone Stall (finalle 1) */}
                <div 
                  onClick={() => setLightboxIndex(1)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/11] cursor-pointer shadow-sm border-0 hover:shadow-md"
                >
                  <img 
                    src={PAST_GALLERY_IMAGES[1].src} 
                    alt={PAST_GALLERY_IMAGES[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-left">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">GRUNDFOS</span>
                    <p className="text-xs font-semibold text-white truncate">{PAST_GALLERY_IMAGES[1].title}</p>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>

              {/* --- COLUMN 2: Featuring WILO & SANT VALVES (finalle 3, 4, 2) --- */}
              <div className="flex flex-col gap-3.5 sm:gap-4">
                
                {/* 3. Wilo Multistage Pumps & High Traffic Stalls (finalle 3) */}
                <div 
                  onClick={() => setLightboxIndex(2)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/11] cursor-pointer shadow-sm border-0 hover:shadow-md"
                >
                  <img 
                    src={PAST_GALLERY_IMAGES[2].src} 
                    alt={PAST_GALLERY_IMAGES[2].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-left">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">WILO</span>
                    <p className="text-xs font-semibold text-white truncate">{PAST_GALLERY_IMAGES[2].title}</p>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 4 & 5: Two Side-by-Side Cards (Sant Valves demo & Wilo VIP desk) */}
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Sant Valves & Heavy Machinery (finalle 4) */}
                  <div 
                    onClick={() => setLightboxIndex(3)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-square cursor-pointer shadow-sm border-0 hover:shadow-md"
                  >
                    <img 
                      src={PAST_GALLERY_IMAGES[3].src} 
                      alt={PAST_GALLERY_IMAGES[3].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-left">
                      <p className="text-[10px] font-bold text-white truncate">Sant Valves</p>
                    </div>
                  </div>

                  {/* Wilo VIP Customer Desk (finalle 2) */}
                  <div 
                    onClick={() => setLightboxIndex(4)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-square cursor-pointer shadow-sm border-0 hover:shadow-md"
                  >
                    <img 
                      src={PAST_GALLERY_IMAGES[4].src} 
                      alt={PAST_GALLERY_IMAGES[4].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-left">
                      <p className="text-[10px] font-bold text-white truncate">Wilo B2B Desk</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* --- COLUMN 3: Inauguration, Conference & Expo Highlights (webkeep 0, 7, 1, 3) --- */}
              <div className="flex flex-col gap-3.5 sm:gap-4">
                
                {/* 6. Grand Inauguration (webkeep.webp) */}
                <div 
                  onClick={() => setLightboxIndex(5)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/11] cursor-pointer shadow-sm border-0 hover:shadow-md"
                >
                  <img 
                    src={PAST_GALLERY_IMAGES[5].src} 
                    alt={PAST_GALLERY_IMAGES[5].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-left">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Inauguration</span>
                    <p className="text-xs font-semibold text-white truncate">{PAST_GALLERY_IMAGES[5].title}</p>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 7 & 8: Two Side-by-Side Cards (Pumps Showcase & B2B Meetings) */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div 
                    onClick={() => setLightboxIndex(6)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-square cursor-pointer shadow-sm border-0 hover:shadow-md"
                  >
                    <img 
                      src={PAST_GALLERY_IMAGES[6].src} 
                      alt={PAST_GALLERY_IMAGES[6].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-left">
                      <p className="text-[10px] font-bold text-white truncate">Exhibition Floor</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setLightboxIndex(7)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-square cursor-pointer shadow-sm border-0 hover:shadow-md"
                  >
                    <img 
                      src={PAST_GALLERY_IMAGES[7].src} 
                      alt={PAST_GALLERY_IMAGES[7].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-left">
                      <p className="text-[10px] font-bold text-white truncate">B2B Deals</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          FULL EXHIBITION GALLERY MODAL (80+ PHOTOS GRID VIEW)
          ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-left relative border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0e89d0]">
                  IPVS Event Photographs
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  Exhibition Photo Gallery
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    onOpenModal && onOpenModal('visitor');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#111183] to-[#0e89d0] hover:from-[#0d0d6c] hover:to-[#0c74b1] transition-all flex items-center shadow-md"
                >
                  <Ticket className="w-3.5 h-3.5 mr-1.5" />
                  Visitor Registration
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-6 py-3 border-b border-slate-100 bg-white flex items-center space-x-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-400 mr-2 uppercase shrink-0">Filter:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[#111183] text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat} {cat === 'All' ? `(${PAST_GALLERY_IMAGES.length})` : ''}
                </button>
              ))}
            </div>

            {/* Modal Body: Scrollable Grid of All Images */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredImages.map((img) => {
                const originalIndex = PAST_GALLERY_IMAGES.findIndex(item => item.id === img.id);
                return (
                  <div
                    key={img.id}
                    onClick={() => setLightboxIndex(originalIndex)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm aspect-[4/3] border border-slate-200/80"
                  >
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-left">
                      <p className="text-[11px] font-bold text-white leading-tight line-clamp-2">{img.title}</p>
                      <span className="text-[10px] text-cyan-300 font-medium">{img.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer Strip */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>High-resolution photographs from IPVS past exhibitions at HITEX Hyderabad.</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          FULLSCREEN LIGHTBOX VIEWER FOR INDIVIDUAL PHOTOS
          ======================================================== */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 animate-in fade-in duration-200">
          
          {/* Lightbox Top Control Bar */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4 max-w-7xl mx-auto w-full">
            <div className="space-y-0.5 text-left">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Photo {lightboxIndex + 1} of {PAST_GALLERY_IMAGES.length}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white font-heading">
                {PAST_GALLERY_IMAGES[lightboxIndex].title}
              </h4>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Center Image View */}
          <div className="relative flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full">
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-all shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-h-[75vh] max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <img 
                src={PAST_GALLERY_IMAGES[lightboxIndex].src} 
                alt={PAST_GALLERY_IMAGES[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto" 
              />
            </div>

            <button
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 transition-all shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Control Bar */}
          <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-3 flex items-center justify-between text-xs text-slate-400">
            <span>{PAST_GALLERY_IMAGES[lightboxIndex].category}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPhoto}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium"
              >
                Previous
              </button>
              <button
                onClick={handleNextPhoto}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
