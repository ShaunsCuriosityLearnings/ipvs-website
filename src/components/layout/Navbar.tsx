import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Building2,
  ChevronDown,
  Menu,
  X,
  Download,
  CheckCircle2,
  Layers,
  Users,
  Cpu,
  Calendar,
  MapPin,
  PhoneCall,
  ArrowRight,
  Ticket
} from 'lucide-react';
import { getMediaUrl } from '../../utils/media';
import { EVENT_DETAILS } from '../../data/ipvsData';

interface NavbarProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exhibitorDropdownOpen, setExhibitorDropdownOpen] = useState(false);
  const [visitorDropdownOpen, setVisitorDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setExhibitorDropdownOpen(false);
    setVisitorDropdownOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
      ? 'py-3.5 bg-gradient-to-r from-[#111183]/95 to-[#0e89d0]/95 backdrop-blur-xl border-b border-white/10 shadow-xl'
      : 'py-3.5 bg-gradient-to-r from-[#111183]/95 to-[#0e89d0]/95 backdrop-blur-xl border-b border-white/10'
      }`}>
      {/* Top Banner Announcement Strip */}
      <div className="hidden lg:block border-b border-white/10 pb-2 mb-2">
        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 flex justify-between items-center text-xs text-slate-300">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[#00D2FF] font-medium">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {EVENT_DETAILS.dates}
            </span>
            <span className="flex items-center text-slate-200">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              {EVENT_DETAILS.venue}, Hyderabad
            </span>
            <span className="text-emerald-400 font-medium flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              100+ Exhibitors • +7000 Visitors
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={`tel:${EVENT_DETAILS.phone}`} className="hover:text-[#00D2FF] transition-colors flex items-center">
              <PhoneCall className="w-3 h-3 mr-1" />
              {EVENT_DETAILS.phone}
            </a>
            <span className="text-slate-600">|</span>
            <a href={`mailto:${EVENT_DETAILS.email}`} className="hover:text-[#00D2FF] transition-colors">
              {EVENT_DETAILS.email}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between">

          {/* Logo + Brand Text */}
          <Link to="/" onClick={closeMenus} className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group">
            <img 
              src={getMediaUrl("/ipvs_logo.jpg")} 
              alt="IPVS 2026 Logo" 
              className="h-10 sm:h-12 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform bg-white/5 p-1 border border-white/10 flex-shrink-0" 
            />
            <div className="flex flex-col justify-center">
              <span className="font-heading font-extrabold text-base sm:text-lg text-white tracking-wide leading-none group-hover:text-[#00D2FF] transition-colors">
                IPVS
              </span>
              <span className="text-[9px] sm:text-[11px] font-semibold text-slate-300 tracking-tight leading-tight mt-0.5 max-w-[150px] sm:max-w-[240px]">
                Industrial Pumps Valves and Systems Exhibition
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${isActive ? 'text-white bg-[#1E65FF]' : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
            >
              Home
            </NavLink>

            <NavLink
              to="/about-us"
              className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${isActive ? 'text-white bg-[#1E65FF]' : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
            >
              About Us
            </NavLink>

            {/* Exhibitors Dropdown */}
            <div className="relative" onMouseEnter={() => setExhibitorDropdownOpen(true)} onMouseLeave={() => setExhibitorDropdownOpen(false)}>
              <NavLink
                to="/exhibitor"
                className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center ${isActive ? 'text-white bg-[#1E65FF]' : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
              >
                Exhibitors
                <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
              </NavLink>
            </div>

            {/* Visitors Dropdown */}
            <div className="relative" onMouseEnter={() => setVisitorDropdownOpen(true)} onMouseLeave={() => setVisitorDropdownOpen(false)}>
              <NavLink
                to="/visitor"
                className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center ${isActive ? 'text-white bg-[#1E65FF]' : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
              >
                Visitors
                <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
              </NavLink>
            </div>


            <NavLink
              to="/blogs"
              className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${isActive ? 'text-white bg-[#1E65FF]' : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
            >
              Blogs
            </NavLink>

            <NavLink
              to="/contact-us"
              className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${isActive ? 'text-white bg-[#1E65FF]' : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
            >
              Contact
            </NavLink>
          </nav>


          {/* Desktop Right CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={EVENT_DETAILS.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center shadow-sm"
            >
              <Download className="w-3.5 h-3.5 mr-1.5 text-[#00D2FF]" />
              Brochure
            </a>

            <button
              onClick={() => onOpenModal('visitor')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1E65FF] hover:bg-[#0D47A1] transition-all flex items-center shadow-lg shadow-[#1E65FF]/30"
            >
              <Ticket className="w-4 h-4 mr-1.5" />
              Get Tickets
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => onOpenModal('visitor')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#1E65FF]"
            >
              Get Tickets
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white bg-white/10 border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#111183] to-[#0e89d0] border-b border-white/10 px-4 pt-4 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <Link to="/" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">Home</Link>
          <Link to="/about-us" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">About Event</Link>
          <Link to="/exhibitor" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">Exhibitors & Pricing</Link>
          <Link to="/smart-valve-automation" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">Smart Valves</Link>
          <Link to="/smart-iot-pumps" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">Smart IoT Pumps</Link>
          <Link to="/visitor" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">Visitors</Link>
          <Link to="/blogs" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">Blogs & Insights</Link>
          <Link to="/advisory-board" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">Advisory Board</Link>
          <Link to="/contact-us" onClick={closeMenus} className="block px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-[#1E65FF] rounded-lg">Contact Us</Link>


          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
            <button onClick={() => { onOpenModal('visitor'); closeMenus(); }} className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#1E65FF]">Get Tickets</button>
            <button onClick={() => { onOpenModal('exhibitor'); closeMenus(); }} className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#00D2FF] bg-white/10 border border-white/10">Book Stall</button>
          </div>
        </div>
      )}
    </header>
  );
};
