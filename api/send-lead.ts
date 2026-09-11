import nodemailer from 'nodemailer';

export interface LeadPayload {
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
  submittedAt?: string;
}

export async function processLeadEmail(payload: LeadPayload): Promise<{ success: boolean; message: string; previewUrl?: string | false }> {
  const {
    formType,
    source = 'IPVS 2026 Website',
    firstName,
    lastName,
    company = 'N/A',
    designation = 'N/A',
    mobile,
    email,
    city = 'N/A',
    website = 'N/A',
    stallSize = 'N/A',
    sectorInterest = 'N/A',
    sponsorshipTier = 'N/A',
    heardFrom = 'N/A',
    message = 'N/A',
    submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  } = payload;

  const targetEmail = process.env.RECEIVER_EMAIL || 'info@orbitexhibitions.com';
  const smtpHost = process.env.SMTP_HOST || 'mail.orbitexhibitions.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
  const smtpUser = process.env.SMTP_USER || 'info@orbitexhibitions.com';
  const smtpPass = process.env.SMTP_PASS || '';
  const smtpFrom = process.env.SMTP_FROM || `"IPVS 2026 Portal" <${smtpUser}>`;

  // Determine subject line based on lead category
  let subject = `[IPVS 2026 Lead] Submission from ${firstName} ${lastName}`;
  let categoryBadge = 'General Lead';
  let badgeColor = '#1E65FF';

  if (formType === 'exhibitor') {
    subject = `[IPVS 2026 Exhibitor Lead] ${company} - ${stallSize} Stall Request`;
    categoryBadge = `Exhibitor Stall (${stallSize})`;
    badgeColor = '#0D47A1';
  } else if (formType === 'visitor') {
    subject = `[IPVS 2026 Visitor Lead] ${firstName} ${lastName} - ${company}`;
    categoryBadge = 'Free Trade Visitor Pass';
    badgeColor = '#059669';
  } else if (formType === 'sponsorship') {
    subject = `[IPVS 2026 Sponsorship Lead] ${company} - ${sponsorshipTier !== 'N/A' ? sponsorshipTier : 'Sponsorship Inquiry'}`;
    categoryBadge = `Sponsorship (${sponsorshipTier !== 'N/A' ? sponsorshipTier : 'Corporate Sponsor'})`;
    badgeColor = '#7C3AED';
  } else if (formType === 'contact') {
    subject = `[IPVS 2026 Contact Inquiry] Message from ${firstName} ${lastName}`;
    categoryBadge = 'Event Desk Message';
    badgeColor = '#D97706';
  }

  // Generate clean HTML template
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fe; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #0A192F 0%, #0D327B 60%, #1E65FF 100%); padding: 28px 24px; text-align: left; color: #ffffff; }
        .badge { display: inline-block; padding: 4px 12px; background: rgba(255,255,255,0.15); border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .title { margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; }
        .subtitle { margin: 4px 0 0; font-size: 12px; color: #93c5fd; }
        .content { padding: 24px; }
        .summary-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; }
        .table tr { border-bottom: 1px solid #f1f5f9; }
        .table tr:last-child { border-bottom: none; }
        .table td { padding: 10px 6px; font-size: 13px; vertical-align: top; }
        .label { font-weight: 700; color: #64748b; width: 38%; }
        .value { font-weight: 600; color: #0f172a; }
        .highlight { color: #1E65FF; font-weight: 700; }
        .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .cta-btn { display: inline-block; margin-top: 16px; padding: 10px 20px; background: #1E65FF; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 12px; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">${categoryBadge}</div>
          <h1 class="title">New Lead Received</h1>
          <p class="subtitle">IPVS 2026 Exhibition & Conference • HITEX Hyderabad</p>
        </div>
        
        <div class="content">
          <div class="summary-box">
            <table class="table">
              <tr>
                <td class="label">Lead Category:</td>
                <td class="value"><span style="color: ${badgeColor}; font-weight: 800;">${categoryBadge}</span></td>
              </tr>
              ${formType === 'exhibitor' ? `
              <tr>
                <td class="label">Required Stall Area:</td>
                <td class="value highlight">${stallSize}</td>
              </tr>
              ` : ''}
              ${formType === 'sponsorship' ? `
              <tr>
                <td class="label">Sponsorship Interest:</td>
                <td class="value highlight" style="color: #7C3AED; font-weight: 800;">${sponsorshipTier}</td>
              </tr>
              ` : ''}
              <tr>
                <td class="label">Full Name:</td>
                <td class="value">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td class="label">Company Name:</td>
                <td class="value">${company}</td>
              </tr>
              ${formType === 'visitor' || formType === 'sponsorship' ? `
              <tr>
                <td class="label">Designation:</td>
                <td class="value">${designation}</td>
              </tr>
              ` : ''}
              <tr>
                <td class="label">Mobile Number:</td>
                <td class="value"><a href="tel:${mobile}" style="color:#0f172a; text-decoration:none; font-weight:700;">${mobile}</a></td>
              </tr>
              <tr>
                <td class="label">Official Email:</td>
                <td class="value"><a href="mailto:${email}" style="color:#1E65FF; text-decoration:none; font-weight:700;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">City / Location:</td>
                <td class="value">${city}</td>
              </tr>
              ${(formType === 'exhibitor' || formType === 'sponsorship') && website && website !== 'N/A' ? `
              <tr>
                <td class="label">Company Website:</td>
                <td class="value"><a href="${website.startsWith('http') ? website : 'https://' + website}" target="_blank" style="color:#1E65FF;">${website}</a></td>
              </tr>
              ` : ''}
              ${formType === 'visitor' && sectorInterest && sectorInterest !== 'N/A' ? `
              <tr>
                <td class="label">Sector Interest:</td>
                <td class="value">${sectorInterest}</td>
              </tr>
              ` : ''}
              ${message && message !== 'N/A' ? `
              <tr>
                <td class="label">Message / Notes:</td>
                <td class="value" style="white-space: pre-wrap;">${message}</td>
              </tr>
              ` : ''}
              ${heardFrom && heardFrom !== 'N/A' ? `
              <tr>
                <td class="label">Heard About Us:</td>
                <td class="value highlight" style="color: #1E65FF;">${heardFrom}</td>
              </tr>
              ` : ''}
              <tr>
                <td class="label">Source:</td>
                <td class="value">${source}</td>
              </tr>
              <tr>
                <td class="label">Timestamp (IST):</td>
                <td class="value">${submittedAt}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center;">
            <a href="mailto:${email}?subject=Regarding%20your%20inquiry%20for%20IPVS%202026%20Exhibition" class="cta-btn">
              Reply to ${firstName} (${email})
            </a>
          </div>
        </div>

        <div class="footer">
          This email was dispatched automatically from the IPVS 2026 Exhibition Portal.<br>
          Recipient: <strong>${targetEmail}</strong> • Organized by Orbit Exhibitions Pvt. Ltd.
        </div>
      </div>
    </body>
    </html>
  `;

  // Plain text fallback
  const textBody = `
IPVS 2026 - NEW LEAD SUBMISSION
----------------------------------------
Category: ${categoryBadge}
Name: ${firstName} ${lastName}
Company: ${company}
${formType === 'exhibitor' ? `Required Stall Area: ${stallSize}\nWebsite: ${website}\n` : ''}
${formType === 'sponsorship' ? `Sponsorship Interest: ${sponsorshipTier}\nDesignation: ${designation}\nWebsite: ${website}\n` : ''}
${formType === 'visitor' ? `Designation: ${designation}\nSector Interest: ${sectorInterest}\n` : ''}
Mobile: ${mobile}
Email: ${email}
City: ${city}
${message && message !== 'N/A' ? `Message: ${message}\n` : ''}
Source: ${source}
Submitted: ${submittedAt}
----------------------------------------
Delivered to: ${targetEmail}
  `.trim();

  // If SMTP password is not set yet, log the lead and return simulated success
  if (!smtpPass || smtpPass.trim() === '') {
    console.log(`[Nodemailer Notice] SMTP_PASS not set in environment. Lead captured for ${targetEmail}:`);
    console.log(JSON.stringify(payload, null, 2));
    return {
      success: true,
      message: `Lead recorded successfully. (SMTP credentials pending in .env; email will be sent to ${targetEmail} once SMTP_PASS is added)`
    };
  }

  // Create Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    },
    tls: {
      rejectUnauthorized: false // Helps avoid self-signed cert issues on enterprise webmail
    }
  });

  // Dispatch Email
  const info = await transporter.sendMail({
    from: smtpFrom,
    to: targetEmail,
    replyTo: email,
    subject: subject,
    text: textBody,
    html: htmlBody
  });

  return {
    success: true,
    message: `Lead dispatched to ${targetEmail} (Message ID: ${info.messageId})`
  };
}

/**
 * Forwards lead directly to Google Sheets Webhook via Google Apps Script
 */
export async function forwardToGoogleSheet(payload: LeadPayload): Promise<{ success: boolean; message: string }> {
  const googleSheetUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL || process.env.GOOGLE_SHEET_URL;
  if (!googleSheetUrl || googleSheetUrl.trim() === '') {
    return { success: false, message: 'GOOGLE_SHEETS_SCRIPT_URL not configured' };
  }

  try {
    const response = await fetch(googleSheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    if (response.ok) {
      console.log(`[Google Sheets] Lead successfully logged for ${payload.firstName} ${payload.lastName}`);
      return { success: true, message: 'Logged to Google Sheets' };
    } else {
      console.warn(`[Google Sheets Warning] HTTP ${response.status}`);
      return { success: false, message: `HTTP ${response.status}` };
    }
  } catch (error: any) {
    console.error('[Google Sheets Error]', error);
    return { success: false, message: error.message };
  }
}

// Default export for Vercel Serverless Function handler
export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const payload: LeadPayload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!payload.firstName || !payload.email || !payload.mobile) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstName, email, and mobile are required.'
      });
    }

    // Simultaneously dispatch to Google Sheets and Email
    const [sheetResult, emailResult] = await Promise.allSettled([
      forwardToGoogleSheet(payload),
      processLeadEmail(payload)
    ]);

    const emailResponse = emailResult.status === 'fulfilled' ? emailResult.value : { success: false, message: 'Email dispatch failed' };
    const sheetResponse = sheetResult.status === 'fulfilled' ? sheetResult.value : { success: false, message: 'Sheet dispatch failed' };

    return res.status(200).json({
      success: true,
      message: emailResponse.message,
      googleSheet: sheetResponse.success ? 'recorded' : sheetResponse.message
    });
  } catch (error: any) {
    console.error('[Nodemailer/Sheets Error]', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to dispatch lead'
    });
  }
}
