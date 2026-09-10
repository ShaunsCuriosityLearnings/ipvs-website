import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const tickerItems = [
    "IPVS 2026 EXPO",
    "INDUSTRIAL PUMPS & VALVES",
    "SMART AUTOMATION",
    "ETHANOL & BIOFUELS",
    "WATER & WASTEWATER",
    "CHEMICAL PROCESSING",
    "INDUSTRY 4.0 & IIOT",
    "HITEX HYDERABAD",
    "DECEMBER 03-04, 2026",
    "ORBIT EXHIBITIONS"
  ];

  return (
    <div className="w-full bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-y border-cyan-500/20 py-3.5 overflow-hidden shadow-lg relative">
      <div className="flex space-x-8 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-3 text-xs font-black tracking-widest text-cyan-300 uppercase font-heading">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>{item}</span>
            <span className="text-slate-700">●</span>
          </div>
        ))}
      </div>
    </div>
  );
};

