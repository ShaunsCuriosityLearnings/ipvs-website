import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ESTEEMED_EXHIBITORS, FAQS } from '../data/ipvsData';
import { InlineRegistrationForm } from '../components/common/InlineRegistrationForm';
import { FloorPlanViewer } from '../components/exhibitors/FloorPlanViewer';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { submitLead, HEARD_ABOUT_OPTIONS } from '../services/leadService';
import { SEO } from '../components/common/SEO';
import { getMediaUrl } from '../utils/media';
import { 
  Building2, 
  Users, 
  Award, 
  CheckCircle2, 
  Loader2,
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Layers, 
  Cpu, 
  Zap, 
  ChevronDown, 
  Download, 
  Check, 
  Globe, 
  HelpCircle,
  ShieldCheck,
  Send,
  Factory,
  Flame,
  Droplets,
  FlaskConical,
  Wheat,
  Anchor,
  Atom,
  Sliders,
  Sparkles,
  TrendingUp,
  Target,
  BarChart3
} from 'lucide-react';

interface ExhibitorPageProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const ExhibitorPage: React.FC<ExhibitorPageProps> = ({ onOpenModal }) => {
  const navigate = useNavigate();

  // State for Floor Plan Modal
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);

  // State for Exhibitor Hero Form
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroFormData, setHeroFormData] = useState({
    stallSize: '18 SQM',
    firstName: '',
    lastName: '',
    company: '',
    mobile: '',
    email: '',
    city: '',
    website: '',
    heardFrom: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroFormData.firstName || !heroFormData.lastName || !heroFormData.email || !heroFormData.mobile || !heroFormData.company) return;

    setIsSubmitting(true);
    await submitLead({
      formType: 'exhibitor',
      source: 'Exhibitor Page Hero Form',
      firstName: heroFormData.firstName,
      lastName: heroFormData.lastName,
      company: heroFormData.company,
      mobile: heroFormData.mobile,
      email: heroFormData.email,
      city: heroFormData.city,
      website: heroFormData.website,
      stallSize: heroFormData.stallSize,
      heardFrom: heroFormData.heardFrom || undefined
    });
    setIsSubmitting(false);
    setHeroSubmitted(true);
  };

  // State for FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const exhibitorFaqs = FAQS.filter(f => f.category === 'Exhibitors' || f.category === 'General');

  // Industries Served Dataset
  const industriesServed = [
    { name: "Pumps & Valves", icon: Sliders, color: "text-[#00D2FF]", bg: "bg-[#00D2FF]/10" },
    { name: "Ethanol", icon: Flame, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "Pharma", icon: FlaskConical, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "Water", icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { name: "Oil & Gas", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Chemicals", icon: FlaskConical, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Power", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Steel", icon: Factory, color: "text-slate-400", bg: "bg-slate-500/10" },
    { name: "Food", icon: Wheat, color: "text-lime-500", bg: "bg-lime-500/10" },
    { name: "Cement", icon: Layers, color: "text-stone-400", bg: "bg-stone-500/10" },
    { name: "EPC", icon: Building2, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { name: "OEM", icon: Cpu, color: "text-teal-400", bg: "bg-teal-500/10" }
  ];

  return (
    <div className="pt-16 pb-12 bg-[#F4F7FE] text-slate-800 min-h-screen">
      <SEO 
        title="Book Your Stall & Exhibit | IPVS 2026 Hyderabad"
        description="Exhibit at IPVS 2026. Showcase your pumps, valves, and industrial automation solutions to 5,000+ targeted procurement heads, EPC contractors, and plant engineers."
        canonical="https://ipvs.in/exhibitor"
      />
      
      {/* ==========================================
          SECTION 1: HERO SECTION
          ========================================== */}
      <section className="relative bg-gradient-to-br from-[#0A192F] via-[#0D327B] to-[#1E65FF] text-white pt-24 sm:pt-28 pb-10 sm:pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden mb-8">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E65FF]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Form on the Left Side */}
          <div className="lg:col-span-5 bg-[#EDF2F7] text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-300 text-left">
            <div className="space-y-1 mb-4 text-center sm:text-left">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-[11px] font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Exhibition Stall Booking</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                Exhibitor Registration
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Reserve your stall & connect with +7000 industrial buyers
              </p>
            </div>

            {heroSubmitted ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-heading">Stall Request Received!</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{heroFormData.firstName} {heroFormData.lastName}</strong> from <strong>{heroFormData.company}</strong>. Orbit Exhibitions will contact you at <strong>{heroFormData.email}</strong> and <strong>{heroFormData.mobile}</strong> with floor plan availability for <strong>{heroFormData.stallSize}</strong>.
                </p>
                <button
                  onClick={() => {
                    setHeroSubmitted(false);
                    setHeroFormData({
                      stallSize: '18 SQM',
                      firstName: '',
                      lastName: '',
                      company: '',
                      mobile: '',
                      email: '',
                      city: '',
                      website: '',
                      heardFrom: ''
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1E65FF] text-white font-bold text-xs hover:bg-[#0D47A1] transition-colors shadow-sm"
                >
                  Book Another Stall
                </button>
              </div>
            ) : (
              <form onSubmit={handleHeroSubmit} className="space-y-3">
                
                {/* 1. Required Stall Area (SQM) * */}
                <div className="p-3 rounded-xl bg-white border border-slate-300/80 space-y-1.5 shadow-sm">
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-900 font-heading">
                    Required Stall Area (SQM) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {['9 SQM', '12 SQM', '18 SQM', '36 SQM', '54 SQM', '72+ SQM'].map((sqm) => (
                      <button
                        key={sqm}
                        type="button"
                        onClick={() => setHeroFormData({ ...heroFormData, stallSize: sqm })}
                        className={`py-1.5 px-1 text-center rounded-lg text-xs font-extrabold transition-all border ${
                          heroFormData.stallSize === sqm
                            ? 'bg-[#1E65FF] text-white border-[#1E65FF] shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {sqm}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2 & 3. First Name * & Last Name * */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={heroFormData.firstName}
                      onChange={(e) => setHeroFormData({ ...heroFormData, firstName: e.target.value })}
                      placeholder="e.g. Rajesh" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={heroFormData.lastName}
                      onChange={(e) => setHeroFormData({ ...heroFormData, lastName: e.target.value })}
                      placeholder="e.g. Kumar" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]" 
                    />
                  </div>
                </div>

                {/* 4. Company Name * */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={heroFormData.company}
                    onChange={(e) => setHeroFormData({ ...heroFormData, company: e.target.value })}
                    placeholder="Company Name" 
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]" 
                  />
                </div>

                {/* 5 & 6. Mobile Number * & Official Work Email * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={heroFormData.mobile}
                      onChange={(e) => setHeroFormData({ ...heroFormData, mobile: e.target.value })}
                      placeholder="+91 98765 43210" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Official Work Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={heroFormData.email}
                      onChange={(e) => setHeroFormData({ ...heroFormData, email: e.target.value })}
                      placeholder="name@company.com" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]" 
                    />
                  </div>
                </div>

                {/* 7 & 8. City * & Company Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={heroFormData.city}
                      onChange={(e) => setHeroFormData({ ...heroFormData, city: e.target.value })}
                      placeholder="e.g. Hyderabad / Mumbai" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Company Website
                    </label>
                    <input 
                      type="text" 
                      value={heroFormData.website}
                      onChange={(e) => setHeroFormData({ ...heroFormData, website: e.target.value })}
                      placeholder="www.company.com" 
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]" 
                    />
                  </div>
                </div>

                {/* 9. Where did you hear about us? */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                    Where did you hear about us? <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={heroFormData.heardFrom}
                    onChange={(e) => setHeroFormData({ ...heroFormData, heardFrom: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  >
                    <option value="">Select how you heard about us</option>
                    {HEARD_ABOUT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 sm:py-3.5 rounded-xl bg-[#1E65FF] hover:bg-[#0D47A1] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request to Orbit Exhibitions...</span>
                      </>
                    ) : (
                      <>
                        <Building2 className="w-4 h-4" />
                        <span>Submit Exhibitor Stall Request</span>
                        <Send className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-[10px] text-slate-500 pt-0.5 flex items-center justify-center space-x-2">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Orbit Exhibitions Pvt. Ltd. • HITEX Hyderabad</span>
                </div>
              </form>
            )}
          </div>

          {/* Hero Content on the Right Side */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase">
              <Building2 className="w-4 h-4 text-[#00D2FF]" />
              <span>IPVS 2026 EXHIBITION PLATFORM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-tight">
              Powering the Future of Process Industry, Pumps & Valve Automation
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
              The ultimate exhibition platform for manufacturers of industrial pumps, valve automation, process control equipment, and Industrial IoT solutions to generate high-value leads, expand market presence, and build nationwide distribution networks.
            </p>

            {/* Action Buttons - Single row on mobile */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-4 pt-4 w-full">
              
              <a 
                href="#about-exhibition"
                className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl bg-white text-[#1E65FF] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center text-center whitespace-nowrap space-x-1.5"
              >
                <span>About Exhibition</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button 
                onClick={() => setShowFloorPlanModal(true)}
                className="flex-1 sm:flex-initial px-3 sm:px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center justify-center text-center whitespace-nowrap space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>Floor Plans</span>
              </button>

            </div>

            {/* Key Quick Stats */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-heading">100+</span>
                <span className="text-xs text-slate-300 block">Exhibitors</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-heading">+7000</span>
                <span className="text-xs text-slate-300 block">Visitors</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-heading">15,000</span>
                <span className="text-xs text-slate-300 block">SQM Expo Area</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-8 sm:space-y-10">

        {/* ==========================================
            SECTION 2: EXHIBITOR OPPORTUNITIES
            ========================================== */}
        <section id="about-exhibition" className="scroll-mt-32 space-y-6 sm:space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="px-3.5 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-extrabold uppercase tracking-widest inline-block">
              EXHIBITOR OPPORTUNITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
              Connect, Showcase & Scale Your Industrial Reach
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Discover the power of exhibiting at IPVS 2026 — India’s premier exhibition where global technology leaders, OEMs, plant heads, and EPC decision-makers converge.
            </p>
          </div>

          {/* 2 Feature Cards with Real Visual Storytelling: Borderless Soft Elevation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-left">
            
            {/* Card 1: Unlock Endless B2B Enquiries */}
            <div className="bg-white rounded-2xl border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-950">
                  <img 
                    src={getMediaUrl('/newcardimages/Connect With the People Who Drive Industry.jfif')} 
                    alt="Targeted Industrial Buyers Networking at IPVS" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-extrabold shadow-sm flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-[#1E65FF]" />
                      <span>Targeted Industrial Buyers</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold">
                      Verified B2B
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block mb-0.5">
                      High-Value Sourcing Delegation
                    </span>
                    <p className="text-white font-extrabold text-base sm:text-lg font-heading leading-tight drop-shadow-sm">
                      7,000+ Industrial Buyers & Plant Heads
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                    Unlock Endless B2B Enquiries
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Collaborate with qualified buyers & discover high-value market leads. Engage face-to-face with decision-makers actively sourcing pump systems, valve positioners, actuators, and plant automation.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Plant Heads', 'Procurement Chiefs', 'EPC Contractors', 'OEM Engineers', 'Project Consultants'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold flex items-center space-x-1">
                        <Check className="w-3 h-3 text-[#1E65FF]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E65FF] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Targeted Industrial Buyers</span>
                </span>
                <button 
                  onClick={() => onOpenModal('exhibitor')}
                  className="text-xs font-extrabold text-slate-900 hover:text-[#1E65FF] flex items-center space-x-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Book Stall Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: The Premier Industry Benchmark */}
            <div className="bg-white rounded-2xl border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-950">
                  <img 
                    src={getMediaUrl('/newcardimages/mainimage2.jfif')} 
                    alt="Flagship B2B Platform IPVS" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-extrabold shadow-sm flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-[#1E65FF]" />
                      <span>Flagship B2B Platform</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                      HITEX Hyderabad
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block mb-0.5">
                      India's 2026 Milestone Expo
                    </span>
                    <p className="text-white font-extrabold text-base sm:text-lg font-heading leading-tight drop-shadow-sm">
                      100+ Leading Exhibitors & Industry Benchmarks
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                    The Premier Industry Benchmark
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Exhibit at India’s flagship industrial technology event of 2026. Establish your brand authority alongside leading global engineering manufacturers and process technology pioneers.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Brand Authority', 'Hall 1-3 Pavilions', 'Global OEM Presence', 'Media Showcase', 'Live Product Launches'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold flex items-center space-x-1">
                        <Check className="w-3 h-3 text-[#1E65FF]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E65FF] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Flagship B2B Platform</span>
                </span>
                <a 
                  href="#stall-layout"
                  className="text-xs font-extrabold text-slate-900 hover:text-[#1E65FF] flex items-center space-x-1 group-hover:translate-x-1 transition-all"
                >
                  <span>View Floor Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
            <a 
              href="#exhibitor-profile"
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1E65FF] transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>Exhibitors Profile →</span>
            </a>

            <button 
              onClick={() => onOpenModal('exhibitor')}
              className="px-5 py-3 rounded-xl bg-[#1E65FF] hover:bg-[#0D47A1] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center space-x-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Register as Exhibitor</span>
            </button>
          </div>

        </section>

        {/* ==========================================
            SECTION 3: EXHIBITOR BENEFITS
            ========================================== */}
        <section className="space-y-6 sm:space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="px-3.5 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-extrabold uppercase tracking-widest inline-block">
              EXHIBITOR BENEFITS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
              Why Industry Leaders Choose IPVS 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              5 strategic growth advantages engineered specifically for pump, valve, and process automation manufacturers.
            </p>
          </div>

          {/* Visual Bento Showcase of 5 Benefit Cards: Borderless Soft Elevation */}
          <div className="space-y-5 sm:space-y-6 text-left">
            
            {/* Top Row: 2 Spotlight Benefit Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Benefit 01: Connect with Industry Leaders */}
              <div className="bg-white rounded-2xl border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group">
                <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden bg-slate-900 shrink-0">
                  <img 
                    src={getMediaUrl('/newcardimages/Connect With the People Who Drive Industry.jfif')} 
                    alt="Connect with Industry Leaders"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/80 to-transparent" />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#1E65FF] text-white text-xs font-black tracking-wider shadow-sm">
                      01
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block">
                      Networking & Buyers
                    </span>
                    <span className="text-white font-extrabold text-xs sm:text-sm">
                      Plant Heads & EPCs
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3 flex flex-col justify-between grow">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading group-hover:text-[#1E65FF] transition-colors">
                      1. Connect with Industry Leaders
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Build valuable relationships with plant heads, procurement managers, EPC contractors, OEMs, consultants, distributors, and decision-makers from India’s leading process industries.
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-900 block">Key Benefits:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      <li className="flex items-center">
                        <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                        <span>Network with qualified industrial buyers</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                        <span>Meet EPC companies and OEMs</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                        <span>Build long-term business partnerships</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Benefit 02: Showcase Your Innovation */}
              <div className="bg-white rounded-2xl border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group">
                <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden bg-slate-900 shrink-0">
                  <img 
                    src={getMediaUrl('/newcardimages/See Technology in Action.jfif')} 
                    alt="Showcase Your Innovation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/80 to-transparent" />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#1E65FF] text-white text-xs font-black tracking-wider shadow-sm">
                      02
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block">
                      Live Demonstrations
                    </span>
                    <span className="text-white font-extrabold text-xs sm:text-sm">
                      Live Flow Machinery
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3 flex flex-col justify-between grow">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading group-hover:text-[#1E65FF] transition-colors">
                      2. Showcase Your Innovation
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Demonstrate your latest pumps, valves, automation systems, Industrial IoT solutions, instrumentation, and process technologies through live product displays and technical demonstrations.
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-900 block">Key Benefits:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      <li className="flex items-center">
                        <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                        <span>Launch new technologies</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                        <span>Demonstrate products live</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                        <span>Position your brand as an industry innovator</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: 3 Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              
              {/* Benefit 03: Generate High-Quality Business Leads */}
              <div className="bg-white rounded-2xl border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative h-40 overflow-hidden bg-slate-900">
                    <img 
                      src={getMediaUrl('/we/webkeep1.webp')} 
                      alt="Generate High-Quality Business Leads"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1E65FF] text-white text-xs font-black shadow-sm">
                        03
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <span className="text-white font-extrabold text-sm">
                        Pipeline & Sales ROI
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading group-hover:text-[#1E65FF] transition-colors">
                      3. Generate High-Quality Leads
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Meet thousands of professionals actively seeking industrial equipment, automation systems, flow control technologies, and engineering solutions.
                    </p>

                    <div className="pt-2.5 border-t border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-900 block">Key Benefits:</span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Generate qualified B2B enquiries</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Meet purchase decision-makers</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Expand your sales pipeline</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefit 04: Expand Your Market Presence */}
              <div className="bg-white rounded-2xl border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative h-40 overflow-hidden bg-slate-900">
                    <img 
                      src={getMediaUrl('/newcardimages/4. Expand Your Market Presence.jfif')} 
                      alt="Expand Your Market Presence"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1E65FF] text-white text-xs font-black shadow-sm">
                        04
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <span className="text-white font-extrabold text-sm">
                        National Reach & Visibility
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading group-hover:text-[#1E65FF] transition-colors">
                      4. Expand Your Market Presence
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Strengthen your presence across India’s rapidly growing manufacturing, chemical, pharmaceutical, water treatment, energy, and infrastructure sectors.
                    </p>

                    <div className="pt-2.5 border-t border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-900 block">Key Benefits:</span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Reach new industrial markets</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Increase brand visibility</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Build nationwide distribution networks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefit 05: Stay Ahead of Industry Trends */}
              <div className="bg-white rounded-2xl border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative h-40 overflow-hidden bg-slate-900">
                    <img 
                      src={getMediaUrl('/newcardimages/Where Industrial Equipment Meets Intelligence.jfif')} 
                      alt="Stay Ahead of Industry Trends"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1E65FF] text-white text-xs font-black shadow-sm">
                        05
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <span className="text-white font-extrabold text-sm">
                        Industry 4.0 & Smart Tech
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading group-hover:text-[#1E65FF] transition-colors">
                      5. Stay Ahead of Trends
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Explore the latest developments in Industry 4.0, Smart Manufacturing, Industrial IoT, predictive condition monitoring, hydrogen technologies, and green solutions.
                    </p>

                    <div className="pt-2.5 border-t border-slate-100 space-y-1">
                      <span className="text-[11px] font-bold text-slate-900 block">Key Benefits:</span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Discover emerging technologies</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Learn from industry experts</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3.5 h-3.5 text-[#1E65FF] mr-1.5 shrink-0" />
                          <span>Gain valuable market insights</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ==========================================
            SECTION 4: EXHIBITORS & INDUSTRY LEADERS
            ========================================== */}
        <section className="space-y-6 bg-white p-5 sm:p-8 rounded-2xl border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div className="space-y-1.5 max-w-2xl">
              <span className="px-3.5 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-extrabold uppercase tracking-widest inline-block">
                PARTICIPATING INDUSTRIAL BRANDS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading">
                Exhibitors & Industry Leaders
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Explore featured brands exhibiting pump systems, valve positioners, and industrial automation solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-600">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80">100+ Manufacturers</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80">Global & Domestic</span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1E65FF] border border-blue-200/80">Hall 1, 2 & 3</span>
            </div>
          </div>

          {/* Logo Cards Grid: Clean Borderless Cards with Soft Elevation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {ESTEEMED_EXHIBITORS.map((exhibitor) => (
              <div 
                key={exhibitor.id}
                onClick={() => onOpenModal('exhibitor')}
                className="bg-[#F8FAFC] hover:bg-white rounded-xl p-3.5 sm:p-4 border-0 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-between text-center min-h-[110px] sm:min-h-[125px]"
              >
                {/* Logo Container */}
                <div className="h-11 sm:h-13 w-full flex items-center justify-center p-1">
                  <img 
                    src={exhibitor.logo} 
                    alt={exhibitor.name}
                    className="max-h-9 sm:max-h-11 w-auto max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Brand Name */}
                <div className="w-full pt-1.5 border-t border-slate-100">
                  <h3 className="text-xs font-extrabold text-slate-900 font-heading tracking-tight line-clamp-2 text-center group-hover:text-[#1E65FF] transition-colors">
                    {exhibitor.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Banner under brands */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0A192F] to-[#0D327B] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-inner">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                Prime Stall Locations Available
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                Want your brand showcased alongside these esteemed process industry leaders at HITEX Hyderabad?
              </p>
            </div>
            <button 
              onClick={() => onOpenModal('exhibitor')}
              className="px-5 py-2.5 rounded-xl bg-[#1E65FF] hover:bg-white hover:text-slate-900 text-white font-extrabold text-xs uppercase tracking-wider transition-all shrink-0 shadow-md flex items-center space-x-1.5"
            >
              <span>Book Your Space</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </section>

        {/* ==========================================
            SECTION 5: EXHIBITOR PROFILE & INDUSTRIES SERVED
            ========================================== */}
        <section id="exhibitor-profile" className="scroll-mt-32 space-y-6 sm:space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="px-3.5 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-extrabold uppercase tracking-widest inline-block">
              EXHIBITOR PROFILE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
              Technologies Driving Modern Process Industries
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Explore the innovations, equipment and industrial technologies that will be showcased at IPVS 2026 by leading manufacturers, automation companies and engineering solution providers.
            </p>
          </div>

          {/* 3 Main Technology Showcase Cards: Distinct Top Accent Borders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
            
            {/* Card 1: Industrial Pumps (Blue Top Accent) */}
            <div className="bg-white rounded-2xl border-t-4 border-t-[#1E65FF] border-x-0 border-b-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={getMediaUrl('/newcardimages/Industrial Pumps.jfif')} 
                    alt="Industrial Pumps & Fluid Handling Equipment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-extrabold shadow-sm flex items-center space-x-1">
                      <Building2 className="w-3 h-3 text-[#1E65FF]" />
                      <span>HEAVY PROCESS EQUIPMENT</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3.5">
                    <span className="text-white font-extrabold text-sm sm:text-base drop-shadow-sm">
                      Pumping & Fluid Systems
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading group-hover:text-[#1E65FF] transition-colors">
                    Industrial Pumps
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Discover advanced pumping technologies engineered for chemical, water, oil & gas, pharmaceutical and manufacturing industries.
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      "Smart Pumps", "Centrifugal", "Chemical Pumps", "Slurry Pumps", 
                      "Boiler Feed", "VFD Drives", "IoT Monitoring", "Mechanical Seals"
                    ].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button 
                  onClick={() => navigate('/smart-iot-pumps')}
                  className="w-full py-2.5 rounded-xl bg-[#F4F7FE] hover:bg-[#1E65FF] text-[#1E65FF] hover:text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Explore Pump Technologies</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Industrial Valve Automation (Cyan Top Accent) */}
            <div className="bg-white rounded-2xl border-t-4 border-t-[#00D2FF] border-x-0 border-b-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={getMediaUrl('/newcardimages/Industrial Valve Automation.jfif')} 
                    alt="Industrial Valve Automation & Flow Control"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-extrabold shadow-sm flex items-center space-x-1">
                      <Layers className="w-3 h-3 text-[#00A3C4]" />
                      <span>FLOW CONTROL & POSITIONERS</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3.5">
                    <span className="text-white font-extrabold text-sm sm:text-base drop-shadow-sm">
                      Smart Actuators & Valves
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading group-hover:text-[#00A3C4] transition-colors">
                    Industrial Valve Automation
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Intelligent flow control solutions powered by actuators, positioners, smart valves and digital monitoring systems.
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      "Valve Automation", "Control Valves", "Actuators", "Positioners", "Safety Valves", "Smart Diagnostics"
                    ].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button 
                  onClick={() => navigate('/smart-valve-automation')}
                  className="w-full py-2.5 rounded-xl bg-[#F4F7FE] hover:bg-[#00D2FF] text-slate-800 hover:text-slate-950 font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Explore Valve Technologies</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 3: Automation & Instrumentation (Emerald Top Accent) */}
            <div className="bg-white rounded-2xl border-t-4 border-t-emerald-500 border-x-0 border-b-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={getMediaUrl('/newcardimages/Automation & Instrumentation.jfif')} 
                    alt="Automation & Instrumentation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-extrabold shadow-sm flex items-center space-x-1">
                      <Cpu className="w-3 h-3 text-emerald-600" />
                      <span>INDUSTRY 4.0 & DIGITAL TWIN</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3.5">
                    <span className="text-white font-extrabold text-sm sm:text-base drop-shadow-sm">
                      SCADA, DCS & IoT
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading group-hover:text-emerald-600 transition-colors">
                    Automation & Instrumentation
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Experience Industry 4.0 technologies connecting machinery, analytics and plant operations through intelligent automation.
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      "PLC", "SCADA", "DCS", "Industrial IoT", 
                      "Digital Twin", "Condition Monitoring", "Cloud Monitoring", "Sensors"
                    ].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <button 
                  onClick={() => navigate('/smart-valve-automation')}
                  className="w-full py-2.5 rounded-xl bg-[#F4F7FE] hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Explore Automation Systems</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Sub-Section: Industries Served */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 text-center">
            
            <div className="space-y-2 max-w-2xl mx-auto">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-[#00D2FF] text-xs font-bold uppercase tracking-widest inline-block">
                INDUSTRIES SERVED
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Solutions Engineered for Ethanol, Pharma & Water Sectors
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                We are mainly focused towards: Pumps, Valves | Oil & Gas | Pharma | Water | Chemicals | Power | Steel | Food | Cement | EPC | OEM.
              </p>
            </div>

            {/* 12 Sectors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
              {industriesServed.map((ind) => {
                const IconComp = ind.icon;
                return (
                  <div 
                    key={ind.name}
                    className="bg-slate-800/70 hover:bg-[#1E65FF] rounded-xl p-3 border-0 transition-all text-center flex flex-col items-center justify-center space-y-1.5 group cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg ${ind.bg} group-hover:bg-white/20 transition-colors`}>
                      <IconComp className={`w-4 h-4 ${ind.color} group-hover:text-white`} />
                    </div>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white">{ind.name}</span>
                  </div>
                );
              })}
            </div>

          </div>

        </section>

        {/* ==========================================
            SECTION 6: FAQ SECTION
            ========================================== */}
        <section className="space-y-6 text-center">
          
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-extrabold uppercase tracking-widest">
              EXHIBITOR FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers to stall booking, booth logistics, and exhibitor amenities at IPVS 2026.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-2.5 text-left">
            {exhibitorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={faq.id}
                  className={`rounded-2xl transition-all overflow-hidden ${
                    isOpen 
                      ? 'bg-white border-l-4 border-l-[#1E65FF] border-y-0 border-r-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]' 
                      : 'bg-white border border-slate-200/70 hover:border-[#1E65FF]/40 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-[#1E65FF]"
                  >
                    <span className="flex items-center space-x-2.5 pr-3">
                      <HelpCircle className="w-4 h-4 text-[#1E65FF] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#1E65FF]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </section>

        {/* Real Past Exhibition Gallery (5-Card Row + Full Lightbox Modal) */}
        <PastExhibitionGallery onOpenModal={onOpenModal} />

        {/* ==========================================
            SECTION 7: FORMS SECTION
            ========================================== */}
        <section className="scroll-mt-32">
          <InlineRegistrationForm 
            title="Exhibitor Space & Stall Registration"
            subtitle="Submit your details to receive official floor plans, corner booth options, and exhibitor participation guidelines."
            defaultCategory="exhibitor"
          />
        </section>

      </div>

      {/* Interactive Floor Plan Viewer Modal */}
      {showFloorPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[96%] 2xl:max-w-[1500px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 max-h-[90vh] flex flex-col">
            
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <h3 className="text-sm font-bold flex items-center">
                <MapPin className="w-4 h-4 text-[#00D2FF] mr-2" />
                IPVS 2026 HITEX Floor Plan Layout
              </h3>
              <button 
                onClick={() => setShowFloorPlanModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-slate-300">
              <FloorPlanViewer onOpenModal={onOpenModal} />
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
