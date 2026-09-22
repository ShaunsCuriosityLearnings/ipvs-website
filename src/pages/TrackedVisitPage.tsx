import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { captureAttribution, getStoredAttribution, findExhibitorByQuery, AttributionData } from '../utils/attribution';
import { ExhibitorItem, EVENT_DETAILS } from '../data/ipvsData';
import { submitLead } from '../services/leadService';
import { 
  Ticket, 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Award,
  Users,
  Check,
  Loader2
} from 'lucide-react';

interface TrackedVisitPageProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const TrackedVisitPage: React.FC<TrackedVisitPageProps> = ({ onOpenModal }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [attribution, setAttribution] = useState<AttributionData>({});
  const [exhibitor, setExhibitor] = useState<ExhibitorItem | undefined>(undefined);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    company: '',
    designation: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Capture and persist UTM parameters immediately
    const attr = captureAttribution();
    setAttribution(attr);

    // Identify if visitor was invited by an exhibitor
    const query = searchParams.get('utm_source') || searchParams.get('exhibitor') || attr.invitingExhibitorSlug || attr.utmSource;
    const matched = findExhibitorByQuery(query);
    setExhibitor(matched);

    const exhibitorTitle = matched ? `${matched.name} | Official VIP Invite` : 'Official VIP Trade Visitor Portal';
    document.title = `${exhibitorTitle} | IPVS 2026`;

    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      matched
        ? `You have been exclusively invited by ${matched.name} (${matched.stall || matched.booth}) to attend IPVS 2026 at HITEX Hyderabad (03-04 Dec 2026). Claim your complimentary VIP Trade Pass.`
        : 'Register for your free VIP Trade Visitor Pass to IPVS 2026 at HITEX Hyderabad. Discover 100+ industrial pump & valve manufacturers.'
    );
  }, [searchParams]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.company) return;

    setIsSubmitting(true);
    await submitLead({
      formType: 'visitor',
      source: exhibitor ? `Exhibitor Invite (${exhibitor.slug || exhibitor.name})` : 'Tracked VIP Landing Page',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobile: formData.mobile,
      company: formData.company,
      designation: formData.designation || undefined,
      city: formData.city || undefined,
      invitingExhibitor: exhibitor?.name || attribution.invitingExhibitor,
      utmSource: attribution.utmSource || exhibitor?.slug,
      utmMedium: attribution.utmMedium || 'exhibitor_invite',
      utmCampaign: attribution.utmCampaign || 'ipvs2026',
      utmContent: attribution.utmContent || exhibitor?.stall,
      landingPage: window.location.pathname + window.location.search
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById('vip-form-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rawStall = exhibitor?.stall || exhibitor?.booth || attribution.utmContent || attribution.stallNumber;
  const cleanStall = rawStall ? rawStall.replace(/^stall[\s_:-]*/i, '').trim() : '';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-[68px] sm:pt-[76px] pb-16 selection:bg-[#1E65FF] selection:text-white">

      {/* ==========================================================
          1. HALF-PAGE EXECUTIVE INVITATION HERO (APPROX 48-50vh)
          Design: [Left: Name] [Center: Big Logo] [Right: Stall Number]
          ========================================================== */}
      <header className="bg-[#0A192F] text-white border-b border-slate-800 relative overflow-hidden min-h-[46vh] sm:min-h-[48vh] md:min-h-[50vh] flex items-center justify-center">
        {/* Subtle dynamic ambient glow & grid effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="w-full max-w-[98%] 2xl:max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
          
          {exhibitor ? (
            /* 3-Section Layout: [Left: Large Name] [Center: Very Big Logo] [Right: Large Stall Badge] */
            <div className="flex flex-row items-center justify-between gap-3 sm:gap-6 md:gap-8">
              
              {/* LEFT SIDE: Large Exhibitor Name & Event Details */}
              <div className="flex-1 min-w-0 text-left space-y-2 sm:space-y-3">
                <div className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Official VIP Invitation</span>
                </div>

                <h1 className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading text-white leading-tight tracking-tight line-clamp-2 sm:line-clamp-3">
                  {exhibitor.name}
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-slate-300 truncate hidden sm:block">
                  {exhibitor.sector} • Welcomes you to IPVS 2026
                </p>

                <div className="flex items-center space-x-2 sm:space-x-4 text-[11px] sm:text-xs md:text-sm text-slate-300 pt-1">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold">03–04 Dec 2026</span>
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="items-center space-x-1.5 hidden sm:flex">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                    <span>HITEX Hyderabad</span>
                  </span>
                </div>
              </div>

              {/* CENTER: VERY BIG LOGO CONTAINER */}
              <div className="shrink-0 flex flex-col items-center justify-center px-1 sm:px-4 md:px-6">
                <div className="w-32 h-20 sm:w-56 sm:h-32 md:w-72 md:h-40 lg:w-84 lg:h-44 bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl border-2 border-white/95 flex items-center justify-center transition-all hover:scale-105 duration-300">
                  <img
                    src={exhibitor.logo}
                    alt={exhibitor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-cyan-300/90 mt-2 hidden sm:block">
                  Featured Exhibitor
                </span>
              </div>

              {/* RIGHT SIDE: LARGE PROMINENT STALL NUMBER */}
              <div className="flex-1 min-w-0 text-right flex flex-col items-end justify-center space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                  Exhibition Stall
                </span>

                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-600 to-[#1E65FF] text-white px-3 sm:px-6 py-2 sm:py-3.5 rounded-2xl shadow-2xl border border-blue-400/40">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-85">
                    Stall
                  </span>
                  <span className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-wide">
                    {cleanStall || 'VIP'}
                  </span>
                </div>

                <div className="text-[10px] sm:text-xs md:text-sm text-slate-300 font-medium hidden sm:block">
                  <span>Hall 1 & 2 • HITEX Centre</span>
                </div>
              </div>

            </div>
          ) : (
            /* Generic VIP Header with balanced 3-part layout */
            <div className="flex flex-row items-center justify-between gap-3 sm:gap-8">
              <div className="flex-1 text-left space-y-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>VIP Visitor Portal</span>
                </span>
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-white">
                  IPVS 2026
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 hidden sm:block">
                  Industrial Pumps, Valves & Systems Exhibition
                </p>
              </div>

              <div className="shrink-0 flex items-center justify-center">
                <div className="w-32 h-20 sm:w-56 sm:h-32 md:w-72 md:h-40 bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl flex items-center justify-center">
                  <img
                    src="/Logo/logo-1.png"
                    alt="IPVS 2026"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-1 text-right flex flex-col items-end justify-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Dates & Venue
                </span>
                <div className="inline-block bg-[#1E65FF] text-white px-3 sm:px-6 py-2 sm:py-3 rounded-2xl text-sm sm:text-xl font-extrabold">
                  03–04 Dec 2026
                </div>
                <span className="text-xs text-slate-300 hidden sm:block">
                  HITEX Hyderabad
                </span>
              </div>
            </div>
          )}

        </div>
      </header>


      {/* ==========================================================
          2. SECTION 02 CARDS (PROMINENTLY VISIBLE ON MAIN PAGE FOLD)
          Floating seamlessly at hero bottom edge
          ========================================================== */}
      <section className="max-w-[98%] 2xl:max-w-[1350px] mx-auto px-3 sm:px-6 lg:px-8 -mt-5 sm:-mt-7 md:-mt-9 relative z-20 pb-2">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5">

          {/* ACTION 1: VISITOR REGISTRATION */}
          <div 
            onClick={scrollToForm}
            className="cursor-pointer bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border-2 border-blue-200 hover:border-blue-500 shadow-xl transition-all duration-200 text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center space-x-1.5 text-[#1E65FF] mb-1 sm:mb-1.5">
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider font-heading">
                  Trade Visitor
                </span>
              </div>
              <h3 className="text-xs sm:text-lg md:text-xl font-black text-slate-900 leading-snug group-hover:text-[#1E65FF] transition-colors">
                Free VIP Pass
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block mt-1">
                Complimentary entry to all 3 exhibition halls & technical conferences
              </p>
            </div>

            <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[#1E65FF]">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Claim Pass</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* ACTION 2: EXHIBITOR ENQUIRY */}
          <div 
            onClick={() => onOpenModal('exhibitor')}
            className="cursor-pointer bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 border-2 border-slate-200 hover:border-slate-400 shadow-xl transition-all duration-200 text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center space-x-1.5 text-slate-700 mb-1 sm:mb-1.5">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E65FF] shrink-0" />
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider font-heading">
                  Exhibitors
                </span>
              </div>
              <h3 className="text-xs sm:text-lg md:text-xl font-black text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                Book a Stall
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block mt-1">
                Showcase pumps, valves & systems to 10,000+ industry buyers
              </p>
            </div>

            <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-slate-700 group-hover:text-slate-900">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>


      {/* ==========================================================
          3. COMPACT METRICS ROW (4-COL ROW-WISE ON MOBILE)
          ========================================================== */}
      <section className="max-w-[98%] 2xl:max-w-[1300px] mx-auto px-3 sm:px-6 lg:px-8 pb-3 sm:pb-5">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
            <span className="text-sm sm:text-2xl font-extrabold text-[#1E65FF] font-heading block">100+</span>
            <span className="text-[9px] sm:text-xs font-semibold text-slate-600 block leading-tight">Brands</span>
          </div>
          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
            <span className="text-sm sm:text-2xl font-extrabold text-slate-900 font-heading block">10,000+</span>
            <span className="text-[9px] sm:text-xs font-semibold text-slate-600 block leading-tight">Buyers</span>
          </div>
          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
            <span className="text-sm sm:text-2xl font-extrabold text-slate-900 font-heading block">3 Halls</span>
            <span className="text-[9px] sm:text-xs font-semibold text-slate-600 block leading-tight">HITEX</span>
          </div>
          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs text-center">
            <span className="text-sm sm:text-2xl font-extrabold text-emerald-600 font-heading block">Free</span>
            <span className="text-[9px] sm:text-xs font-semibold text-slate-600 block leading-tight">VIP Pass</span>
          </div>
        </div>
      </section>


      {/* ==========================================================
          4. EMBEDDED STREAMLINED REGISTRATION FORM (MINIMALIST, COMPACT & ROW-WISE)
          ========================================================== */}
      <section id="vip-form-anchor" className="max-w-2xl mx-auto px-3 sm:px-6 pt-1">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-md text-left space-y-4">
          
          {/* Header Strip */}
          <div className="border-b border-slate-100 pb-3 space-y-0.5">
            {exhibitor ? (
              <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs font-bold text-[#1E65FF]">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>Courtesy VIP Pass • {exhibitor.name} {cleanStall ? `(Stall ${cleanStall})` : ''}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs font-bold text-[#1E65FF]">
                <Ticket className="w-3.5 h-3.5 shrink-0" />
                <span>Complimentary Trade Visitor Registration</span>
              </div>
            )}
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 font-heading">
              Fast-Track Badge Registration
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Badge confirmation and digital pass will be issued immediately upon submit.
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                Registration Confirmed!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Your complimentary VIP visitor pass has been reserved. Present your mobile number at the registration counter for badge printing.
              </p>
              {exhibitor && (
                <div className="p-2.5 sm:p-3 bg-blue-50 rounded-xl text-xs text-blue-900 font-medium inline-block border border-blue-100">
                  Visit <strong>{exhibitor.name}</strong> at <strong>{cleanStall ? `Stall ${cleanStall}` : 'their stall'}</strong>.
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-3">
              
              {/* Row 1: Names (2 columns on mobile) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="First name"
                    className="w-full px-2.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last name"
                    className="w-full px-2.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>
              </div>

              {/* Row 2: Contact (2 columns on mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-2.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-2.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>
              </div>

              {/* Row 3: Company & Role (2 columns on mobile) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company"
                    className="w-full px-2.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="Role/Title"
                    className="w-full px-2.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>
              </div>

              {/* Row 4: City */}
              <div className="space-y-1">
                <label className="text-[11px] sm:text-xs font-bold text-slate-700">City / Location</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Hyderabad, Mumbai, Ahmedabad, Chennai"
                  className="w-full px-2.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 rounded-xl bg-[#1E65FF] hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center space-x-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Confirming Pass...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Free VIP Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Strictly for verified trade delegates & industry buyers. Fast-track entry badge guaranteed.
              </p>
            </form>
          )}

        </div>
      </section>

    </div>
  );
};
