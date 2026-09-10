import React, { useState } from 'react';
import { 
  Map, 
  Maximize2, 
  Download, 
  Layers, 
  CheckCircle, 
  X,
  Compass
} from 'lucide-react';

import { EVENT_DETAILS } from '../../data/ipvsData';

interface FloorPlanViewerProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const FloorPlanViewer: React.FC<FloorPlanViewerProps> = ({ onOpenModal }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHall, setSelectedHall] = useState<'hall-1' | 'hall-2'>('hall-1');

  return (
    <section className="py-20 bg-slate-900/40 relative border-t border-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 inline-block">
              HITEX HYDERABAD FLOOR MAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Interactive <span className="text-gradient-cyan">Exhibition Floor Plan</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              Explore stall layouts across Hall 1 & Hall 2 at HITEX Exhibition Center, Hyderabad for December 03-04, 2026.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center"
            >
              <Maximize2 className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Full Screen Preview
            </button>
            <button 
              onClick={() => onOpenModal('exhibitor')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md"
            >
              Reserve Stall
            </button>
          </div>
        </div>

        {/* Hall Switcher Tabs */}
        <div className="flex space-x-2 mb-6">
          <button 
            onClick={() => setSelectedHall('hall-1')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedHall === 'hall-1'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Hall 1: IPVS Smart Pumps & Valves
          </button>
          <button 
            onClick={() => setSelectedHall('hall-2')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedHall === 'hall-2'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Hall 2: Process Automation & Chemical Equipment
          </button>
        </div>

        {/* Mock Graphic Floorplan Layout Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6 text-xs text-slate-300">
            <div className="flex items-center space-x-6">
              <span className="flex items-center"><span className="w-3 h-3 rounded bg-cyan-500 mr-2"></span> Shell Scheme Stalls</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded bg-purple-500 mr-2"></span> Bare Space Custom Islands</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded bg-emerald-500 mr-2"></span> Live Machinery Demo Zone</span>
            </div>
            <span className="text-slate-500">HITEX Hyderabad • Total Area 15,000+ SQM</span>
          </div>

          {/* Grid Layout Diagram */}
          <div className="bg-slate-950/90 rounded-2xl p-6 border border-slate-800/80 min-h-[340px] flex flex-col justify-between relative">
            <div className="absolute top-4 right-4 flex items-center text-[10px] text-slate-500 space-x-1">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>NORTH ENTRANCE</span>
            </div>

            {/* Simulated Booth Blocks */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
              {[
                { code: "A-01", size: "72 SQM", type: "bare", label: "Grundfos Pumps" },
                { code: "A-02", size: "36 SQM", type: "shell", label: "Andritz Tech" },
                { code: "A-03", size: "36 SQM", type: "shell", label: "Fivebro Water" },
                { code: "A-04", size: "72 SQM", type: "bare", label: "Wilo Mather" },
                { code: "A-05", size: "18 SQM", type: "shell", label: "Lehry Valves" },
                { code: "A-06", size: "18 SQM", type: "shell", label: "BDK Valve" },
              ].map((b, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-xl border text-center transition-all hover:scale-105 cursor-pointer ${
                    b.type === 'bare' 
                      ? 'bg-purple-950/40 border-purple-500/40 text-purple-300' 
                      : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                  }`}
                  onClick={() => onOpenModal('exhibitor')}
                >
                  <span className="block text-xs font-bold font-heading">{b.code}</span>
                  <span className="block text-[10px] font-semibold text-white mt-1 line-clamp-1">{b.label}</span>
                  <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">{b.size}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs font-bold text-white block">Main Visitor Registration Desk</span>
                <span className="text-[10px] text-slate-500">Hall Entrance Lobby</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                <span className="text-xs font-bold text-emerald-400 block">Live Demo Rig Arena</span>
                <span className="text-[10px] text-slate-400">High-Flow Pump Testing</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs font-bold text-white block">B2B Lounge & Networking</span>
                <span className="text-[10px] text-slate-500">VIP & Delegate Area</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs font-bold text-white block">Technical Seminar Stage</span>
                <span className="text-[10px] text-slate-500">Industry 4.0 Keynotes</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Preview Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2 font-heading">
              HITEX Hyderabad Floor Plan - Complete Blueprint
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Detailed architectural diagram showing stall locations, electrical access points, and emergency exits.
            </p>

            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center min-h-[400px] flex items-center justify-center">
              <div>
                <Layers className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-bounce" />
                <h4 className="text-lg font-bold text-white mb-2">Detailed Blueprint Ready</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                  You can download the full high-resolution PDF architectural floorplan containing booth numbers and dimensions.
                </p>
                <a 
                  href={EVENT_DETAILS.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 inline-flex items-center shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Floorplan
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
