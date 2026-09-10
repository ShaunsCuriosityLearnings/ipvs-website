import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-300 text-xs leading-relaxed space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-slate-800 pb-6 mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>LEGAL POLICY</span>
        </div>
        <h1 className="text-3xl font-bold text-white font-heading">Privacy Policy</h1>
        <p className="text-slate-400 text-xs">Official Privacy Notice for IPVS Exhibition (Orbit Exhibitions Pvt Ltd)</p>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white font-heading">Who We Are</h2>
        <p>Our website address is: <strong className="text-cyan-400">https://ipvs.in</strong>. IPVS is organized by Orbit Exhibitions Pvt Ltd, headquartered in Mumbai, India.</p>

        <h2 className="text-sm font-bold text-white font-heading">Data Collection & Registration Information</h2>
        <p>When visitors register for trade passes or stall spaces on our website, we collect the personal data provided in the form (Name, Organization Email, Company, Designation, Mobile Number, City, and Country) along with visitor IP address and browser user agent string to prevent spam.</p>

        <h2 className="text-sm font-bold text-white font-heading">Cookies & Tracking</h2>
        <p>We use essential cookies to maintain user session choices and visitor registration preferences. Google Analytics (GA4) and Google Tag Manager are enabled to monitor website performance and traffic without harvesting sensitive personal records.</p>

        <h2 className="text-sm font-bold text-white font-heading">Data Rights</h2>
        <p>You may request an exported file of the personal data we hold about you or request that we erase your registration records by contacting <strong className="text-cyan-400">info@orbitexhibitions.com</strong>.</p>
      </div>
    </div>
  );
};
