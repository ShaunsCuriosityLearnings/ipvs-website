import React from 'react';
import {
  Sparkles,
  Users,
  PlayCircle,
  Cpu,
  Layers,
  BookOpen,
  ArrowRight,
  Building2,
  Ticket
} from 'lucide-react';
import { getMediaUrl } from '../../utils/media';

interface PastHighlightsSectionProps {
  onOpenModal?: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const PastHighlightsSection: React.FC<PastHighlightsSectionProps> = ({ onOpenModal }) => {
  const highlights = [
    {
      num: "01",
      tag: "INNOVATION ZONE",
      title: "Discover What’s Next in Industrial Technology",
      description: "Experience breakthrough technologies across pumps, valves, automation, instrumentation, IIoT and process engineering, with product launches, demonstrations and next-generation industrial solutions.",
      cta: "Explore Innovation Zone →",
      image: getMediaUrl("/newcardimages/Discover What's Next in Industrial Technology.jfif"),
      icon: Sparkles,
      iconColor: "text-cyan-500",
      journeyStep: "DISCOVER"
    },
    {
      num: "02",
      tag: "BUSINESS NETWORKING",
      title: "Connect With the People Who Drive Industry",
      description: "Meet OEMs, EPC companies, plant owners, procurement leaders, consultants, distributors and technology decision-makers to build partnerships and discover new business opportunities.",
      cta: "Build Business Connections →",
      image: getMediaUrl("/newcardimages/Connect With the People Who Drive Industry.jfif"),
      icon: Users,
      iconColor: "text-emerald-500",
      journeyStep: "CONNECT"
    },
    {
      num: "03",
      tag: "LIVE PRODUCT DEMONSTRATIONS",
      title: "See Technology in Action",
      description: "Experience industrial technologies through live demonstrations and real-world applications, helping you understand how pumps, valves, automation and process solutions perform beyond the catalogue.",
      cta: "See Technology in Action →",
      image: getMediaUrl("/newcardimages/See Technology in Action.jfif"),
      icon: PlayCircle,
      iconColor: "text-amber-500",
      journeyStep: "EXPERIENCE"
    },
    {
      num: "04",
      tag: "SMART MANUFACTURING & DIGITALISATION",
      title: "Where Industrial Equipment Meets Intelligence",
      description: "Explore AI, Industrial IoT, smart sensors, digital twins, predictive maintenance and connected automation transforming the way modern plants operate.",
      cta: "Explore Smart Technologies →",
      image: getMediaUrl("/newcardimages/Where Industrial Equipment Meets Intelligence.jfif"),
      icon: Cpu,
      iconColor: "text-blue-500",
      journeyStep: "DIGITALISE"
    },
    {
      num: "05",
      tag: "COMPLETE PROCESS SOLUTIONS",
      title: "From Components to Complete Systems",
      description: "Discover integrated solutions across pumping, flow control, instrumentation, process automation, water treatment, process control and industrial engineering for end-to-end plant requirements.",
      cta: "Explore Process Solutions →",
      image: getMediaUrl("/newcardimages/From Components to Complete Systems.jfif"),
      icon: Layers,
      iconColor: "text-teal-500",
      journeyStep: "SOLVE"
    },
    {
      num: "06",
      tag: "KNOWLEDGE EXCHANGE",
      title: "Learn What’s Shaping the Future of Industry",
      description: "Gain practical insights through technical seminars, expert sessions and panel discussions covering Industry 4.0, AI, smart manufacturing, sustainability, digitalisation and process innovation.",
      cta: "Explore Knowledge Sessions →",
      image: getMediaUrl("/newcardimages/Learn What's Shaping the Future of Industry.jfif"),
      icon: BookOpen,
      iconColor: "text-purple-500",
      journeyStep: "LEARN"
    }
  ];



  return (
    <section className="py-10 sm:py-14 bg-white text-slate-800 space-y-10 sm:space-y-14">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-10 sm:space-y-14">

        {/* ==========================================
            SECTION 3 (Part A): Event Registration for Exhibitors Banner
            (Brand Gradient: #111183 to #0e89d0)
            ========================================== */}
        <div className="bg-gradient-to-r from-[#111183] to-[#0e89d0] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-3 max-w-3xl relative z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 text-cyan-200 text-xs font-bold uppercase tracking-widest inline-block">
              Event Registration for Exhibitors
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              Connect with 100+ Exhibitors showcasing cutting-edge Technologies and Innovations
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              The ultimate platform for professionals in the industrial pumps, valves, and chemical processing equipment sectors.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <button
              onClick={() => onOpenModal && onOpenModal('exhibitor')}
              className="px-8 py-4 rounded-xl text-xs sm:text-sm font-extrabold text-[#111183] bg-white hover:bg-slate-100 transition-all shadow-xl uppercase tracking-wider flex items-center space-x-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Pre-Register as Exhibitor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ==========================================
            SECTION 3 (Part B): Highlights of the Exhibition (6 Cards)
            ========================================== */}
        <div className="space-y-10">

          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 text-[#0e89d0] text-xs font-bold tracking-widest uppercase">
              <span className="w-6 h-0.5 bg-[#0e89d0]"></span>
              <span>Exhibition Highlights</span>
              <span className="w-6 h-0.5 bg-[#0e89d0]"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
              Highlights of the Exhibition
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Experience breakthrough innovations and world-class B2B experiences at IPVS 2026.
            </p>
          </div>



          {/* 6 Exhibition Highlights Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div>
                    {/* Image Header with Badge */}
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-slate-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                      {/* Icon badge */}
                      <div className="absolute top-3 left-3 p-2 rounded-xl bg-white/95 text-slate-900 backdrop-blur-md shadow-md flex items-center space-x-1.5">
                        <IconComp className={`w-4 h-4 ${item.iconColor}`} />
                        <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider">{item.journeyStep}</span>
                      </div>

                      {/* Number badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/60 text-white backdrop-blur-md text-xs font-black font-heading">
                        {item.num}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-2">
                      <span className="text-[11px] font-extrabold text-[#0e89d0] uppercase tracking-wider block font-heading">
                        {item.num} — {item.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#111183] transition-colors font-heading leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA Button */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-slate-200/80">
                    <button
                      onClick={() => onOpenModal && onOpenModal('visitor')}
                      className="text-xs font-bold text-[#111183] hover:text-[#0e89d0] flex items-center group-hover:translate-x-1 transition-all"
                    >
                      <span>{item.cta}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visitor Action Button */}
          <div className="text-center pt-4">
            <button
              onClick={() => onOpenModal && onOpenModal('visitor')}
              className="px-8 py-4 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#111183] to-[#0e89d0] hover:from-[#0d0d6c] hover:to-[#0c74b1] shadow-xl shadow-blue-900/30 transition-all uppercase tracking-wider inline-flex items-center space-x-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Event Registration for Visitors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
