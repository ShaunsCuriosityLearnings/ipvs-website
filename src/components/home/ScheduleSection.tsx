import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';

interface ScheduleSectionProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onOpenModal }) => {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2' | 'day3'>('day1');

  const scheduleData = {
    day1: [
      {
        time: "10:00 AM - 01:00 PM",
        date: "03 Dec 2026",
        title: "Next-Gen Smart Valves & Actuators in Ethanol & Chemical Refineries",
        location: "Hall 1 Main Stage, HITEX Hyderabad",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
        speakers: [
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
        ]
      },
      {
        time: "02:00 PM - 05:00 PM",
        date: "03 Dec 2026",
        title: "Energy Efficient Industrial IoT Pumps for Water Treatment & Municipal Plants",
        location: "Hall 2 Conference Arena, HITEX Hyderabad",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80",
        speakers: [
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
        ]
      }
    ],
    day2: [
      {
        time: "10:30 AM - 01:30 PM",
        date: "04 Dec 2026",
        title: "Predictive Maintenance & Diagnostics: Zero Unscheduled Downtime in Fluid Handling",

        location: "Hall 1 Tech Stage, HITEX Hyderabad",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80",
        speakers: [
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
        ]
      },
      {
        time: "02:30 PM - 05:30 PM",
        date: "04 Dec 2026",
        title: "Pharma Grade Sanitary Flow Control & High-Pressure Biofuel Applications",
        location: "Hall 3 Summit Lounge, HITEX Hyderabad",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80",
        speakers: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
        ]
      }
    ],
    day3: [
      {
        time: "11:00 AM - 04:00 PM",
        date: "04 Dec 2026",
        title: "B2B Buyer-Seller Matchmaking & Global Trade Delegation Networking",
        location: "VIP Business Lounge, HITEX Hyderabad",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80",
        speakers: [
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        ]
      }
    ]
  };

  return (
    <section className="py-20 bg-white text-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
              <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
              <span>Event Timetable</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
              Information Of Event Schedule
            </h2>
          </div>

          {/* Day Filter Tabs (Matching Eventik UI Mockup) */}
          <div className="flex items-center space-x-2 bg-[#F4F7FE] p-1.5 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setActiveDay('day1')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeDay === 'day1' 
                  ? 'bg-[#1E65FF] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day 01
            </button>

            <button 
              onClick={() => setActiveDay('day2')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeDay === 'day2' 
                  ? 'bg-[#1E65FF] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day 02
            </button>

            <button 
              onClick={() => setActiveDay('day3')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeDay === 'day3' 
                  ? 'bg-[#1E65FF] text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day 03
            </button>
          </div>
        </div>

        {/* Schedule Cards List */}
        <div className="space-y-6">
          {scheduleData[activeDay].map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#F4F7FE] rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-left"
            >
              {/* Image Left */}
              <div className="lg:col-span-3">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-36 object-cover rounded-2xl shadow-md"
                />
              </div>

              {/* Middle Details */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1E65FF]">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {item.date}
                  </span>
                  <span className="flex items-center text-slate-500">
                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {item.time}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="flex items-center text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500" />
                  {item.location}
                </p>
              </div>

              {/* Right Action Button & Avatars */}
              <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200">
                <button 
                  onClick={() => onOpenModal('visitor')}
                  className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#1E65FF] font-bold text-xs hover:bg-[#1E65FF] hover:text-white transition-all shadow-sm flex items-center"
                >
                  <Ticket className="w-3.5 h-3.5 mr-1.5" />
                  Buy Tickets
                </button>

                <div className="flex -space-x-2">
                  {item.speakers.map((spk, sIdx) => (
                    <img key={sIdx} className="h-8 w-8 rounded-full ring-2 ring-white object-cover" src={spk} alt="Speaker" />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
