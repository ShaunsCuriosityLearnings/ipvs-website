import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Building2, 
  Ticket, 
  Mail, 
  Send,
  Calendar,
  ShieldCheck,
  Loader2,
  Award
} from 'lucide-react';
import { EVENT_DETAILS } from '../../data/ipvsData';
import { submitLead, HEARD_ABOUT_OPTIONS, SPONSORSHIP_TIERS } from '../../services/leadService';

interface RegistrationModalProps {
  isOpen: boolean;
  mode: 'exhibitor' | 'visitor' | 'contact' | 'sponsorship';
  initialSqm?: number;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  mode,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'exhibitor' | 'visitor' | 'contact' | 'sponsorship'>(mode);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    stallSize: '18 SQM',
    sponsorshipTier: SPONSORSHIP_TIERS[0],
    firstName: '',
    lastName: '',
    company: '',
    designation: '',
    mobile: '',
    email: '',
    city: '',
    website: '',
    sectorInterest: 'Ethanol & Biofuels',
    heardFrom: '',
    message: ''
  });

  useEffect(() => {
    setActiveTab(mode);
    setSubmitted(false);
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile) return;

    setIsSubmitting(true);
    await submitLead({
      formType: activeTab,
      source: `Registration Modal (${activeTab.toUpperCase()})`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      designation: activeTab === 'visitor' || activeTab === 'sponsorship' ? formData.designation : undefined,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      website: activeTab === 'exhibitor' || activeTab === 'sponsorship' ? formData.website : undefined,
      stallSize: activeTab === 'exhibitor' ? formData.stallSize : undefined,
      sponsorshipTier: activeTab === 'sponsorship' ? formData.sponsorshipTier : undefined,
      sectorInterest: activeTab === 'visitor' ? formData.sectorInterest : undefined,
      heardFrom: formData.heardFrom || undefined,
      message: activeTab === 'contact' ? formData.message : undefined
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const isVisitor = activeTab === 'visitor';
  const isExhibitor = activeTab === 'exhibitor';
  const isContact = activeTab === 'contact';
  const isSponsorship = activeTab === 'sponsorship';

  const stallOptions = ['9 SQM', '12 SQM', '18 SQM', '36 SQM', '54 SQM', '72+ SQM'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      
      {/* Compact Modal Card */}
      <div className="bg-[#EDF2F7] text-slate-900 border border-slate-300 rounded-2xl sm:rounded-3xl max-w-lg sm:max-w-xl w-full p-4 sm:p-7 relative shadow-2xl animate-in zoom-in-95 duration-200 my-4 sm:my-8 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-300 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Tab Switcher */}
        {!submitted && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-xl bg-slate-200/80 border border-slate-300 mb-4 sm:mb-5 max-w-lg shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('visitor')}
              className={`py-2 px-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 ${
                isVisitor
                  ? 'bg-[#1E65FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Ticket className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Visitor Pass</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('exhibitor')}
              className={`py-2 px-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 ${
                isExhibitor
                  ? 'bg-[#1E65FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Exhibitor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sponsorship')}
              className={`py-2 px-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 ${
                isSponsorship
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Sponsorship</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`py-2 px-2 rounded-lg text-xs font-extrabold transition-all items-center justify-center space-x-1.5 flex ${
                isContact
                  ? 'bg-[#1E65FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Help Desk</span>
            </button>
          </div>
        )}

        {/* Success Confirmation View */}
        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-3.5 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
              {isVisitor 
                ? "Visitor Registration Confirmed!" 
                : isExhibitor 
                  ? "Stall Request Confirmed!" 
                  : isSponsorship
                    ? "Sponsorship Inquiry Received!"
                    : "Inquiry Sent to Event Desk!"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.firstName} {formData.lastName}</strong> from <strong>{formData.company || 'Delegate'}</strong>. 
              {isVisitor 
                ? ` Your confirmation has been dispatched to ${formData.email}. Show confirmation at HITEX registration counter for instant fast-track entry.` 
                : isExhibitor
                  ? ` Orbit Exhibitions will contact you at ${formData.email} and ${formData.mobile} with layout diagrams for ${formData.stallSize}.`
                  : isSponsorship
                    ? ` Orbit Exhibitions will contact you at ${formData.email} and ${formData.mobile} with the IPVS 2026 Sponsorship Deck & branding deliverables.`
                    : ` Event Desk will review your inquiry and respond to ${formData.email} shortly.`}
            </p>

            <button
              onClick={onClose}
              className="mt-2 px-7 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1E65FF] hover:bg-[#0D47A1] transition-all shadow-md"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          <div>
            {/* Title Header */}
            <div className="mb-4 space-y-1 text-left">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#1E65FF] uppercase tracking-wider block">
                {EVENT_DETAILS.dates} • {EVENT_DETAILS.venue}
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 font-heading">
                {isVisitor 
                  ? 'Trade Visitor Pre-Registration' 
                  : isExhibitor 
                    ? 'Exhibitor Stall Space Registration' 
                    : isSponsorship
                      ? 'Sponsorship & Brand Partnership'
                      : 'Contact IPVS Event Support'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {isVisitor 
                  ? 'Free entry pass for industrial buyers, EPC consultants & plant engineers.' 
                  : isExhibitor 
                    ? 'Select your required stall size and submit your booth inquiry.' 
                    : isSponsorship
                      ? 'Partner with IPVS 2026 to position your brand before 7,000+ industry decision makers.'
                      : 'Ask questions regarding stalls, sponsorships, or delegate passes.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* EXHIBITOR SPECIFIC: Required Stall Area (SQM) * */}
              {isExhibitor && (
                <div className="p-3 rounded-xl bg-white border border-slate-300/80 space-y-1.5 shadow-sm">
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-900 font-heading">
                    Required Stall Area (SQM) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {stallOptions.map((sqm) => (
                      <button
                        key={sqm}
                        type="button"
                        onClick={() => setFormData({ ...formData, stallSize: sqm })}
                        className={`py-1.5 px-1 text-center rounded-lg text-xs font-extrabold transition-all border ${
                          formData.stallSize === sqm
                            ? 'bg-[#1E65FF] text-white border-[#1E65FF] shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {sqm}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SPONSORSHIP SPECIFIC: Desired Package */}
              {isSponsorship && (
                <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1 shadow-sm">
                  <label className="block text-[11px] sm:text-xs font-bold text-purple-950 font-heading">
                    Desired Sponsorship Package <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.sponsorshipTier}
                    onChange={(e) => setFormData({ ...formData, sponsorshipTier: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-purple-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  >
                    {SPONSORSHIP_TIERS.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Row 1: First Name * & Last Name * */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Rajesh"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Kumar"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>
              </div>

              {/* Row 2: Company Name * & (Designation for Visitor/Sponsor OR City for Exhibitor/Contact) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>

                {isVisitor || isSponsorship ? (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder={isSponsorship ? "e.g. Director / Head of Marketing" : "e.g. Plant Manager / Engineer"}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      City / Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Hyderabad / Mumbai"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                    />
                  </div>
                )}
              </div>

              {/* Row 3: Mobile * & Email * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Official Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>
              </div>

              {/* Conditional Row 4 */}
              {isContact ? (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Your Message / Inquiry Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Inquire about stall availability, speaker sessions, travel logistics..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>
              ) : isVisitor ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      City / Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Hyderabad / Pune"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Sector Interest
                    </label>
                    <select
                      value={formData.sectorInterest}
                      onChange={(e) => setFormData({ ...formData, sectorInterest: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                    >
                      <option value="Ethanol & Biofuels">Ethanol & Biofuels</option>
                      <option value="Water & Wastewater">Water & Wastewater</option>
                      <option value="Pharma & Biotech">Pharma & Biotech</option>
                      <option value="Chemicals & Petrochem">Chemicals & Petrochem</option>
                      <option value="Oil & Gas">Oil & Gas</option>
                      <option value="Power & Energy">Power & Energy</option>
                      <option value="Steel & Metallurgy">Steel & Metallurgy</option>
                      <option value="Food & Beverages">Food & Beverages</option>
                      <option value="EPC & OEMs">EPC & OEMs</option>
                    </select>
                  </div>
                </div>
              ) : isSponsorship ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      City / Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Hyderabad / Mumbai"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Company Website
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="www.company.com"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Company Website
                  </label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="www.company.com"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                  />
                </div>
              )}

              {/* How did you hear about us? */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  How did you hear about us? <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.heardFrom}
                  onChange={(e) => setFormData({ ...formData, heardFrom: e.target.value })}
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

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-3.5 rounded-xl text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed ${
                    isSponsorship
                      ? 'bg-[#7C3AED] hover:bg-[#6D28D9]'
                      : 'bg-[#1E65FF] hover:bg-[#0D47A1]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Details to Orbit Exhibitions...</span>
                    </>
                  ) : (
                    <>
                      {isVisitor ? (
                        <>
                          <Ticket className="w-4 h-4" />
                          <span>Register for Free Visitor Pass</span>
                        </>
                      ) : isExhibitor ? (
                        <>
                          <Building2 className="w-4 h-4" />
                          <span>Submit Exhibitor Stall Request</span>
                        </>
                      ) : isSponsorship ? (
                        <>
                          <Award className="w-4 h-4" />
                          <span>Submit Sponsorship Inquiry</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Send Message to Event Desk</span>
                        </>
                      )}
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
          </div>
        )}

      </div>
    </div>
  );
};
