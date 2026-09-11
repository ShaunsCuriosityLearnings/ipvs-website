import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Plus, Minus, PhoneCall, Mail } from 'lucide-react';
import { FAQS } from '../../data/ipvsData';

interface FaqAccordionProps {
  onOpenModal: (mode: 'exhibitor' | 'visitor' | 'contact') => void;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ onOpenModal }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Venue & Timings', 'Exhibitors', 'Visitors', 'General'];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-8 sm:py-10 bg-white text-slate-800 border-t border-slate-200/60">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about IPVS 2026 dates, stall registration, visitor passes, and venue guidelines.
          </p>
        </div>

        {/* 2-Column Split Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Need Help? Card (Clean Borderless Soft Elevation) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-4 text-left">
            <div className="relative h-40 rounded-xl overflow-hidden bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=450&q=70" 
                alt="Need Help Contact Support"
                className="w-full h-full object-cover" 
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00D2FF]">IPVS Helpdesk</span>
                <h4 className="text-base font-extrabold font-heading">Need Direct Assistance?</h4>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-extrabold text-slate-900 font-heading">Need Help?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team is ready to assist you with custom stall sizes, technical equipment requirements, and visitor badge inquiries.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#1E65FF]" />
                <span className="font-semibold">+91 22 2410 2801</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#1E65FF]" />
                <span className="font-semibold">info@orbitexhibitions.com</span>
              </div>
            </div>

            <button 
              onClick={() => onOpenModal('contact')}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-[#1E65FF] transition-all shadow-md flex items-center justify-center uppercase tracking-wider"
            >
              Contact Support
            </button>
          </div>

          {/* Right Column: Accordion Questions */}
          <div className="lg:col-span-8 space-y-3 text-left">
            
            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
              <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[#F1F5F9] border border-slate-200/80 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#1E65FF] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                />
              </div>
            </div>

            {/* Accordion Cards: Dynamic Left-Accent on Active Items */}
            <div className="space-y-2.5">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className={`rounded-2xl transition-all overflow-hidden ${
                      isOpen 
                        ? 'bg-white border-l-4 border-l-[#1E65FF] border-y-0 border-r-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]' 
                        : 'bg-[#F8FAFC] border border-slate-200/70 hover:bg-white hover:border-[#1E65FF]/40 shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between text-slate-900 font-bold text-xs sm:text-sm font-heading"
                    >
                      <span className="flex items-center space-x-2.5 pr-4">
                        <HelpCircle className="w-4 h-4 text-[#1E65FF] shrink-0" />
                        <span>{faq.question}</span>
                      </span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#1E65FF] shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
