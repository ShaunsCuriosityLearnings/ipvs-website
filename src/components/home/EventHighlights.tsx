import React from 'react';
import { 
  Sparkles, 
  Users, 
  PlayCircle, 
  Cpu, 
  Layers, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';

interface EventHighlightsProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const EventHighlights: React.FC<EventHighlightsProps> = ({ onOpenModal }) => {
  const highlights = [
    {
      num: "01",
      tag: "INNOVATION ZONE",
      title: "Discover What’s Next in Industrial Technology",
      desc: "Experience breakthrough technologies across pumps, valves, automation, instrumentation, IIoT and process engineering, with product launches, demonstrations and next-generation industrial solutions.",
      cta: "Explore Innovation Zone →",
      icon: Sparkles,
      iconColor: "text-cyan-400",
      journeyStep: "DISCOVER"
    },
    {
      num: "02",
      tag: "BUSINESS NETWORKING",
      title: "Connect With the People Who Drive Industry",
      desc: "Meet OEMs, EPC companies, plant owners, procurement leaders, consultants, distributors and technology decision-makers to build partnerships and discover new business opportunities.",
      cta: "Build Business Connections →",
      icon: Users,
      iconColor: "text-emerald-400",
      journeyStep: "CONNECT"
    },
    {
      num: "03",
      tag: "LIVE PRODUCT DEMONSTRATIONS",
      title: "See Technology in Action",
      desc: "Experience industrial technologies through live demonstrations and real-world applications, helping you understand how pumps, valves, automation and process solutions perform beyond the catalogue.",
      cta: "See Technology in Action →",
      icon: PlayCircle,
      iconColor: "text-amber-400",
      journeyStep: "EXPERIENCE"
    },
    {
      num: "04",
      tag: "SMART MANUFACTURING & DIGITALISATION",
      title: "Where Industrial Equipment Meets Intelligence",
      desc: "Explore AI, Industrial IoT, smart sensors, digital twins, predictive maintenance and connected automation transforming the way modern plants operate.",
      cta: "Explore Smart Technologies →",
      icon: Cpu,
      iconColor: "text-blue-400",
      journeyStep: "DIGITALISE"
    },
    {
      num: "05",
      tag: "COMPLETE PROCESS SOLUTIONS",
      title: "From Components to Complete Systems",
      desc: "Discover integrated solutions across pumping, flow control, instrumentation, process automation, water treatment, process control and industrial engineering for end-to-end plant requirements.",
      cta: "Explore Process Solutions →",
      icon: Layers,
      iconColor: "text-teal-400",
      journeyStep: "SOLVE"
    },
    {
      num: "06",
      tag: "KNOWLEDGE EXCHANGE",
      title: "Learn What’s Shaping the Future of Industry",
      desc: "Gain practical insights through technical seminars, expert sessions and panel discussions covering Industry 4.0, AI, smart manufacturing, sustainability, digitalisation and process innovation.",
      cta: "Explore Knowledge Sessions →",
      icon: BookOpen,
      iconColor: "text-purple-400",
      journeyStep: "LEARN"
    }
  ];

  const journeySteps = [
    { label: "DISCOVER", step: "01" },
    { label: "CONNECT", step: "02" },
    { label: "EXPERIENCE", step: "03" },
    { label: "DIGITALISE", step: "04" },
    { label: "SOLVE", step: "05" },
    { label: "LEARN", step: "06" }
  ];

  return (
    <section className="py-20 relative bg-slate-900/80 border-y border-slate-800/80">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 inline-block">
            EXHIBITION HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Why IPVS 2026 is the <span className="text-gradient-cyan">Must-Attend Event</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Designed to connect equipment manufacturers directly with high-volume buyers, EPC contractors, and technical decision-makers.
          </p>
        </div>

        {/* The Overall Visitor Journey Strip */}
        <div className="mb-14 max-w-5xl mx-auto text-center">
          <div className="inline-block mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              The Overall Visitor Journey
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-slate-950/70 border border-slate-800/90 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
            {journeySteps.map((item, idx) => (
              <React.Fragment key={item.label}>
                <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-700/60 px-3 py-1.5 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-black flex items-center justify-center border border-cyan-500/30">
                    {item.step}
                  </span>
                  <span className="text-xs font-black text-white tracking-wider font-heading">
                    {item.label}
                  </span>
                </div>
                {idx < journeySteps.length - 1 && (
                  <span className="text-cyan-400/50 font-bold hidden sm:inline select-none">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-950/60 rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-cyan-500/40 relative group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col justify-between"
              >
                {/* Top Row: Icon + Number & Journey Step */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center ${item.iconColor} shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-wider uppercase">
                        {item.journeyStep}
                      </span>
                      <span className="text-2xl font-black text-slate-700 font-heading group-hover:text-slate-500 transition-colors">
                        {item.num}
                      </span>
                    </div>
                  </div>

                  {/* Category Tag Header */}
                  <span className="text-[11px] font-extrabold text-cyan-400 tracking-wider uppercase block mb-1.5 font-heading">
                    {item.num} — {item.tag}
                  </span>

                  {/* Card Headline */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-heading group-hover:text-cyan-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Card Bottom CTA Link */}
                <div className="pt-6 border-t border-slate-800/80 mt-5">
                  <button
                    onClick={() => onOpenModal('visitor')}
                    className="inline-flex items-center text-xs font-bold text-cyan-400 hover:text-white group-hover:translate-x-1 transition-all"
                  >
                    <span>{item.cta}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Bottom Section CTA */}
        <div className="mt-14 text-center">
          <button 
            onClick={() => onOpenModal('visitor')}
            className="px-8 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-950/30 transition-all uppercase tracking-wider inline-flex items-center space-x-2"
          >
            <span>Pre-Register as Visitor for Free Entry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
