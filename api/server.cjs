const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_SCRIPT_URL || 
  'https://script.google.com/macros/s/AKfycbx9bdhZcGLXFApXJzxFd9DR5tgjRyegFhA2cffAfLaab1TC05YYOPBXeZpKzM2VAEjD/exec';

// 30-Second In-Memory Deduplication Cache
const recentLeads = new Map();
function isDuplicate(leadKey) {
  const now = Date.now();
  if (recentLeads.has(leadKey)) {
    const timestamp = recentLeads.get(leadKey);
    if (now - timestamp < 30000) {
      return true;
    }
  }
  recentLeads.set(leadKey, now);
  // Clean up old entries
  if (recentLeads.size > 200) {
    for (const [key, time] of recentLeads.entries()) {
      if (now - time > 60000) recentLeads.delete(key);
    }
  }
  return false;
}

// Nodemailer Transporter using verified Google Workspace SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER || 'info@orbitexhibitions.com',
    pass: process.env.SMTP_PASS || 'jtmacomtlpxareuj'
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 10000
});

async function forwardToGoogleSheets(payload) {
  try {
    const res = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log(`[Google Sheets] Response HTTP ${res.status} for ${payload.email}`);
    return res.ok;
  } catch (err) {
    console.error('[Google Sheets Forwarding Error]', err.message);
    return false;
  }
}

async function sendLeadEmail(payload) {
  const {
    formType = 'general',
    firstName = '',
    lastName = '',
    company = 'N/A',
    designation = 'N/A',
    mobile = 'N/A',
    email = 'N/A',
    city = 'N/A',
    website = 'N/A',
    stallSize = 'N/A',
    sponsorshipTier = 'N/A',
    sectorInterest = 'N/A',
    message = 'N/A',
    heardFrom = 'N/A',
    invitingExhibitor = 'N/A',
    stallNumber = 'N/A',
    utmSource = 'N/A',
    utmMedium = 'N/A',
    utmCampaign = 'N/A',
    landingPage = 'N/A',
    submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  } = payload;

  const targetEmail = process.env.RECEIVER_EMAIL || 'info@orbitexhibitions.com';

  let subject = `[IPVS 2026 Lead] New ${formType.toUpperCase()} Submission: ${firstName} ${lastName}`;
  if (company && company !== 'N/A') subject += ` (${company})`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f7fe; padding: 20px; color: #1e293b;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        <tr>
          <td style="background: #0D327B; padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">IPVS 2026 OFFICIAL LEAD</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.85;">Industrial Pumps, Valves & Systems Exhibition | HITEX Hyderabad</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px;">
            <div style="background: #eff6ff; border-left: 4px solid #1E65FF; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
              <strong style="color: #1E65FF; font-size: 14px; text-transform: uppercase;">Category: ${formType.toUpperCase()}</strong>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Submitted on ${submittedAt} (IST)</div>
            </div>

            <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td width="35%" style="color: #64748b; font-weight: bold;">Full Name:</td>
                <td style="color: #0f172a; font-weight: bold;">${firstName} ${lastName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Email:</td>
                <td><a href="mailto:${email}" style="color: #1E65FF; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Phone / Mobile:</td>
                <td><a href="tel:${mobile}" style="color: #0f172a; font-weight: bold; text-decoration: none;">${mobile}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Company:</td>
                <td style="color: #0f172a;">${company}</td>
              </tr>
              ${designation !== 'N/A' ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Designation:</td>
                <td style="color: #0f172a;">${designation}</td>
              </tr>` : ''}
              ${city !== 'N/A' ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">City:</td>
                <td style="color: #0f172a;">${city}</td>
              </tr>` : ''}
              ${stallSize !== 'N/A' ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Stall Size:</td>
                <td style="color: #1E65FF; font-weight: bold;">${stallSize}</td>
              </tr>` : ''}
              ${sponsorshipTier !== 'N/A' ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Sponsorship Tier:</td>
                <td style="color: #7C3AED; font-weight: bold;">${sponsorshipTier}</td>
              </tr>` : ''}
              ${sectorInterest !== 'N/A' ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Sector Interest:</td>
                <td style="color: #059669; font-weight: bold;">${sectorInterest}</td>
              </tr>` : ''}
              ${invitingExhibitor !== 'N/A' ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Invited By:</td>
                <td style="color: #0D327B; font-weight: bold;">${invitingExhibitor} (${stallNumber})</td>
              </tr>` : ''}
              ${message !== 'N/A' ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="color: #334155; line-height: 1.5;">${message}</td>
              </tr>` : ''}
              ${utmSource !== 'N/A' ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="color: #64748b; font-weight: bold;">Marketing Attribution:</td>
                <td style="color: #64748b; font-size: 12px;">Source: ${utmSource} | Medium: ${utmMedium} | Campaign: ${utmCampaign}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #1E65FF; color: #ffffff; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px;">Reply to Lead Directly</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background: #f8fafc; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            This lead notification was automatically generated by the IPVS 2026 Portal (https://ipvs.in) and recorded in Google Sheets.
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"IPVS 2026 Lead Desk" <${process.env.SMTP_USER || 'info@orbitexhibitions.com'}>`,
      to: targetEmail,
      replyTo: email,
      subject,
      html
    });
    console.log(`[Email Dispatched] To ${targetEmail} (ID: ${info.messageId})`);
    return true;
  } catch (err) {
    console.error('[Email Dispatch Error]', err.message);
    return false;
  }
}

