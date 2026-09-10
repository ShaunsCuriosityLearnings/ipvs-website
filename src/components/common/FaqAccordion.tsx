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
    <section className="py-10 sm:py-14 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#1E65FF] text-xs font-bold tracking-widest uppercase">
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <span className="w-6 h-0.5 bg-[#1E65FF]"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about IPVS 2026 dates, stall registration, visitor passes, and venue guidelines.
          </p>
        </div>

        {/* 2-Column Split Grid matching Attached Image 3 */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Need Help? Card (Matching Attached Image 3 Layout) */}
          <div className="lg:col-span-4 bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 text-left">
            <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=450&q=70" 
                alt="Need Help Contact Support"
                className="w-full h-full object-cover" 
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">IPVS Helpdesk</span>
                <h4 className="text-lg font-extrabold font-heading">Need Direct Assistance?</h4>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-slate-900 font-heading">Need Help?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team is ready to assist you with custom stall sizes, technical equipment requirements, and visitor badge inquiries.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-[#1E65FF]" />
                <span className="font-semibold">+91 22 2410 2801</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#1E65FF]" />
                <span className="font-semibold">info@orbitexhibitions.com</span>
              </div>
            </div>

            <button 
              onClick={() => onOpenModal('contact')}
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-[#1E65FF] transition-all shadow-md flex items-center justify-center uppercase tracking-wider"
            >
              Contact Support
            </button>
          </div>

          {/* Right Column: Accordion Questions */}
          <div className="lg:col-span-8 space-y-4 text-left">
            
            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[#F1F5F9] border border-slate-200 w-full sm:w-auto">
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

              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                />
              </div>
            </div>

            {/* Accordion Cards */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm hover:border-[#1E65FF]/40"
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full text-left p-5 flex items-center justify-between text-slate-900 font-bold text-sm sm:text-base font-heading"
                    >
                      <span className="flex items-center space-x-3 pr-4">
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
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/80 pt-3 animate-in fade-in duration-200">
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
