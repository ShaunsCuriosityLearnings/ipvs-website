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
  Award,
  MapPin,
  Clock,
  Share2,
  ExternalLink,
  User,
  Phone
} from 'lucide-react';
import { EVENT_DETAILS } from '../../data/ipvsData';
import { submitLead, HEARD_ABOUT_OPTIONS, SPONSORSHIP_TIERS } from '../../services/leadService';
import { getStoredAttribution } from '../../utils/attribution';

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

        {!submitted && getStoredAttribution().invitingExhibitor && (
          <div className="mb-4 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200/80 text-[11px] font-semibold text-blue-900 flex items-center justify-between shadow-sm">
            <span className="truncate pr-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#1E65FF] shrink-0" />
              <span>VIP Invitation courtesy of: <strong>{getStoredAttribution().invitingExhibitor}</strong></span>
            </span>
            {getStoredAttribution().stallNumber && (
              <span className="px-2 py-0.5 rounded bg-[#1E65FF] text-white font-mono text-[10px] font-bold shrink-0">
                {getStoredAttribution().stallNumber}
              </span>
            )}
          </div>
        )}

        {/* Success Confirmation View */}
        {submitted ? (
          <div className="text-left py-2 space-y-3.5 animate-in fade-in duration-300">
            {/* Header Status Banner */}
            <div className="text-center pb-2 border-b border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm mb-2.5">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
                {isVisitor 
                  ? "Visitor Pre-Registration Confirmed" 
                  : isExhibitor 
                    ? "Exhibitor Stall Request Confirmed" 
                    : isSponsorship
                      ? "Sponsorship Inquiry Confirmed"
                      : "Inquiry Sent to Event Desk"}
              </span>

              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                Dear {formData.firstName || 'Delegate'},
              </h3>

              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                {isVisitor ? (
                  <>Thank you for pre-registering for <strong>IPVS 2026</strong>! We’re excited to have you join India&apos;s premier pumps, valves & process systems gathering. Your official confirmation has been sent to <strong className="text-blue-700">{formData.email}</strong>.</>
                ) : isExhibitor ? (
                  <>Thank you for your interest in exhibiting at <strong>IPVS 2026</strong>! We look forward to supporting your participation. A booking summary has been sent to <strong className="text-blue-700">{formData.email}</strong>.</>
                ) : (
                  <>Thank you for contacting the <strong>IPVS 2026 Organizing Desk</strong>. A copy of your submission has been dispatched to <strong className="text-blue-700">{formData.email}</strong>.</>
                )}
              </p>
            </div>

            {/* User & Submission Details Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#1E65FF]" /> Registration Summary
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  {isVisitor ? 'TRADE VISITOR' : isExhibitor ? `EXHIBITOR (${formData.stallSize})` : 'PARTNERSHIP'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Full Name</span>
                  <span className="font-semibold text-slate-800">{formData.firstName} {formData.lastName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Company</span>
                  <span className="font-semibold text-slate-800 truncate block">{formData.company || 'Not Specified'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Mobile Number</span>
                  <span className="font-semibold text-slate-800">{formData.mobile}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Official Email</span>
                  <span className="font-semibold text-blue-700 truncate block">{formData.email}</span>
                </div>
                {formData.designation && (
                  <div>
                    <span className="text-slate-400 text-[11px] block">Designation</span>
                    <span className="font-semibold text-slate-800">{formData.designation}</span>
                  </div>
                )}
                {formData.city && (
                  <div>
                    <span className="text-slate-400 text-[11px] block">City</span>
                    <span className="font-semibold text-slate-800">{formData.city}</span>
                  </div>
                )}
                {isExhibitor && (
                  <div>
                    <span className="text-slate-400 text-[11px] block">Requested Stall Space</span>
                    <span className="font-bold text-[#1E65FF]">{formData.stallSize}</span>
                  </div>
                )}
                {isVisitor && formData.sectorInterest && (
                  <div>
                    <span className="text-slate-400 text-[11px] block">Sector Focus</span>
                    <span className="font-semibold text-emerald-700 truncate block">{formData.sectorInterest}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Event Details Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1E65FF]" /> Event Details
              </span>

              <div className="space-y-1.5 text-slate-700">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Dates:</span>
                  <span className="font-bold text-slate-900 text-right">December 03 – 04, 2026 (Thu & Fri)</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Timings:</span>
                  <span className="font-semibold text-slate-800 text-right">10:00 AM – 6:00 PM IST</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500 font-medium">Venue:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    HITEX Exhibition Center, Izzat Nagar, Hyderabad, Telangana – 500084
                  </span>
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Location Map:</span>
                  <a 
                    href="https://maps.google.com/?q=HITEX+Exhibition+Center+Hyderabad" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1E65FF] hover:underline"
                  >
                    <MapPin className="w-3.5 h-3.5" /> View on Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Next Steps & Guidelines Box */}
            <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${
              isVisitor 
                ? 'bg-blue-50/60 border-blue-200 text-slate-700' 
                : 'bg-amber-50/60 border-amber-200 text-slate-700'
            }`}>
              <div className="font-bold uppercase text-[11px] tracking-wider text-slate-900 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#1E65FF]" /> Next Steps:
              </div>
              {isVisitor ? (
                <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-600">
                  <li>Show this confirmation email or your digital badge barcode at the <strong>Pre-Registration Counter</strong> on-site to collect your official Badge & Lanyard.</li>
                  <li>Please carry a valid <strong>Business / Corporate ID Card</strong> for verification.</li>
                  <li><strong>Important:</strong> Trade visitors only • Entry is free • Persons below 18 years are strictly not permitted in exhibition halls.</li>
                </ul>
              ) : isExhibitor ? (
                <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-600">
                  <li>Our Senior Exhibition Account Manager will contact you shortly with the latest <strong>HITEX Floor Plan Layout</strong> and commercial stall package for <strong>{formData.stallSize}</strong>.</li>
                  <li>Need direct floor plan assistance? Call <strong>+91 22 2410 2801</strong> or email <strong>info@orbitexhibitions.com</strong>.</li>
                </ul>
              ) : (
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Our strategic partnership team will review your requirements and respond within one business day.
                </p>
              )}
            </div>

            {/* Actions: Add to Calendar, Invite Colleagues, Return */}
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('IPVS 2026 - Industrial Pumps, Valves & Process Systems Exhibition')}&dates=20261203T043000Z/20261204T123000Z&details=${encodeURIComponent('IPVS 2026 at HITEX Exhibition Center, Hyderabad. Free trade visitor entry for plant engineers, procurement heads, and manufacturers. https://ipvs.in')}&location=${encodeURIComponent('HITEX Exhibition Center, Hyderabad')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#1E65FF]" />
                  <span>Add to Google Calendar</span>
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hi! I just registered for IPVS 2026 (Industrial Pumps, Valves & Process Systems Exhibition) at HITEX Hyderabad (Dec 3-4, 2026). Claim your complimentary VIP Trade Visitor Pass here: https://ipvs.in/visitor`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Invite Colleagues (WhatsApp)</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white bg-[#0D327B] hover:bg-[#1E65FF] transition-all shadow-md text-center"
              >
                Done & Return to Website
              </button>
            </div>
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