async function sendUserConfirmationEmail(payload) {
  const {
    formType = 'general',
    firstName = '',
    lastName = '',
    company = '',
    designation = '',
    email = '',
    mobile = '',
    stallSize = 'N/A',
    sectorInterest = 'General Industrial Flow Control',
    sponsorshipTier = 'General Sponsorship'
  } = payload;

  if (!email || !email.includes('@')) {
    console.warn('[Autoresponder] Skipped: invalid email address', email);
    return false;
  }

  const isVisitor = formType === 'visitor';
  const isExhibitor = formType === 'exhibitor';
  const isSponsorship = formType === 'sponsorship';

  let subject = '';
  let contentHtml = '';

  if (isVisitor) {
    subject = `Registration Confirmed: Your VIP Trade Visitor Pass for IPVS 2026 | HITEX Hyderabad`;
    contentHtml = `
      <p style="font-size: 16px; margin: 0 0 16px 0; color: #0f172a;">Dear <strong>${firstName}</strong>,</p>
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; color: #334155;">
        Thank you for pre-registering for <strong>IPVS 2026 (Industrial Pumps, Valves & Process Systems Exhibition)</strong>! We are excited to have you join us at India's premier B2B industrial technology gathering.
      </p>

      <table width="100%" cellpadding="12" cellspacing="0" style="background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px; font-size: 14px; border-collapse: collapse;">
        <tr>
          <td colspan="2" style="background: #0D327B; color: #ffffff; font-weight: bold; font-size: 14px; border-radius: 6px 6px 0 0;">
            📅 EVENT LOGISTICS & VENUE
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td width="30%" style="color: #64748b; font-weight: bold;">Dates:</td>
          <td style="color: #0f172a; font-weight: bold;">December 03 – 04, 2026 (Thursday & Friday)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="color: #64748b; font-weight: bold;">Timings:</td>
          <td style="color: #0f172a;">10:00 AM – 6:00 PM IST (Both Days)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="color: #64748b; font-weight: bold;">Venue:</td>
          <td style="color: #0f172a;">
            <strong>HITEX Exhibition Center</strong><br>
            Izzat Nagar, Kothaguda, Hyderabad, Telangana – 500084, India
          </td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: bold;">Location Map:</td>
          <td><a href="https://maps.google.com/?q=HITEX+Exhibition+Center+Hyderabad" target="_blank" style="color: #1E65FF; text-decoration: underline; font-weight: bold;">View on Google Maps &rarr;</a></td>
        </tr>
      </table>

      <div style="background: #eff6ff; border-left: 4px solid #1E65FF; padding: 14px 18px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #1E65FF; font-size: 14px; text-transform: uppercase;">Next Steps for Badge Collection</h4>
        <ul style="margin: 0; padding-left: 18px; color: #334155; font-size: 13px; line-height: 1.6;">
          <li>Your official digital registration has been logged for <strong>${company ? company : 'Delegate'}</strong>.</li>
          <li>Closer to the event, you will receive your digital entry barcode and pass.</li>
          <li><strong>On-Site Fast Track:</strong> Simply present this confirmation email along with your <strong>Business / Corporate ID Card</strong> at the <em>Pre-Registered Visitor Counter</em> at HITEX to collect your official Badge & Lanyard.</li>
        </ul>
      </div>

      <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 18px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 6px 0; color: #991b1b; font-size: 13px; text-transform: uppercase;">Important Guidelines</h4>
        <ul style="margin: 0; padding-left: 18px; color: #7f1d1d; font-size: 12px; line-height: 1.5;">
          <li><strong>Trade Visitors Only:</strong> Strictly open to industrial professionals, plant managers, EPC engineers, and procurement directors.</li>
          <li><strong>Entry is Free:</strong> Complimentary trade pass for pre-registered industry delegates.</li>
          <li><strong>Age Limit:</strong> Individuals below 18 years of age are strictly not permitted inside exhibition halls.</li>
        </ul>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: bold; color: #166534;">
          Think your colleagues will also benefit from attending?
        </p>
        <p style="margin: 0 0 12px 0; font-size: 12px; color: #15803d;">
          Forward the Visitor Pre-Registration link to your engineering & procurement team:
        </p>
        <a href="https://ipvs.in/visitor" target="_blank" style="display: inline-block; background: #16a34a; color: #ffffff; padding: 10px 22px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px;">Forward Registration Link</a>
      </div>
    `;
  } else if (isExhibitor) {
    subject = `Thank You for Your Interest in Exhibiting at IPVS 2026 | HITEX Hyderabad`;
    contentHtml = `
      <p style="font-size: 16px; margin: 0 0 16px 0; color: #0f172a;">Dear <strong>${firstName}</strong>,</p>
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; color: #334155;">
        Thank you for your interest in exhibiting at <strong>IPVS 2026 (Industrial Pumps, Valves & Process Systems Exhibition)</strong>! We are excited to have the opportunity to support your participation in what promises to be a dynamic and influential industrial event.
      </p>

      <table width="100%" cellpadding="12" cellspacing="0" style="background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px; font-size: 14px; border-collapse: collapse;">
        <tr>
          <td colspan="2" style="background: #0D327B; color: #ffffff; font-weight: bold; font-size: 14px; border-radius: 6px 6px 0 0;">
            🏢 EXHIBITION DETAILS & LOCATION
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td width="30%" style="color: #64748b; font-weight: bold;">Dates:</td>
          <td style="color: #0f172a; font-weight: bold;">December 03 – 04, 2026</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="color: #64748b; font-weight: bold;">Venue:</td>
          <td style="color: #0f172a;">
            <strong>HITEX Exhibition Center</strong><br>
            Izzat Nagar, Kothaguda, Hyderabad, Telangana – 500084, India
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="color: #64748b; font-weight: bold;">Requested Stall:</td>
          <td style="color: #1E65FF; font-weight: bold;">${stallSize !== 'N/A' ? stallSize : 'Standard Booth Space'}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: bold;">Company:</td>
          <td style="color: #0f172a;">${company || 'N/A'}</td>
        </tr>
      </table>

      <div style="background: #f8fafc; border-left: 4px solid #0D327B; padding: 16px 20px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 10px 0; color: #0D327B; font-size: 14px; text-transform: uppercase;">Exhibitor Benefits at IPVS 2026:</h4>
        <p style="margin: 0 0 10px 0; font-size: 13px; color: #475569;">As an exhibitor, you will have the chance to:</p>
        <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 13px; line-height: 1.6;">
          <li><strong>Connect and Network:</strong> Meet over 7,000+ pre-qualified plant heads, EPC contractors, and industrial buyers.</li>
          <li><strong>Increase Brand Visibility:</strong> Position your company before high-priority sectors (Ethanol & Biofuels, Water Treatment & ZLD, Chemicals, Pharmaceuticals, Power & Steel).</li>
          <li><strong>Generate Leads and Sales:</strong> Secure high-ticket annual supply contracts and direct procurement orders.</li>
          <li><strong>Drive Business Growth:</strong> Showcase functional pumps, valves, and automation systems live to decision-makers.</li>
          <li><strong>Stay Updated on Industry Trends:</strong> Participate in co-located technical conferences and knowledge sessions.</li>
        </ul>
      </div>

      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #1E65FF; font-size: 14px;">Next Steps:</h4>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #1e3a8a; line-height: 1.5;">
          Please let us know if you would like further information on specific packages or if you would like to discuss your exhibit plans. Our Senior Exhibition Account Manager will contact you shortly with the latest <strong>HITEX Floor Plan Layout</strong> and commercial stall packages. We would be happy to arrange a call to go over any questions you may have.
        </p>
        <p style="margin: 0; font-size: 12px; color: #1e40af;">
          Direct Contact: Call <strong>+91 22 2410 2801</strong> or Email <strong>info@orbitexhibitions.com</strong>.
        </p>
      </div>
    `;
  } else if (isSponsorship) {
    subject = `Thank You for Your Sponsorship Inquiry — IPVS 2026 | HITEX Hyderabad`;
    contentHtml = `
      <p style="font-size: 16px; margin: 0 0 16px 0; color: #0f172a;">Dear <strong>${firstName}</strong>,</p>
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; color: #334155;">
        Thank you for your interest in partnering with <strong>IPVS 2026</strong> as a Corporate Sponsor (${sponsorshipTier}).
      </p>
      <div style="background: #f8fafc; border-left: 4px solid #7C3AED; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 6px 0; color: #7C3AED; font-size: 14px;">Event Details</h4>
        <p style="margin: 0; font-size: 13px; color: #334155;">
          Dates: December 3–4, 2026 | HITEX Exhibition Center, Hyderabad, India<br>
          Our Director of Strategic Partnerships will review your inquiry and share the comprehensive IPVS 2026 Sponsorship & Branding Deliverables Deck shortly.
        </p>
      </div>
    `;
  } else {
    subject = `We Have Received Your Message — IPVS 2026 Event Desk`;
    contentHtml = `
      <p style="font-size: 16px; margin: 0 0 16px 0; color: #0f172a;">Dear <strong>${firstName}</strong>,</p>
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; color: #334155;">
        Thank you for contacting the <strong>IPVS 2026 Event Desk</strong>. We have received your inquiry.
      </p>
      <p style="font-size: 13px; color: #475569; line-height: 1.5;">
        Our support team will review your message and respond to <strong>${email}</strong> within one business day.
      </p>
    `;
  }

  const finalHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f7fe; padding: 20px; color: #1e293b; margin: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        <tr>
          <td style="background: linear-gradient(135deg, #0D327B 0%, #1E65FF 100%); padding: 26px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #67e8f9; margin-bottom: 6px;">Official Confirmation</div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px; color: #ffffff;">IPVS 2026</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; color: #e2e8f0;">Industrial Pumps, Valves & Systems Exhibition</p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #cbd5e1;">December 03–04, 2026 | HITEX Exhibition Center, Hyderabad</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 28px 24px;">
            ${contentHtml}

            <!-- Signoff Footer -->
            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; line-height: 1.6;">
              <p style="margin: 0 0 4px 0; font-weight: bold; color: #0f172a;">Warm regards,</p>
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #1E65FF; font-size: 14px;">Team IPVS 2026</p>
              <p style="margin: 0 0 2px 0;"><strong>Orbit Exhibitions Pvt. Ltd.</strong></p>
              <p style="margin: 0 0 2px 0;">103, Navyug Industrial Estate, Tokershi Jivraj Rd, Sewri, Mumbai, Maharashtra 400015</p>
              <p style="margin: 0 0 2px 0;">Phone: <a href="tel:+912224102801" style="color: #1E65FF; text-decoration: none;">+91 22 2410 2801</a> | Email: <a href="mailto:info@orbitexhibitions.com" style="color: #1E65FF; text-decoration: none;">info@orbitexhibitions.com</a></p>
              <p style="margin: 0;">Website: <a href="https://ipvs.in" target="_blank" style="color: #1E65FF; text-decoration: none; font-weight: bold;">https://ipvs.in</a></p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background: #f8fafc; padding: 14px 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            This email was sent to ${email} because you submitted a form on the IPVS 2026 Official Portal (https://ipvs.in).
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Team IPVS 2026" <${process.env.SMTP_USER || 'info@orbitexhibitions.com'}>`,
      to: email,
      replyTo: process.env.RECEIVER_EMAIL || 'info@orbitexhibitions.com',
      subject,
      html: finalHtml
    });
    console.log(`[Autoresponder Sent] To ${email} (Subject: "${subject}") [ID: ${info.messageId}]`);
    return true;
  } catch (err) {
    console.error('[Autoresponder Error]', err.message);
    return false;
  }
}

app.post('/api/send-lead', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.firstName || !payload.email || !payload.mobile) {
      return res.status(400).json({ success: false, error: 'Required fields missing: firstName, email, mobile' });
    }

    const leadKey = `${payload.email}_${payload.mobile}`.toLowerCase().replace(/[^a-z0-9_]/gi, '');
    if (isDuplicate(leadKey)) {
      console.log(`[Deduplication] Ignored duplicate submission for ${payload.email} within 30s`);
      return res.json({ success: true, message: 'Lead already processed' });
    }

    // Instantly acknowledge receipt so form completes in < 50ms
    res.json({ success: true, message: 'Lead captured successfully' });

    // Execute Google Sheets, Admin Nodemailer, and User Autoresponder in background
    Promise.allSettled([
      forwardToGoogleSheets(payload),
      sendLeadEmail(payload),
      sendUserConfirmationEmail(payload)
    ]).catch(err => console.error('[Background Task Error]', err));

  } catch (err) {
    console.error('[API Error]', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'ipvs-api', timestamp: new Date().toISOString() }));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`IPVS Lead API listening on http://127.0.0.1:${PORT}`);
});
