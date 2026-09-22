import React, { useState, useEffect } from 'react';
import { ESTEEMED_EXHIBITORS, ExhibitorItem } from '../data/ipvsData';
import { buildTrackingUrl } from '../utils/attribution';
import { 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Building2, 
  FileSpreadsheet, 
  Layers, 
  Filter,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface ChannelConfig {
  id: string;
  label: string;
  medium: string;
  defaultContentSuffix: string;
}

const CHANNELS: ChannelConfig[] = [
  { id: 'qr', label: 'Exhibitor Creative QR Code', medium: 'exhibitor_invite', defaultContentSuffix: '' },
  { id: 'whatsapp', label: 'WhatsApp Broadcast', medium: 'whatsapp', defaultContentSuffix: 'whatsapp_broadcast' },
  { id: 'linkedin', label: 'LinkedIn Campaign', medium: 'linkedin', defaultContentSuffix: 'linkedin_social' },
  { id: 'email', label: 'Email Newsletter Invite', medium: 'email', defaultContentSuffix: 'email_invite' },
  { id: 'print', label: 'Print Magazine / Flyer', medium: 'print', defaultContentSuffix: 'print_creative' }
];

const AUTH_KEY = 'ipvs_generator_auth_token';
const VALID_PASSKEYS = ['ipvs2026', 'orbit2026'];

export const InviteGeneratorPage: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Generator State
  const [selectedExhibitorId, setSelectedExhibitorId] = useState<string>(ESTEEMED_EXHIBITORS[0]?.id || 'ex-1');
  const [selectedChannel, setSelectedChannel] = useState<string>('qr');
  const [campaign, setCampaign] = useState<string>('ipvs2026');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passkeyInput.trim().toLowerCase();
    if (VALID_PASSKEYS.includes(cleanInput)) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setAuthError(false);
      setPasskeyInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPasskeyInput('');
  };

  const currentExhibitor: ExhibitorItem = 
    ESTEEMED_EXHIBITORS.find(e => e.id === selectedExhibitorId) || ESTEEMED_EXHIBITORS[0];

  const currentChannelObj = CHANNELS.find(c => c.id === selectedChannel) || CHANNELS[0];

  const currentStallSlug = (currentExhibitor.stall || currentExhibitor.booth || 'stall')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_');

  const contentValue = currentChannelObj.defaultContentSuffix
    ? `${currentStallSlug}_${currentChannelObj.defaultContentSuffix}`
    : currentStallSlug;

  const currentTrackingUrl = buildTrackingUrl({
    source: currentExhibitor.slug || currentExhibitor.id,
    medium: currentChannelObj.medium,
    campaign: campaign || 'ipvs2026',
    content: contentValue,
    baseUrl: typeof window !== 'undefined' ? `${window.location.origin}/visit` : 'https://ipvs.in/visit'
  });

  const productionTrackingUrl = buildTrackingUrl({
    source: currentExhibitor.slug || currentExhibitor.id,
    medium: currentChannelObj.medium,
    campaign: campaign || 'ipvs2026',
    content: contentValue,
    baseUrl: 'https://ipvs.in/visit'
  });

  // QR Code Image URL (1000x1000 High Resolution)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(productionTrackingUrl)}&margin=10`;

  const handleCopy = (textToCopy: string, identifier: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedUrl(identifier);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDownloadQr = async (exhibitorName: string, qrUrl: string) => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const safeName = exhibitorName.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `IPVS2026_QR_${safeName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(qrUrl, '_blank');
    }
  };

  const handleExportCsv = () => {
    const rows = [
      ['Exhibitor Name', 'Stall Number', 'Sector', 'UTM Source', 'UTM Medium', 'UTM Content', 'Tracked VIP URL', 'QR Code Download URL']
    ];

    ESTEEMED_EXHIBITORS.forEach(ex => {
      const stallSlug = (ex.stall || ex.booth || 'stall').toLowerCase().replace(/[^a-z0-9]/g, '_');
      const url = buildTrackingUrl({
        source: ex.slug || ex.id,
        medium: 'exhibitor_invite',
        campaign: 'ipvs2026',
        content: stallSlug,
        baseUrl: 'https://ipvs.in/visit'
      });
      const qrLink = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(url)}`;
      rows.push([ex.name, ex.stall || ex.booth, ex.sector, ex.slug || ex.id, 'exhibitor_invite', stallSlug, url, qrLink]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(cell => `"${cell}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'IPVS2026_Exhibitor_Tracking_Links.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredExhibitors = ESTEEMED_EXHIBITORS.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ex.stall && ex.stall.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ex.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==========================================================
  // LOCK SCREEN VIEW: WHEN NOT AUTHENTICATED
  // ==========================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-4 selection:bg-[#1E65FF] selection:text-white">
        <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-6">
          
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border border-slate-200">
            <Lock className="w-6 h-6 text-[#1E65FF]" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-extrabold text-slate-900 font-heading">
              Orbit Exhibitions Internal Access
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter the security passkey to access the IPVS 2026 Exhibitor Tracking & QR Generator.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Security Passkey:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passkeyInput}
                  onChange={(e) => { setPasskeyInput(e.target.value); setAuthError(false); }}
                  placeholder="Enter passkey..."
                  className={`w-full pl-3.5 pr-10 py-3 rounded-xl bg-slate-50 border text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 ${
                    authError ? 'border-red-500 focus:ring-red-400' : 'border-slate-300 focus:ring-[#1E65FF]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <p className="text-[11px] font-semibold text-red-600 flex items-center space-x-1 pt-1">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>Invalid passkey. Access restricted.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#1E65FF] hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider shadow transition-colors flex items-center justify-center space-x-2"
            >
              <span>Unlock Generator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 border-t border-slate-100 pt-4">
            Authorized Personnel Only • IPVS 2026 Admin Utility
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // DASHBOARD VIEW: WHEN AUTHENTICATED
  // ==========================================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-20 sm:pt-24 pb-16 selection:bg-[#1E65FF] selection:text-white text-left">
      
      {/* Top Header Bar */}
      <div className="bg-[#0A192F] text-white border-b border-slate-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 mb-6 shadow-md">
        <div className="max-w-[98%] 2xl:max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <QrCode className="w-4 h-4" />
              <span>IPVS 2026 Internal Utility</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight">
              Exhibitor QR & Tracking URL Generator
            </h1>
            <p className="text-xs text-slate-400">
              Generate scannable QR codes and unique UTM attribution links for all 20 confirmed exhibitors.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors shadow flex items-center space-x-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#1E65FF]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center space-x-1.5"
              title="Lock portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-[98%] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* =======================================================
            CONFIGURATOR & PREVIEW CARDS (COMPACT ROW-WISE)
            ======================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Form (Left Column) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-extrabold text-slate-900 font-heading uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#1E65FF]" />
                <span>Configure Invitation Link</span>
              </h2>
              <span className="text-[11px] font-bold text-slate-400">
                {ESTEEMED_EXHIBITORS.length} Exhibitors
              </span>
            </div>

            {/* Exhibitor Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Exhibitor:
              </label>
              <select
                value={selectedExhibitorId}
                onChange={(e) => setSelectedExhibitorId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
              >
                {ESTEEMED_EXHIBITORS.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name} — {ex.stall || ex.booth} ({ex.sector})
                  </option>
                ))}
              </select>
            </div>

            {/* Channel Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Target Marketing Channel:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChannel(ch.id)}
                    className={`p-2 rounded-xl text-xs font-bold text-left transition-all border ${
                      selectedChannel === ch.id
                        ? 'bg-[#1E65FF] text-white border-[#1E65FF] shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="block truncate">{ch.label}</span>
                    <span className={`text-[10px] font-mono block ${selectedChannel === ch.id ? 'text-blue-100' : 'text-slate-400'}`}>
                      {ch.medium}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign & Stall Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Campaign (utm_campaign):
                </label>
                <input
                  type="text"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Content / Stall (utm_content):
                </label>
                <input
                  type="text"
                  value={contentValue}
                  readOnly
                  className="w-full p-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-600 select-all"
                />
              </div>
            </div>

            {/* Live Tracked URL */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Tracked Destination URL:
              </label>
              <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-xs text-cyan-300 break-all select-all shadow-inner border border-slate-800">
                {productionTrackingUrl}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => handleCopy(productionTrackingUrl, 'main_url')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#1E65FF] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center space-x-1.5"
              >
                {copiedUrl === 'main_url' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl === 'main_url' ? 'Copied' : 'Copy URL'}</span>
              </button>

              <button
                onClick={() => handleDownloadQr(currentExhibitor.name, qrImageUrl)}
                className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-cyan-300" />
                <span>Download QR</span>
              </button>

              <a
                href={currentTrackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
                title="Open live test page"
              >
                <span>Test</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>


          {/* Live QR Preview Card (Right Column) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4 text-center">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 font-heading">
                QR Preview
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                1000 × 1000 px
              </span>
            </div>

            {/* Simulated Brochure Creative Preview */}
            <div className="bg-[#0A192F] text-white p-5 rounded-2xl shadow-md space-y-4 border border-slate-800">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="text-left">
                  <span className="text-[9px] uppercase font-bold text-cyan-300 block">Inviting Exhibitor</span>
                  <h3 className="text-xs font-extrabold text-white truncate max-w-[170px]">{currentExhibitor.name}</h3>
                </div>
                <div className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-mono font-bold">
                  {currentExhibitor.stall || currentExhibitor.booth}
                </div>
              </div>

              {/* QR Image */}
              <div className="p-3 bg-white rounded-xl shadow max-w-[200px] mx-auto aspect-square flex items-center justify-center">
                <img
                  src={qrImageUrl}
                  alt={`QR Code for ${currentExhibitor.name}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                SCAN TO REGISTER • IPVS 2026
              </p>
            </div>

            <p className="text-[11px] text-slate-500">
              Embed this QR code in print brochures, standees, and social posters.
            </p>
          </div>

        </div>


        {/* =======================================================
            MASTER DIRECTORY OF ALL EXHIBITORS
            ======================================================= */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-heading">
                Confirmed Exhibitor Links Directory
              </h2>
              <p className="text-xs text-slate-500">
                Direct URLs and QR code assets for all registered exhibitors.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search company or stall..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1E65FF]"
              />
            </div>
          </div>

          {/* Directory Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Exhibitor</th>
                  <th className="py-2.5 px-3">Stall</th>
                  <th className="py-2.5 px-3">UTM Source</th>
                  <th className="py-2.5 px-3">Tracked Invitation URL</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredExhibitors.map((ex) => {
                  const stallSlug = (ex.stall || ex.booth || 'stall').toLowerCase().replace(/[^a-z0-9]/g, '_');
                  const exUrl = buildTrackingUrl({
                    source: ex.slug || ex.id,
                    medium: 'exhibitor_invite',
                    campaign: 'ipvs2026',
                    content: stallSlug,
                    baseUrl: 'https://ipvs.in/visit'
                  });
                  const exQr = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(exUrl)}&margin=10`;

                  return (
                    <tr key={ex.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={ex.logo}
                            alt={ex.name}
                            className="w-7 h-7 rounded-lg object-contain p-0.5 border border-slate-200 bg-white shrink-0"
                          />
                          <span className="font-bold text-slate-900 truncate max-w-[180px] sm:max-w-xs">{ex.name}</span>
                        </div>
                      </td>

                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1E65FF] font-bold font-mono text-[10px]">
                          {ex.stall || ex.booth}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                        {ex.slug || ex.id}
                      </td>

                      <td className="py-2.5 px-3 max-w-xs">
                        <span className="font-mono text-[10px] text-slate-500 truncate block select-all">
                          {exUrl}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => handleCopy(exUrl, ex.id)}
                            className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Copy Link"
                          >
                            {copiedUrl === ex.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>

                          <button
                            onClick={() => handleDownloadQr(ex.name, exQr)}
                            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                            title="Download QR"
                          >
                            <Download className="w-3 h-3 text-cyan-300" />
                          </button>

                          <a
                            href={buildTrackingUrl({
                              source: ex.slug || ex.id,
                              medium: 'exhibitor_invite',
                              campaign: 'ipvs2026',
                              content: stallSlug,
                              baseUrl: typeof window !== 'undefined' ? `${window.location.origin}/visit` : 'https://ipvs.in/visit'
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Test Page"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
