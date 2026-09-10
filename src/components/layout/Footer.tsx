import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Calendar, Globe, Send, ArrowRight } from 'lucide-react';
import { getMediaUrl } from '../../utils/media';
import { EVENT_DETAILS } from '../../data/ipvsData';

interface FooterProps {
  onOpenModal?: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {

  return (
    <footer className="bg-[#0A192F] text-slate-300 relative border-t border-white/10 pt-16 pb-8">
      
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-12">
        
        {/* Top Newsletter Strip (Eventik Theme) */}
        <div className="bg-[#1E65FF] rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white font-heading">
              Never Miss Another Speaker & Event Announcement
            </h3>
            <p className="text-xs text-slate-100">
              Subscribe to the official IPVS 2026 newsletter for exhibitor updates & visitor passes.
            </p>
          </div>

          <div className="w-full md:w-auto flex items-center bg-white rounded-2xl p-1.5 shadow-md">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="px-4 py-2 bg-transparent text-slate-900 placeholder-slate-400 text-xs focus:outline-none w-full sm:w-64"
            />
            <button className="px-5 py-2.5 rounded-xl bg-[#0A192F] text-white font-bold text-xs hover:bg-[#0D47A1] transition-colors flex items-center whitespace-nowrap">
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-left text-xs">
          
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={getMediaUrl("/ipvs_logo.jpg")} 
                alt="IPVS 2026 Logo" 
                className="h-12 w-auto object-contain rounded-lg p-1 bg-white/5 border border-white/10 flex-shrink-0" 
              />
              <div className="flex flex-col justify-center">
                <span className="font-heading font-extrabold text-lg text-white tracking-wide leading-none">
                  IPVS
                </span>
                <span className="text-[11px] font-semibold text-slate-300 tracking-tight leading-tight mt-0.5 max-w-[240px]">
                  Industrial Pumps Valves and Systems Exhibition
                </span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed pr-4">
              India's Premier Industrial Pumps, Valves & Process Systems Exhibition at HITEX Exhibition Center, Hyderabad. Focused on Ethanol, Pharma & Water Sectors. Organized by Orbit Exhibitions Pvt. Ltd.
            </p>
            <div className="flex items-center space-x-4 pt-2 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E65FF] hover:text-white transition-colors">FB</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E65FF] hover:text-white transition-colors">LN</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E65FF] hover:text-white transition-colors">TW</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1E65FF] hover:text-white transition-colors">YT</a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home Page</Link></li>
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Exhibition</Link></li>
              <li><Link to="/exhibitor" className="hover:text-white transition-colors">Exhibitor Stall Pricing</Link></li>
              <li><Link to="/visitor" className="hover:text-white transition-colors">Visitor Pass Pre-Reg</Link></li>
              <li><Link to="/advisory-board" className="hover:text-white transition-colors">Advisory Board</Link></li>
            </ul>
          </div>

          {/* Col 3: Focus Technologies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Focus Sectors</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/smart-valve-automation" className="hover:text-white transition-colors">Smart Valves & Actuators</Link></li>
              <li><Link to="/smart-iot-pumps" className="hover:text-white transition-colors">IoT Industrial Pumps</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Ethanol & Biofuel Plants</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Water Treatment & STP</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pharma & Chemical Process</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Contact Details</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-[#1E65FF] mr-2 flex-shrink-0 mt-0.5" />
                <span>Orbit Exhibitions Pvt. Ltd., Mumbai, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-[#1E65FF] mr-2 flex-shrink-0" />
                <span>{EVENT_DETAILS.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-[#1E65FF] mr-2 flex-shrink-0" />
                <span>{EVENT_DETAILS.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 IPVS Expo & Orbit Exhibitions. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>

    </footer>
  );
};
