import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ExhibitorPage } from './pages/ExhibitorPage';
import { SmartValvePage } from './pages/SmartValvePage';
import { SmartPumpPage } from './pages/SmartPumpPage';
import { VisitorPage } from './pages/VisitorPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AdvisoryPage } from './pages/AdvisoryPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { RegistrationModal } from './components/forms/RegistrationModal';
import { MessageSquare, ArrowUp } from 'lucide-react';

function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'exhibitor' | 'visitor' | 'contact'>('exhibitor');
  const [selectedSqm, setSelectedSqm] = useState(18);
  const navigate = useNavigate();

  const handleOpenModal = (mode: 'exhibitor' | 'visitor' | 'contact') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'smart-valves') {
      navigate('/smart-valve-automation');
    } else if (sectionId === 'smart-pumps') {
      navigate('/smart-iot-pumps');
    } else if (sectionId === 'calculator' || sectionId === 'exhibitor') {
      navigate('/exhibitor');
    } else if (sectionId === 'about') {
      navigate('/about-us');
    } else if (sectionId === 'visitor') {
      navigate('/visitor');
    } else if (sectionId === 'blogs') {
      navigate('/blogs');
    } else if (sectionId === 'advisory') {
      navigate('/advisory-board');
    } else if (sectionId === 'contact') {
      navigate('/contact-us');
    } else {
      navigate('/');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] text-slate-800 selection:bg-[#1E65FF] selection:text-white font-sans relative flex flex-col justify-between">
      <ScrollToTop />

      
      {/* Header */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Multi-Page Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onOpenModal={handleOpenModal} onNavigateToSection={handleNavigateToSection} />} />
          <Route path="/about-us" element={<AboutUsPage onOpenModal={handleOpenModal} />} />
          <Route path="/exhibitor" element={<ExhibitorPage onOpenModal={handleOpenModal} />} />
          <Route path="/smart-valve-automation" element={<SmartValvePage onOpenModal={handleOpenModal} />} />
          <Route path="/smart-iot-pumps" element={<SmartPumpPage onOpenModal={handleOpenModal} />} />
          <Route path="/visitor" element={<VisitorPage onOpenModal={handleOpenModal} />} />
          <Route path="/blogs" element={<BlogsPage onOpenModal={handleOpenModal} />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage onOpenModal={handleOpenModal} />} />
          <Route path="/advisory-board" element={<AdvisoryPage onOpenModal={handleOpenModal} />} />
          <Route path="/contact-us" element={<ContactUsPage onOpenModal={handleOpenModal} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="*" element={<HomePage onOpenModal={handleOpenModal} onNavigateToSection={handleNavigateToSection} />} />
        </Routes>
      </main>


      {/* Footer */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Interactive Registration Modal */}
      <RegistrationModal 
        isOpen={modalOpen} 
        mode={modalMode} 
        initialSqm={selectedSqm}
        onClose={() => setModalOpen(false)} 
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <button
          onClick={() => handleOpenModal('contact')}
          className="p-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-950/50 hover:scale-110 transition-transform flex items-center justify-center group"
          aria-label="Live Helpdesk"
          title="Open Helpdesk"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
            Ask Event Desk
          </span>
        </button>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center justify-center shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
