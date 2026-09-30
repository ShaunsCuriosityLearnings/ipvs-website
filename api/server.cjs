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

    // Execute Google Sheets and Nodemailer in background
    Promise.allSettled([
      forwardToGoogleSheets(payload),
      sendLeadEmail(payload)
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
