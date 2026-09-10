import React from 'react';
import { Users, Building, Layers, Award } from 'lucide-react';
import { EVENT_DETAILS } from '../../data/ipvsData';

export const StatsBar: React.FC = () => {
  const icons = [Users, Building, Layers, Award];


  return (
    <section className="relative z-20 -mt-10 max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {EVENT_DETAILS.stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className={`flex items-center space-x-4 ${idx !== 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">{stat.value}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-300">{stat.label}</p>
                  <span className="text-[10px] text-cyan-400 font-medium">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
