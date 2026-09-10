import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-300 text-xs leading-relaxed space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-6 mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>TERMS & CONDITIONS</span>
        </div>
        <h1 className="text-3xl font-bold text-white font-heading">Terms and Conditions of Participation</h1>
        <p className="text-slate-400 text-xs">Official Terms governing Exhibitors & Visitors at IPVS 2026</p>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-heading">1. Definitions</h2>
        <p><strong>"Client / Exhibitor"</strong> means any participant, exhibitor, or associate booking stall space. <strong>"Organiser"</strong> means Orbit Exhibitions Pvt Ltd. <strong>"Event"</strong> means IPVS 2026 at HITEX Hyderabad.</p>

        <h2 className="text-sm font-bold text-white font-heading">2. Stall Participation & Amenities</h2>
        <p><strong>Built-up Shell Scheme Stalls:</strong> Include Octanorm partition walls, fascia name board, carpeting, 1 table, 2 chairs, 1 waste bin, 3 LED spotlights, and one 5-Amp power socket. Additional power, water, or heavy rigging services are charged extra as per the exhibitor manual.</p>

        <h2 className="text-sm font-bold text-white font-heading">3. Booking & Payment Terms</h2>
        <p>Space reservations are confirmed upon receipt of the initial booking amount. All invoices attract 18% GST as per prevailing Indian tax regulations. Balance payments must be settled prior to show setup.</p>

        <h2 className="text-sm font-bold text-white font-heading">4. Force Majeure & Jurisdiction</h2>
        <p>In cases of force majeure (natural calamities, strikes, government directives), the organisers reserve the right to revise event dates or venue. All disputes are subject to the exclusive jurisdiction of Mumbai courts.</p>
      </div>
    </div>
  );
};
