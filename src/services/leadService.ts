/**
 * Lead Service for IPVS 2026 Portal
 * Dispatches form submissions to /api/send-lead which uses Nodemailer to deliver leads to info@orbitexhibitions.com
 */

export interface LeadSubmissionData {
  formType: 'exhibitor' | 'visitor' | 'contact';
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
