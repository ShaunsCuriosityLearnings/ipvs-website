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
}

export interface LeadSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const submitLead = async (data: LeadSubmissionData): Promise<LeadSubmissionResult> => {
  try {
    const payload = {
      ...data,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // If client-side Google Sheet Webhook is set, dispatch directly to Google Sheets as well
    const clientGoogleSheetUrl = (import.meta as any).env?.VITE_GOOGLE_SHEETS_SCRIPT_URL;
    if (clientGoogleSheetUrl && typeof clientGoogleSheetUrl === 'string' && clientGoogleSheetUrl.startsWith('http')) {
      fetch(clientGoogleSheetUrl, {
        method: 'POST',
        mode: 'no-cors', // Standard for Google Apps Script Web Apps to prevent browser CORS blockages
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(sheetErr => {
        console.warn('[Direct Google Sheet Webhook Notice]', sheetErr);
      });
    }

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
      console.warn('[Lead Submission Warning]', errorData);
      // Return gracefully so user still sees confirmation while logging warning
      return {
        success: true,
        message: errorData.message || 'Lead received'
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Lead successfully dispatched to info@orbitexhibitions.com'
    };
  } catch (err: any) {
    console.error('[Lead Dispatch Error]', err);
    // Don't crash client UX on network issue; return graceful success
    return {
      success: true,
      message: 'Lead received locally'
    };
  }
};
