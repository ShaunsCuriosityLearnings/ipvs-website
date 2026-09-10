import React from 'react';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { EVENT_DETAILS } from '../data/ipvsData';
import { SEO } from '../components/common/SEO';
import { 
  Users, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Ticket, 
  Building2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Award, 
  Check, 
  Compass, 
  ChevronRight,
  FileText,
  Zap,
  Globe,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Sliders
} from 'lucide-react';

interface VisitorPageProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const VisitorPage: React.FC<VisitorPageProps> = ({ onOpenModal }) => {
  // Visitor Profile Group 1: Industrial Pumps, Valves & Systems (Manufacturers)
  const pumpValveMfg = [
    "Beverages and Mineral Water",
    "Dairies",
    "Dyes and dyestuffs",
    "Fertilizers",
    "Fisheries and Aqua-culture",
    "Food Products",
    "Health and Hygiene Products",
    "Insecticides and Pesticides",
    "Nuclear Power",
    "Water supply and Sanitation",
    "Paints and Varnishes",
    "Petroleum – Refineries",
    "Pharmaceuticals",
    "Petrochemicals",
    "Cosmetics"
  ];

  // Visitor Profile Group 2: Industrial Pumps, Valves & Systems (Operators, Consultants & Distributors)
  const pumpValveOps = [
    "Cooling Water Circulation",
    "Metal Refining and Oretransport",
    "Mine – dewatering",
    "Natural and Synthetic textile",
    "Pumped storage Power Generation",
    "Oil & Gas- exploration",
    "Nuclear Power Generation",
    "Water and Waste Water",
    "Non – Conventional Energy Resources",
    "Project Consultants",
    "Importers, Agents and Distributors"
  ];

  // Visitor Profile Group 3: Industrial Chemical Process Equipment
  const chemicalProcessMfg = [
    "Paints, Coatings and Inks",
    "Chemicals, Fine Chemicals",
    "Organic, Inorganic Chemicals",
    "Speciality Chemicals",
    "Pharmaceuticals",
    "Plastics",
    "Agrochemicals",
    "Dyes, Pigments and Textile",
    "Home and Personal Care",
    "Research and Development"
  ];

