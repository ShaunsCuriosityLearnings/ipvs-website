import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Calendar, Ticket, Building2, ShieldCheck, MapPin, Mail, Phone, Globe, Loader2 } from 'lucide-react';
import { EVENT_DETAILS } from '../../data/ipvsData';
import { submitLead } from '../../services/leadService';

interface InlineRegistrationFormProps {
  title?: string;
  subtitle?: string;
  defaultCategory?: 'visitor' | 'exhibitor' | 'general';
}

export const InlineRegistrationForm: React.FC<InlineRegistrationFormProps> = ({
  title,
  subtitle,
  defaultCategory = 'visitor'
}) => {
  const [category, setCategory] = useState<'visitor' | 'exhibitor'>(
    defaultCategory === 'exhibitor' ? 'exhibitor' : 'visitor'
  );

  useEffect(() => {
    if (defaultCategory === 'exhibitor') {
      setCategory('exhibitor');
    } else if (defaultCategory === 'visitor') {
      setCategory('visitor');
    }
  }, [defaultCategory]);

  const [formData, setFormData] = useState({
    stallSize: '18 SQM',
    firstName: '',
    lastName: '',
    company: '',
    designation: '',
    mobile: '',
    email: '',
    city: '',
    website: '',
    sectorInterest: 'Ethanol & Biofuels',
    heardFrom: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.company) return;

    setIsSubmitting(true);
    await submitLead({
      formType: category,
      source: `Inline Form (${category.toUpperCase()})`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      designation: category === 'visitor' ? formData.designation : undefined,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      website: category === 'exhibitor' ? formData.website : undefined,
      stallSize: category === 'exhibitor' ? formData.stallSize : undefined,
      sectorInterest: category === 'visitor' ? formData.sectorInterest : undefined,
      heardFrom: formData.heardFrom || undefined
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const isVisitor = category === 'visitor';

  const stallOptions = ['9 SQM', '12 SQM', '18 SQM', '36 SQM', '54 SQM', '72+ SQM'];

  return (
    <section className="py-6 sm:py-10 bg-[#F4F7FE] text-slate-800">
      
      {/* Compact, Powerful Form Container */}
      <div className="max-w-2xl mx-auto px-3 sm:px-6 relative z-10">
        
        {/* Slightly gray card styling for clean, tactile, non-AI enterprise appearance */}
        <div className="bg-[#EDF2F7] text-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-lg border border-slate-300/80 text-left">
          
          {/* Header Banner */}
          <div className="text-center space-y-1.5 mb-5 sm:mb-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{EVENT_DETAILS.dates} • {EVENT_DETAILS.venue}</span>
            </div>

            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 font-heading">
              {title || (isVisitor ? "Trade Visitor Registration" : "Exhibitor Stall Registration")}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium max-w-md mx-auto">
              {subtitle || (isVisitor 
                ? "Pre-register for your free fast-track entry pass to IPVS 2026." 
                : "Select your required stall space and submit your booth inquiry.")}
            </p>
          </div>

          {/* Mode Switcher Segmented Control */}
          {!submitted && (
            <div className="w-full max-w-xs mx-auto grid grid-cols-2 p-1 bg-slate-200/80 rounded-xl border border-slate-300 mb-5 shadow-inner">
              <button
                type="button"
                onClick={() => setCategory('visitor')}
                className={`py-2 px-2.5 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 ${
                  isVisitor
                    ? 'bg-[#1E65FF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Visitor Pass</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('exhibitor')}
                className={`py-2 px-2.5 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 ${
                  !isVisitor
                    ? 'bg-[#1E65FF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Exhibitor Stall</span>
              </button>
            </div>
          )}

          {/* Success State */}
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-3.5 animate-in fade-in duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                {isVisitor ? "Visitor Registration Confirmed!" : "Exhibitor Request Received!"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.firstName} {formData.lastName}</strong> from <strong>{formData.company}</strong>. 
                {isVisitor 
                  ? ` Your pass details have been sent to ${formData.email}. Show confirmation at the desk for fast-track badge collection.` 
                  : ` Orbit Exhibitions will contact you at ${formData.email} and ${formData.mobile} with floor plan availability for ${formData.stallSize}.`}
              </p>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-left max-w-sm mx-auto text-xs space-y-1 text-slate-600">
                <div className="flex justify-between"><span className="font-semibold text-slate-800">Event:</span><span>IPVS 2026 Hyderabad</span></div>
                <div className="flex justify-between"><span className="font-semibold text-slate-800">Dates:</span><span>December 03 - 04, 2026</span></div>
                <div className="flex justify-between"><span className="font-semibold text-slate-800">Category:</span><span className="font-bold text-[#1E65FF]">{isVisitor ? 'Free Visitor Pass' : `Exhibitor Stall (${formData.stallSize})`}</span></div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData(prev => ({
                    ...prev,
                    firstName: '',
                    lastName: '',
                    company: '',
                    designation: '',
                    mobile: '',
                    email: '',
                    city: '',
                    website: '',
                    heardFrom: ''
                  }));
                }}
                className="mt-2 px-6 py-2.5 rounded-xl bg-[#1E65FF] text-white font-bold text-xs hover:bg-[#0D47A1] transition-colors shadow-sm"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">

              {/* EXHIBITOR FORM ONLY: Required Stall Area (SQM) * */}
              {!isVisitor && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-300/80 space-y-1.5 shadow-sm">
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-900 font-heading">
                    Required Stall Area (SQM) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                    {stallOptions.map((sqm) => (
                      <button
                        key={sqm}
                        type="button"
                        onClick={() => setFormData({ ...formData, stallSize: sqm })}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-extrabold transition-all border ${
                          formData.stallSize === sqm
                            ? 'bg-[#1E65FF] text-white border-[#1E65FF] shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        {sqm}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Row 1: First Name * & Last Name * */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
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
                    className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
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
                    className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Company Name * & (Designation for Visitor OR Mobile for Exhibitor) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
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
                    className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                  />
                </div>

                {isVisitor ? (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="e.g. Plant Manager / Engineer"
                      className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                    />
                  </div>
                ) : (
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
                      className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Row 3: Mobile (if visitor) & Official Work Email * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {isVisitor && (
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
                      className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                    />
                  </div>
                )}

                <div className={!isVisitor ? "sm:col-span-1" : ""}>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Official Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                  />
                </div>

                {!isVisitor && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Hyderabad / Mumbai"
                      className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Row 4: City & Sector (for Visitor) OR Company Website (for Exhibitor) */}
              {isVisitor ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Hyderabad / Mumbai"
                      className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Primary Sector Interest
                    </label>
                    <select
                      value={formData.sectorInterest}
                      onChange={(e) => setFormData({ ...formData, sectorInterest: e.target.value })}
                      className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                    >
                      <option value="Ethanol & Biofuels">Ethanol & Biofuels</option>
                      <option value="Water & Wastewater">Water & Wastewater Treatment</option>
                      <option value="Pharma & Biotech">Pharma & Biotech</option>
                      <option value="Chemicals & Petrochemicals">Chemicals & Petrochemicals</option>
                      <option value="Oil & Gas">Oil & Gas</option>
                      <option value="Power Generation">Power Generation</option>
                      <option value="Steel & Metallurgy">Steel & Metallurgy</option>
                      <option value="Food & Dairy Processing">Food & Dairy Processing</option>
                      <option value="Pumps, Valves & Automation">Pumps, Valves & Automation</option>
                      <option value="EPC & OEM Engineering">EPC & OEM Engineering</option>
                    </select>
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
                    className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                  />
                </div>
              )}

              {/* Where did you hear about us? */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Where did you hear about us? <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.heardFrom}
                  onChange={(e) => setFormData({ ...formData, heardFrom: e.target.value })}
                  className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E65FF] focus:border-[#1E65FF] transition-all"
                >
                  <option value="">Select how you heard about us</option>
                  <option value="Social Media (LinkedIn / Facebook / Twitter)">Social Media (LinkedIn / Facebook / Twitter)</option>
                  <option value="Google / Online Search">Google / Online Search</option>
                  <option value="Industry Colleague / Word of Mouth">Industry Colleague / Word of Mouth</option>
                  <option value="Email / Newsletter Invitation">Email / Newsletter Invitation</option>
                  <option value="Media Partner / Trade Magazine (Chemical Industry Digest / Spicos / Mantonia)">Media Partner / Trade Magazine</option>
                  <option value="Telephonic / Direct Invitation from Orbit Exhibitions">Direct Invitation from Orbit Exhibitions</option>
                  <option value="Past IPVS Exhibition">Past IPVS Exhibition</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-3.5 rounded-xl bg-[#1E65FF] hover:bg-[#0D47A1] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
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
                      ) : (
                        <>
                          <Building2 className="w-4 h-4" />
                          <span>Submit Exhibitor Stall Request</span>
                        </>
                      )}
                      <Send className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Clean Footer Note */}
              <div className="text-center text-[10px] text-slate-500 pt-0.5 flex items-center justify-center space-x-2">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Orbit Exhibitions Pvt. Ltd. • HITEX Hyderabad</span>
              </div>

            </form>
          )}

        </div>
      </div>

    </section>
  );
};
