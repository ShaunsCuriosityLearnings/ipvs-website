import React from 'react';
import { Users, Ticket, CheckCircle2, ArrowRight, ShieldCheck, Layers, Building } from 'lucide-react';
import { TARGET_INDUSTRIES } from '../../data/ipvsData';

interface VisitorSectionProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const VisitorSection: React.FC<VisitorSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="visitor" className="py-24 bg-slate-900/40 relative overflow-hidden border-t border-slate-800">
      
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>VISITOR INFORMATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
            Stay Ahead of Competition: <span className="text-gradient-cyan">Discover Next-Gen Solutions</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Visit IPVS Expo 2026 to discover cutting-edge pumps, smart valve automation, and process equipment to boost plant operational efficiency.
          </p>
        </div>

        {/* Visitor Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">Source Products & Solutions</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Compare 100+ Exhibitors showcasing centrifugal pumps, slurry pumps, actuators, digital positioners, and process equipment.
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Direct Factory OEM Pricing
            </span>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">Learn What's New & What's Next</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Attend live technical keynotes on Industry 4.0, Industrial IoT, predictive condition monitoring, and green hydrogen fluid handling.
            </p>
            <span className="text-[11px] text-cyan-400 font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Technical Seminars Included
            </span>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">Unparalleled Networking</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Connect with +7000 visitors, plant managers, EPC consultants, distributors, and technology pioneers.
            </p>
            <span className="text-[11px] text-purple-400 font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              B2B Partner Matching
            </span>
          </div>
        </div>

        {/* Target Visitor Industry Sector Cards */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 font-heading text-center">
            Who Should Visit IPVS 2026?
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TARGET_INDUSTRIES.map((ind, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">{ind.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{ind.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Registration Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Free Trade Visitor Entry</span>
            <h3 className="text-2xl font-bold text-white font-heading">
              Pre-Register Today for Instant Badge Delivery
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Skip registration queues at HITEX Hyderabad by completing your free online pass registration now.
            </p>
          </div>
          <button 
            onClick={() => onOpenModal('visitor')}
            className="px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-950/40 shrink-0 flex items-center"
          >
            <Ticket className="w-4 h-4 mr-2" />
            <span>Register for Free Pass</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

      </div>
    </section>
  );
};

