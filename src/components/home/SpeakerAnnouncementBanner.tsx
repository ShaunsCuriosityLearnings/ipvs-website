import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SpeakerAnnouncementBannerProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const SpeakerAnnouncementBanner: React.FC<SpeakerAnnouncementBannerProps> = ({ onOpenModal }) => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-[#0A192F] via-[#0D47A1] to-[#1E65FF] text-white overflow-hidden">
      
      {/* Background Image Watermark */}
      <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80" 
          alt="Speaker Announcement Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 text-center space-y-12">
        
        {/* Top Stats Counter Row (Matching Eventik UI Mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/20 pb-12">
          
          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl font-black font-heading text-white">50+</span>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00D2FF]">
              Workshops We Offer
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl font-black font-heading text-white">25+</span>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00D2FF]">
              Visionary Speakers
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-6xl font-black font-heading text-white">70k+</span>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00D2FF]">
              Event Participants
            </p>
          </div>

        </div>

        {/* Headline & Button */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-heading">
            Never Miss Another Speaker Announcement
          </h2>

          <button 
            onClick={() => onOpenModal('visitor')}
            className="px-8 py-4 rounded-xl bg-white text-[#1E65FF] font-extrabold text-xs tracking-wider uppercase hover:bg-slate-100 transition-all shadow-2xl shadow-black/20 inline-flex items-center"
          >
            Register Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
};
