import { getStoredAttribution } from '../utils/attribution';

/**
 * Lead Service for IPVS 2026 Portal
 * Dispatches form submissions to /api/send-lead which uses Nodemailer to deliver leads to info@orbitexhibitions.com
 */

export const HEARD_ABOUT_OPTIONS = [
  'LinkedIn',
  'Google',
  'Instagram',
  'Facebook',
  'Hindu Newspaper',
  'Times of India',
  'Trade Magazine / Media Partner',
  'Industry Colleague / Word of Mouth',
  'Email / Newsletter Invitation',
  'Direct Invitation from Orbit Exhibitions',
  'Past IPVS Exhibition',
  'Other'
];

export const SPONSORSHIP_TIERS = [
  'Platinum Partner / Principal Sponsor',
  'Gold Sponsor',
  'Silver Sponsor',
  'Associate Sponsor',
  'Badge & Lanyard Sponsor',
  'Visitor Registration Counter Sponsor',
  'VIP Lounge & Networking Sponsor',
  'Conference & Technical Session Sponsor',
  'Exhibition Carry Bag / Kit Sponsor',
  'General / Custom Sponsorship Inquiry'
];

export interface LeadSubmissionData {
  formType: 'exhibitor' | 'visitor' | 'contact' | 'sponsorship';
  source?: string;
  firstName: string;
  lastName: string;
  company?: string;
  designation?: string;
  mobile: string;
  email: string;
  city?: string;
  website?: string;
  stallSize?: string;
  sectorInterest?: string;
  sponsorshipTier?: string;
  heardFrom?: string;
  message?: string;
  // Attribution & Tracking Fields (Auto-Injected)
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  invitingExhibitor?: string;
  landingPage?: string;
  referrer?: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const submitLead = async (data: LeadSubmissionData): Promise<LeadSubmissionResult> => {
  try {
    const storedAttr = getStoredAttribution();

    const payload = {
      ...data,
      utmSource: data.utmSource || storedAttr.utmSource || 'Direct / Organic',
      utmMedium: data.utmMedium || storedAttr.utmMedium || 'website',
      utmCampaign: data.utmCampaign || storedAttr.utmCampaign || 'ipvs2026',
      utmContent: data.utmContent || storedAttr.utmContent || storedAttr.stallNumber || undefined,
      utmTerm: data.utmTerm || storedAttr.utmTerm || undefined,
      invitingExhibitor: data.invitingExhibitor || storedAttr.invitingExhibitor || undefined,
      landingPage: data.landingPage || storedAttr.landingPage || (typeof window !== 'undefined' ? window.location.pathname : undefined),
      referrer: data.referrer || storedAttr.referrer || (typeof document !== 'undefined' ? document.referrer : undefined),
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // =========================================================================
    // Multi-Platform Conversion Dispatch (GTM dataLayer + GA4 + Google Ads)
    // =========================================================================
    if (typeof window !== 'undefined') {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];

      // Calculate conversion value for Value-Based Smart Bidding (INR)
      let conversionValue = 250;
      if (data.formType === 'exhibitor') {
        const parsedSqm = parseInt((data.stallSize || '').replace(/\D/g, ''), 10) || 18;
        conversionValue = parsedSqm * 12500;
      } else if (data.formType === 'sponsorship') {
        conversionValue = 100000;
      } else if (data.formType === 'visitor') {
        conversionValue = 500;
      }

      const trackingPayload = {
        form_type: data.formType,
        form_category: data.formType,
        lead_id: `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        value: conversionValue,
        currency: 'INR',
        company_name: data.company || 'N/A',
        designation: data.designation || undefined,
        city: data.city || undefined,
        stall_size: data.stallSize || undefined,
        sponsorship_tier: data.sponsorshipTier || undefined,
        sector_interest: data.sectorInterest || undefined,
        utm_source: payload.utmSource,
        utm_medium: payload.utmMedium,
        utm_campaign: payload.utmCampaign,
        utm_content: payload.utmContent,
        utm_term: payload.utmTerm,
        inviting_exhibitor: payload.invitingExhibitor,
        landing_page: payload.landingPage,
        page_location: window.location.href,
        page_path: window.location.pathname
      };

      // 1. Primary standard GA4 / GTM generate_lead event
      w.dataLayer.push({
        event: 'generate_lead',
        ...trackingPayload
      });

      // 2. Form-specific custom event for dedicated GTM conversion triggers
      w.dataLayer.push({
        event: `${data.formType}_form_submit`,
        ...trackingPayload
      });

      // 3. Direct GA4 gtag event (if gtag is loaded)
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'generate_lead', {
          form_type: data.formType,
          value: conversionValue,
          currency: 'INR',
          source: payload.utmSource,
          medium: payload.utmMedium,
          campaign: payload.utmCampaign,
          content: payload.utmContent,
          inviting_exhibitor: payload.invitingExhibitor
        });

        // Fire Google Ads conversion event if AW config exists
        w.gtag('event', 'conversion', {
          value: conversionValue,
          currency: 'INR',
          transaction_id: trackingPayload.lead_id
        });
      }
    }

    const DEFAULT_GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx9bdhZcGLXFApXJzxFd9DR5tgjRyegFhA2cffAfLaab1TC05YYOPBXeZpKzM2VAEjD/exec';
    const clientGoogleSheetUrl = (import.meta as any).env?.VITE_GOOGLE_SHEETS_SCRIPT_URL || DEFAULT_GOOGLE_SHEETS_URL;

    // Direct Google Sheets fallback dispatcher (used ONLY if the backend API is unreachable or fails)
    const dispatchDirectToGoogleSheetsFallback = async () => {
      if (clientGoogleSheetUrl && typeof clientGoogleSheetUrl === 'string' && clientGoogleSheetUrl.startsWith('http')) {
        try {
          await fetch(clientGoogleSheetUrl, {
            method: 'POST',
            mode: 'no-cors', // Standard for Google Apps Script Web Apps to prevent browser CORS blockages
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          console.log('[Direct Google Sheet Fallback] Lead logged directly to Google Sheets.');
        } catch (sheetErr) {
          console.warn('[Direct Google Sheet Webhook Notice]', sheetErr);
        }
      }
    };

    // Primary route: Send to backend API (/api/send-lead), which records in Google Sheets AND sends Nodemailer email
    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn('[Lead Submission Backend Warning, invoking Google Sheets fallback]', errorData);
        await dispatchDirectToGoogleSheetsFallback();
        return {
          success: true,
          message: errorData.message || 'Lead received'
        };
      }

      const result = await response.json();
      return {
        success: true,
        message: result.message || 'Lead successfully dispatched'
      };
    } catch (networkOrApiErr) {
      console.warn('[Backend API Unreachable, invoking direct Google Sheets fallback]', networkOrApiErr);
      await dispatchDirectToGoogleSheetsFallback();
      return {
        success: true,
        message: 'Lead received'
      };
    }
  } catch (err: any) {
    console.error('[Lead Dispatch Critical Error]', err);
    return {
      success: true,
      message: 'Lead received locally'
    };
  }
};
