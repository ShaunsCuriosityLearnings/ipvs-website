import React from 'react';
import { Layers, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { SMART_PUMP_TECH } from '../../data/ipvsData';

interface SmartPumpsSectionProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const SmartPumpsSection: React.FC<SmartPumpsSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="smart-pumps" className="py-10 sm:py-14 bg-slate-900/60 relative overflow-hidden border-t border-slate-800">
      
      {/* Glow Effects */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>FEATURED SPECIALIZED EXHIBITION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight mb-4">
            Revolutionizing Fluid Management with <span className="text-gradient-cyan">Smart IoT Pumps</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Pumping systems are transforming from passive mechanical hardware into connected, intelligent platforms featuring AI diagnostics, remote monitoring, and energy optimization.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SMART_PUMP_TECH.map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 relative">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-heading">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
              <span className="text-[11px] text-purple-400 font-semibold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                IIoT & Cloud Connected
              </span>
            </div>
          ))}
        </div>

        {/* Target Sectors Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold text-white font-heading">
              Exhibit Next-Gen Smart Pumping Solutions at IPVS 2026
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Meet 10,000+ plant engineers and procurement managers seeking energy-efficient, AI-monitored pumps for water treatment, pharmaceuticals, food processing, and chemicals.
            </p>
          </div>
          <button 
            onClick={() => onOpenModal('exhibitor')}
            className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shrink-0 flex items-center"
          >
            <span>Book Smart Pump Stall</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
