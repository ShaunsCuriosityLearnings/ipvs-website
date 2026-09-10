import React from 'react';
import { Cpu, Zap, ShieldCheck, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { SMART_VALVE_TECH } from '../../data/ipvsData';

interface SmartValveSectionProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const SmartValveSection: React.FC<SmartValveSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="smart-valves" className="py-10 sm:py-14 bg-slate-950 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>FEATURED SPECIALIZED EXHIBITION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
            The Future of <span className="text-gradient-cyan">Smart Valve Automation</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Industrial valves are evolving into intelligent control systems delivering precision, reliability, and real-time operational insights for modern manufacturing and energy sectors.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SMART_VALVE_TECH.map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-heading">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
              <span className="text-[11px] text-cyan-400 font-semibold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Industry 4.0 Compliant
              </span>
            </div>
          ))}
        </div>

        {/* Target Sectors Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold text-white font-heading">
              Showcase Your Smart Valve Technologies at IPVS 2026
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Connect with buyers from Oil & Gas, Chemical Processing, Water Treatment, Power Generation, Pharma, and Green Hydrogen looking to deploy automated valve systems.
            </p>
          </div>
          <button 
            onClick={() => onOpenModal('exhibitor')}
            className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-blue-400 hover:bg-blue-300 transition-all shadow-lg shrink-0 flex items-center"
          >
            <span>Book Smart Valve Stall</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
