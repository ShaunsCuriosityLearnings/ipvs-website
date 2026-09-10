import React from 'react';
import { MapPin, Navigation, Send, PhoneCall, Mail } from 'lucide-react';
import { EVENT_DETAILS } from '../../data/ipvsData';

interface GalleryAndVenueSectionProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const GalleryAndVenueSection: React.FC<GalleryAndVenueSectionProps> = ({ onOpenModal }) => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <section className="py-20 bg-white text-slate-800">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-20">
        
        {/* Photo Gallery Grid */}
        <div className="space-y-10 text-center">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
              <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
              <span>Expo Moments</span>
              <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
              Our Events Gallery
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className="relative rounded-2xl overflow-hidden shadow-md group h-48 sm:h-64"
              >
                <img 
                  src={img} 
                  alt="Gallery" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-[#1E65FF]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Venue & Registration Cards (Matching Eventik UI Mockup bottom section) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* Card 1: Get Direction To The Event Venue */}
          <div className="bg-[#F4F7FE] rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#1E65FF]/10 text-[#1E65FF] text-xs font-bold uppercase inline-block">
                Location Map
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                Get Direction To The Event Venue
              </h3>
              <p className="text-xs text-slate-600">
                HITEX Exhibition Center, Izzat Nagar, Hyderabad – 500 084, Telangana, India. Easily accessible from Rajiv Gandhi International Airport & Hyderabad Metro.
              </p>

              {/* Map Placeholder Graphic */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-300 h-44 bg-slate-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" 
                  alt="Hyderabad Map Preview" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[#0A192F]/40 flex items-center justify-center">
                  <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold text-[#1E65FF]">
                    <MapPin className="w-5 h-5 text-rose-500 fill-current" />
                    <span>HITEX Center, Hyderabad</span>
                  </div>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com/?q=HITEX+Exhibition+Center+Hyderabad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#1E65FF] text-white font-bold text-xs hover:bg-[#0D47A1] transition-colors flex items-center justify-center shadow-md"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Open Google Maps
            </a>
          </div>

          {/* Card 2: Get Join Our Event */}
          <div className="bg-[#1E65FF] text-white rounded-3xl p-8 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase inline-block">
                Quick RSVP
              </span>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Get Join Our Event
              </h3>
              <p className="text-xs text-slate-200">
                Register instantly to secure your free trade visitor pass or request an exhibitor stall callback from Orbit Exhibitions.
              </p>

              <div className="space-y-3 pt-2">
                <input 
                  type="text" 
                  placeholder="Your Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input 
                  type="email" 
                  placeholder="Your Work Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <button 
              onClick={() => onOpenModal('visitor')}
              className="w-full py-3.5 rounded-xl bg-white text-[#1E65FF] font-extrabold text-xs hover:bg-slate-100 transition-colors flex items-center justify-center shadow-lg"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Quick Pass
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