  return (
    <div className="pt-20 pb-16 bg-[#F8FAFC] text-slate-800 min-h-screen">
      <SEO 
        title="Visitor Registration & Free Pass | IPVS 2026 Hyderabad"
        description="Register for your free visitor badge at IPVS 2026. Explore live machinery demos, attend high-level technical conferences, and network with 100+ global manufacturers at HITEX Hyderabad."
        canonical="https://ipvs.in/visitor"
      />
      
      {/* ==========================================
          SECTION 1: CREATIVE ULTRA-MODERN HERO SECTION
          ========================================== */}
      <section className="relative bg-gradient-to-br from-[#061229] via-[#0B2252] to-[#1E65FF] text-white pt-28 sm:pt-32 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8 overflow-hidden mb-10 shadow-2xl">
        
        {/* Creative Ambient Spheres & Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#00D2FF]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#1E65FF]/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Creative Pill Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#00D2FF] text-xs font-extrabold tracking-widest uppercase backdrop-blur-xl shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse"></span>
                <span>FREE VISITOR REGISTRATION • IPVS 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-tight text-white drop-shadow-lg">
                Stay Ahead of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-white to-blue-200">Competition</span>
              </h1>

              {/* Description Paragraph */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-medium max-w-2xl">
                Visit IPVS Expo to Discover Cutting-Edge Solutions, Improve Operational Efficiency, and Boost Productivity.
              </p>

              {/* Focus Sectors Highlight Banner */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl text-xs text-slate-200 space-y-1.5 shadow-xl">
                <div className="flex items-center space-x-2 text-[#00D2FF] font-extrabold uppercase tracking-wider text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF]"></span>
                  <span>Ethanol, Pharma & Water Sectors</span>
                </div>
                <p className="text-slate-100 font-medium leading-relaxed">
                  We are mainly focused towards: Pumps, Valves | Oil & Gas | Pharma | Water | Chemicals | Power | Steel | Food | Cement | EPC | OEM
                </p>
              </div>

              {/* 2 Feature Highlight Bento Cards */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/15 hover:border-[#00D2FF]/50 transition-all duration-300 space-y-2 group shadow-xl">
                  <div className="flex items-center space-x-2.5 text-[#00D2FF]">
                    <div className="w-8 h-8 rounded-lg bg-[#00D2FF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4 text-[#00D2FF]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-white">Where Industry Leaders Gather</h3>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Enhance your professional network and stay updated on industry trends.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/15 hover:border-[#00D2FF]/50 transition-all duration-300 space-y-2 group shadow-xl">
                  <div className="flex items-center space-x-2.5 text-[#00D2FF]">
                    <div className="w-8 h-8 rounded-lg bg-[#00D2FF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Award className="w-4 h-4 text-[#00D2FF]" />
                    </div>
                    <h3 className="text-sm font-extrabold text-white">Learn 'What's New' and 'What's Next'</h3>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Stay ahead of the competitors by learning whats new.
                  </p>
                </div>
              </div>

              {/* Action Button Hub - Single row on mobile */}
              <div className="flex flex-row items-center gap-2.5 sm:gap-4 pt-4 w-full">
                <button 
                  onClick={() => onOpenModal('visitor')}
                  className="flex-1 sm:flex-initial px-3 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#1E65FF] hover:bg-[#0D47A1] text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-2xl flex items-center justify-center text-center whitespace-nowrap space-x-1.5 border border-white/30 hover:scale-[1.02]"
                >
                  <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Visitor Pass</span>
                </button>

                <a 
                  href="#visitors-profile"
                  className="flex-1 sm:flex-initial px-3 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#1E65FF] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-xl backdrop-blur-md flex items-center justify-center text-center whitespace-nowrap space-x-1.5 border border-white/30 hover:scale-[1.02]"
                >
                  <span>Visitors Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>

            </div>

            {/* Right Column: Creative Dynamic Dual-Image Frame */}
            <div className="lg:col-span-5 relative pt-6 lg:pt-0">
              
              {/* Outer Decorative Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00D2FF]/30 to-[#1E65FF]/30 rounded-3xl blur-2xl opacity-50"></div>

              <div className="grid grid-cols-1 gap-6 relative z-10">
                
                {/* Showcase Image Card 1 */}
                <div className="relative h-60 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group transform -rotate-1 hover:rotate-0 transition-all duration-500">
                  <img 
                    src="/images/WhatsApp-Image-2024-10-17-at-4.59.33-PM-3.webp" 
                    alt="Industrial Pumps & Systems" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=70";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-slate-200 text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>+7000 visitors</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white bg-[#1E65FF] px-3.5 py-1.5 rounded-full shadow-lg border border-white/20">
                      Pumps & Fluid Systems
                    </span>
                  </div>
                </div>

                {/* Showcase Image Card 2 (Staggered Overlap) */}
                <div className="relative h-60 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group transform rotate-1 hover:rotate-0 transition-all duration-500 -mt-8 sm:-mt-10 ml-4 sm:ml-8">
                  <img 
                    src="/images/WhatsApp-Image-2024-10-17-at-4.59.37-PM.webp" 
                    alt="Valve Automation & Process Equipment" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=70";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-slate-200 text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00D2FF]"></span>
                    <span>100+ Exhibitors</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white bg-emerald-600 px-3.5 py-1.5 rounded-full shadow-lg border border-white/20">
                      Valve Automation & Systems
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Main Page Body Container */}
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-10 sm:space-y-12">

        {/* ==========================================
            SECTION 2: WHY VISIT? (INDUSTRIAL PUMPS, VALVES & SYSTEM)
            ========================================== */}
        <section className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-extrabold uppercase tracking-widest inline-block border border-[#1E65FF]/20">
              Industrial Pumps, Valves & System
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
              Why Visit?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Discover unparalleled opportunities to evaluate cutting-edge fluid handling equipment and scale your manufacturing efficiency.
            </p>
          </div>

          {/* 3 Benefit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Pillar 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading mb-4">
                  Stay Ahead in the Industry
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Discover latest technologies, products, and services.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Learn from industry experts.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Network with peers, thought leaders, and potential partners.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[#1E65FF] flex items-center">
                  Industry Innovation Track <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading mb-4">
                  Source Products and Solutions
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Explore exhibits from leading industrial pumps, valves, systems, and chemical processing equipment industries.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Compare products, services, and solutions side-by-side.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Meet suppliers and manufacturers directly.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[#1E65FF] flex items-center">
                  Direct Procurement Sourcing <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading mb-4">
                  Unparalleled Networking Opportunities
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Connect with industry professionals.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Schedule meetings with potential clients/partners.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#1E65FF] mr-2.5 shrink-0 mt-0.5" />
                    <span>Establish nationwide B2B supply chain channels.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[#1E65FF] flex items-center">
                  Structured Matchmaking <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* ==========================================
            SECTION 3: VISITOR'S PROFILE
            ========================================== */}
        <section id="visitors-profile" className="scroll-mt-32 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-extrabold uppercase tracking-widest inline-block border border-[#1E65FF]/20">
              Target Buyer Categories
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
              Visitor's Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              IPVS Expo attracts decision-makers, plant engineers, EPC consultants, and procurement heads across key sectors.
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Category A: Industrial Pumps, Valves & System */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-left">
              
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <span className="px-3.5 py-1 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-bold uppercase">
                    Category A
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-2">
                    Visitor's Profile: Industrial Pumps, Valves & System
                  </h3>
                </div>
                <Building2 className="w-8 h-8 text-[#1E65FF]/30 hidden sm:block" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Group 1: Manufacturers Of */}
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-[#1E65FF] uppercase tracking-wider flex items-center">
                    <Check className="w-4 h-4 mr-2 text-[#1E65FF]" />
                    MANUFACTURERS OF:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                    {pumpValveMfg.map((item, idx) => (
                      <div key={idx} className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#1E65FF]/30 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#1E65FF] mr-2.5 shrink-0"></span>
                        <span className="font-medium text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Group 2: Operators, Consultants & Distributors */}
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-[#1E65FF] uppercase tracking-wider flex items-center">
                    <Check className="w-4 h-4 mr-2 text-[#1E65FF]" />
                    OPERATORS, CONSULTANTS & DISTRIBUTORS:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                    {pumpValveOps.map((item, idx) => (
                      <div key={idx} className="flex items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#1E65FF]/30 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#1E65FF] mr-2.5 shrink-0"></span>
                        <span className="font-medium text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Category B: Industrial Chemical Process Equipment */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-8 text-left">
              
              <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase border border-emerald-500/30">
                    Category B (Process & Equipment)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading mt-2">
                    Visitor's Profile: Industrial Chemical Process Equipment
                  </h3>
                </div>
                <Cpu className="w-8 h-8 text-emerald-400/30 hidden sm:block" />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wider flex items-center">
                  <Check className="w-4 h-4 mr-2 text-emerald-400" />
                  MANUFACTURERS OF:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs text-slate-200">
                  {chemicalProcessMfg.map((item, idx) => (
                    <div key={idx} className="flex items-center p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2.5 shrink-0"></span>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ==========================================
            SECTION 4: VISITOR REGISTRATION FORM
            ========================================== */}
        <section className="scroll-mt-32">
          <InlineRegistrationForm 
            title="Visitor Registration"
            subtitle="Pre-register now to receive fast-track entry badge"
            defaultCategory="visitor"
          />
        </section>

        {/* ==========================================
            SECTION 5: EXCLUSIVE VISITOR ADVANTAGES (SEO BOOST SECTION)
            ========================================== */}
        <section className="space-y-8 text-center">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-extrabold uppercase tracking-widest inline-block border border-[#1E65FF]/20">
              VISITOR ADVANTAGES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Exclusive Expo Visitor Perks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Complimentary features engineered to maximize your ROI during your visit to HITEX Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center font-bold">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Fast-Track Entry Pass</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-register online to receive instant digital QR badge pass and bypass main registration queues.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Full Exhibition Access</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Single registration grants free pass to complete exhibition halls, open technical demos, and live showcase arenas.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Live Machinery Demos</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Observe live operational testing of slurry pumps, smart actuators, and IIoT telemetry sensors.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1E65FF]/10 text-[#1E65FF] flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Free Event Directory PDF</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access official exhibitor contact details, stall map directories, and product catalogues.
              </p>
            </div>

          </div>

        </section>

        {/* Real Past Exhibition Gallery (5-Card Row + Full Lightbox Modal) */}
        <PastExhibitionGallery onOpenModal={onOpenModal} />

        {/* ==========================================
            SECTION 6: VISITOR LOGISTICS, DATES & VENUE (SEO BOOST SECTION)
            ========================================== */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-left">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-slate-200 pb-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1E65FF]">EXPO LOCATION & DATES</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                Visitor Planning & Logistics Guide
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Plan your travel to HITEX Exhibition Center Hyderabad for December 03 - 04, 2026.
              </p>
            </div>

            <button 
              onClick={() => onOpenModal('visitor')}
              className="px-8 py-3.5 rounded-xl bg-[#1E65FF] hover:bg-[#0D47A1] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center shrink-0"
            >
              <span>Get Free Pass Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
            
            <div className="p-5 rounded-2xl bg-[#F4F7FE] border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-[#1E65FF] font-bold">
                <Calendar className="w-4 h-4" />
                <span>Exhibition Dates & Timings</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm">{EVENT_DETAILS.dates}</p>
              <p className="text-slate-500">10:00 AM – 6:00 PM IST (Daily)</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F7FE] border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-[#1E65FF] font-bold">
                <MapPin className="w-4 h-4" />
                <span>Venue Address</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm">HITEX Exhibition Center</p>
              <p className="text-slate-500">Izzat Nagar, Hyderabad – 500 084, Telangana, India</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F7FE] border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-[#1E65FF] font-bold">
                <Compass className="w-4 h-4" />
                <span>Travel & Transport</span>
              </div>
              <p className="font-extrabold text-slate-900 text-sm">Convenient Access</p>
              <p className="text-slate-500">10 mins from Hitec City Metro • 40 mins from RGIA Airport</p>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
};
