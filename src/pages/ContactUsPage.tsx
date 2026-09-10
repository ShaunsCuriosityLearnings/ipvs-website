import React, { useState } from 'react';
import { EVENT_DETAILS } from '../data/ipvsData';
import { 
  MapPin, Phone, PhoneCall, Mail, Clock, Send, CheckCircle2, 
  Building2, Users, HelpCircle, ArrowRight, Sparkles, Loader2,
  Linkedin, Twitter, Youtube, Facebook, Globe
} from 'lucide-react';
import { getMediaUrl } from '../utils/media';
import { submitLead } from '../services/leadService';
import { PastExhibitionGallery } from '../components/common/PastExhibitionGallery';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { SEO } from '../components/common/SEO';

interface ContactUsPageProps {
  onOpenModal?: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onOpenModal }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    heardFrom: '',
    message: ''
  });

  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) return;

    setIsSubmitting(true);
    await submitLead({
      formType: 'contact',
      source: 'Contact Us Page',
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mobile: form.mobile || 'Not specified',
      heardFrom: form.heardFrom || undefined,
      message: form.message
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    submitLead({
      formType: 'contact',
      source: 'Newsletter Subscription (Footer)',
      firstName: 'Newsletter',
      lastName: 'Subscriber',
      email: newsletterEmail,
      mobile: 'N/A',
      message: 'Subscribed to IPVS 2026 newsletter updates.'
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#1E65FF] selection:text-white">
      <SEO 
        title="Contact Us & Exhibition Venue | IPVS 2026 Hyderabad"
        description="Contact Orbit Exhibitions for stall inquiries, visitor passes, and sponsorship details for IPVS 2026 at HITEX Exhibition Center, Hyderabad."
        canonical="https://ipvs.in/contact-us"
      />

      {/* =========================================================
          SECTION 1: HERO HEADER WITH OVERLAPPING ARCH IMAGE
          (Gradient: #111183 to #0e89d0)
          ========================================================= */}
      <section className="relative bg-gradient-to-r from-[#111183] to-[#0e89d0] text-white pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-2xl">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[98%] 2xl:max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Headline & Description */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>IPVS 2026 Support Desk</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight">
                Contact Us
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-light">
                Have questions regarding stall booking, visitor passes, sponsorships, or exhibition logistics? Connect with the Orbit Exhibitions team directly.
              </p>
            </div>

            {/* Right: Arched Image Top Half (Overlaps into section below) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 rounded-t-full overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-800 relative z-20 -mb-28 sm:-mb-36">
                <img 
                  src={getMediaUrl("/we/webkeep.webp")} 
                  alt="IPVS Exhibition Hall and Modern Architecture" 
                  className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          SECTION 2: CONTACT INFORMATION STRIP
          (Left: Contact Information Cards | Right: Bottom of Arch)
          ========================================================= */}
      <section className="bg-white pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-[98%] 2xl:max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Contact Info Header + 3 Horizontal Cards */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed">
                  Reach out directly through phone, official email, or visit our central exhibition desk at HITEX Hyderabad and Mumbai headquarters.
                </p>
              </div>

              {/* 3 Horizontal Contact Blocks matching reference layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                
                {/* 1. Phone */}
                <div className="flex flex-col items-start space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#354F52] text-white flex items-center justify-center shadow-md">
                    <PhoneCall className="w-5 h-5 text-cyan-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                      {EVENT_DETAILS.phone}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Monday to Friday, 9:30 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>

                {/* 2. Email */}
                <div className="flex flex-col items-start space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#354F52] text-white flex items-center justify-center shadow-md">
                    <Mail className="w-5 h-5 text-cyan-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                      {EVENT_DETAILS.email}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Official Event Support
                    </p>
                  </div>
                </div>

                {/* 3. Location */}
                <div className="flex flex-col items-start space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#354F52] text-white flex items-center justify-center shadow-md">
                    <MapPin className="w-5 h-5 text-cyan-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                      Venue Location
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      HITEX Exhibition Centre, Hyderabad
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Spacer accommodating the lower base of the arched image */}
            <div className="hidden lg:block lg:col-span-5"></div>

          </div>
        </div>
      </section>


      {/* =========================================================
          SECTION 3: GET IN TOUCH FORM & OUR LOCATION (MAP)
          (Left: Dark Get In Touch Card | Right: Map & Social Media)
          ========================================================= */}
      <section className="bg-[#F8FAFC] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-[98%] 2xl:max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* LEFT COLUMN: Dark "Get In Touch !" Card (Inspired by Reference Design) */}
            <div className="lg:col-span-6 bg-gradient-to-b from-[#1C2A34] to-[#121E26] text-white p-7 sm:p-10 rounded-3xl shadow-2xl border border-slate-700/60 text-left space-y-6">
              
              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  Get In Touch !
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Fill in your details below and our exhibition desk will respond within 24 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{form.firstName} {form.lastName}</strong>. Orbit Exhibitions will contact you at <strong>{form.email}</strong> regarding your inquiry.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ firstName: '', lastName: '', email: '', mobile: '', heardFrom: '', message: '' });
                    }} 
                    className="mt-3 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#52796F] hover:bg-[#354F52] transition-colors shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name Row: First & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Rajesh"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full bg-[#15222E]/80 border border-slate-600/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Kumar"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full bg-[#15222E]/80 border border-slate-600/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Mobile Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Official Work Email <span className="text-red-400">*</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="name@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#15222E]/80 border border-slate-600/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Mobile Number
                      </label>
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full bg-[#15222E]/80 border border-slate-600/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Where did you hear about us? * */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Where did you hear about us? <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={form.heardFrom}
                      onChange={(e) => setForm({ ...form, heardFrom: e.target.value })}
                      className="w-full bg-[#15222E]/80 border border-slate-600/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-slate-900 text-slate-300">Select how you heard about us</option>
                      <option value="Social Media (LinkedIn / Facebook / Twitter)" className="bg-slate-900 text-white">Social Media (LinkedIn / Facebook / Twitter)</option>
                      <option value="Google / Online Search" className="bg-slate-900 text-white">Google / Online Search</option>
                      <option value="Industry Colleague / Word of Mouth" className="bg-slate-900 text-white">Industry Colleague / Word of Mouth</option>
                      <option value="Email / Newsletter Invitation" className="bg-slate-900 text-white">Email / Newsletter Invitation</option>
                      <option value="Media Partner / Trade Magazine (Chemical Industry Digest / Spicos / Mantonia)" className="bg-slate-900 text-white">Media Partner / Trade Magazine</option>
                      <option value="Telephonic / Direct Invitation from Orbit Exhibitions" className="bg-slate-900 text-white">Direct Invitation from Orbit Exhibitions</option>
                      <option value="Past IPVS Exhibition" className="bg-slate-900 text-white">Past IPVS Exhibition</option>
                      <option value="Other" className="bg-slate-900 text-white">Other</option>
                    </select>
                  </div>

                  {/* Message Details */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Message Details <span className="text-red-400">*</span>
                    </label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Inquire about stall availability, technical sponsorship, visitor registration, travel guidance..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#15222E]/80 border border-slate-600/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                    ></textarea>
                  </div>

                  {/* Submit Button (Pill shaped with sage-green accent matching reference design) */}
                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#52796F] hover:bg-[#354F52] transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Sending to Orbit Exhibitions...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>


            {/* RIGHT COLUMN: "Venue Location" (Google Map) & "Social Media" */}
            <div className="lg:col-span-6 space-y-8 text-left">
              
              {/* Location Heading & Description */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Venue Location
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  HITEX Exhibition Centre, Trade Fair Office Building, Izzat Nagar, Hyderabad, Telangana 500084. Situated near HITEC City with world-class logistics and connectivity.
                </p>
              </div>

              {/* Interactive Google Map Card matching reference screenshot style */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white relative h-72 sm:h-80">
                <iframe
                  title="HITEX Exhibition Centre Hyderabad Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.3262846429294!2d78.37126237588825!3d17.472718999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93b952f50ec5%3A0xc3f3458bfb106297!2sHITEX%20Exhibition%20Centre!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Social Media Section with Round Icons */}
              <div className="space-y-3 pt-2">
                <h4 className="text-lg font-extrabold text-slate-900 font-heading">
                  Social Media
                </h4>
                <div className="flex items-center space-x-3">
                  <a 
                    href="https://www.linkedin.com/company/orbit-exhibitions/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#354F52] hover:bg-[#2F3E46] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#354F52] hover:bg-[#2F3E46] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                    aria-label="Twitter / X"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#354F52] hover:bg-[#2F3E46] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#354F52] hover:bg-[#2F3E46] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://ipvs.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#354F52] hover:bg-[#2F3E46] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                    aria-label="Official Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          SECTION 4: "OUR NEWSLETTERS" BOTTOM STRIP
          (Directly from Reference Screenshot Design)
          ========================================================= */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[98%] 2xl:max-w-[1500px] mx-auto">
          <div className="bg-gradient-to-r from-[#111183] to-[#0e89d0] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
            
            {/* Left: Newsletter Info */}
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Our Newsletters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Stay updated with the latest exhibitor announcements, technical whitepapers, floor plans, and VIP visitor pass invites.
              </p>
            </div>

            {/* Right: Pill-shaped Subscription Field */}
            <div className="w-full lg:w-auto">
              {newsletterSubmitted ? (
                <div className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-5 py-3 rounded-full border border-emerald-500/40 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you for subscribing to IPVS 2026 newsletters!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center bg-white rounded-full p-1.5 shadow-lg max-w-md w-full">
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your official work email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#52796F] hover:bg-[#354F52] transition-colors shadow-sm shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Real Past Exhibition Photo Gallery */}
      <PastExhibitionGallery onOpenModal={onOpenModal} />

      {/* Frequently Asked Questions */}
      <FaqAccordion onOpenModal={onOpenModal} />

    </div>
  );
};
