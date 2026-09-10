import React, { useState, useEffect } from 'react';
import { ArrowRight, Ticket } from 'lucide-react';

interface CountdownBannerProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ onOpenModal }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-12-03T10:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-[#F4F7FE]">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Vibrant Ocean Blue Card Container (Matching Eventik UI Mockup) */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1E65FF] via-[#0D47A1] to-[#1E65FF] text-white p-8 sm:p-12 shadow-2xl shadow-[#1E65FF]/30 overflow-hidden">
          
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side: Heading & CTA */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00D2FF]">
                ••• Event Countdown
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
                Count Every Second <br />
                Until Event.
              </h3>
              <button 
                onClick={() => onOpenModal('visitor')}
                className="px-6 py-3 rounded-xl bg-white text-[#1E65FF] font-extrabold text-xs tracking-wider uppercase hover:bg-slate-100 transition-all shadow-md flex items-center"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Buy Ticket / Free Register
              </button>
            </div>

            {/* Right side: 4 Numeric Boxes */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              
              <div className="p-5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20">
                <span className="text-3xl sm:text-5xl font-black text-white font-heading">
                  {timeLeft.days}
                </span>
                <span className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mt-2">
                  Days
                </span>
              </div>

              <div className="p-5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20">
                <span className="text-3xl sm:text-5xl font-black text-white font-heading">
                  {timeLeft.hours}
                </span>
                <span className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mt-2">
                  Hours
                </span>
              </div>

              <div className="p-5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20">
                <span className="text-3xl sm:text-5xl font-black text-white font-heading">
                  {timeLeft.minutes}
                </span>
                <span className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mt-2">
                  Minutes
                </span>
              </div>

              <div className="p-5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20">
                <span className="text-3xl sm:text-5xl font-black text-white font-heading">
                  {timeLeft.seconds}
                </span>
                <span className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mt-2">
                  Seconds
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
