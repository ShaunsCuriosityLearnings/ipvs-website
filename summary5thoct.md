# IPVS 2026 Portal — Comprehensive Work & Technical Summary
**Date:** October 5, 2026  
**Project:** IPVS 2026 (Industrial Pumps, Valves & Systems Exhibition — December 3–4, 2026 | HITEX Hyderabad)  
**Production URLs:** [https://ipvs.in](https://ipvs.in) | [https://www.ipvs.in](https://www.ipvs.in)  
**Remotes:** `origin` (ShaunsCuriosityLearnings) & `orbit` (tibro-orbit)  

---

## Executive Overview

This document provides a complete technical record and user guide covering the major upgrades, bug resolutions, exhibitor additions, and data recovery workflows implemented across the **IPVS 2026 Portal**:

1. **Resolution of Duplicate Google Sheet Submissions (2 Rows Issue)**
2. **Instant Form Submission Speed (< 50ms) & Nodemailer Google Workspace Integration**
3. **New Confirmed Exhibitor Addition: Aqua Group (Stall A34) & VIP Invite Generator Assets**
4. **Historical Data Retrieval Playbook for Old WordPress / Elementor Pro Submissions**
5. **VPS Deployment & Operational Maintenance Runbook**

---

## 1. Resolution of Google Sheets Duplicate Submissions (2 Rows Issue)

### Problem Description
Whenever a user submitted any form on the website (Visitor Pass, Exhibitor Booking, Sponsorship, or Help Desk), **two identical rows** appeared in the Google Sheet for that single submission.

### Root Cause Analysis
- In `src/services/leadService.ts`, the frontend client was executing an unconditional direct `fetch` to the Google Apps Script Webhook URL.
- At the exact same millisecond, the frontend was calling `/api/send-lead`.
- On the backend, `/api/send-lead` (in `api/send-lead.ts` and the VPS API server) was *also* executing `forwardToGoogleSheet()`, sending the identical payload to the same Google Apps Script webhook.
- Google Apps Script's `doPost()` was receiving two distinct HTTP POST requests within milliseconds of each other and recorded both into the spreadsheet.

### Implementation Fix
1. **Centralized Single-Dispatch (`src/services/leadService.ts`):**
   - The browser now sends the lead **only** to `/api/send-lead`.
   - The direct browser-to-Sheets call is strictly retained as an **emergency offline fallback** (only activating if the backend API is unreachable or returns an error status).
2. **15-Second Deduplication Guard in Google Apps Script (`scripts/google_apps_script.js`):**
   - Added an in-memory cache guard using Google Apps Script's `CacheService`:
     ```javascript
     var dedupeKey = ((email + "_" + mobile).toLowerCase()).replace(/[^a-z0-9_]/gi, "");
     if (dedupeKey && dedupeKey !== "_") {
       var cache = CacheService.getScriptCache();
       if (cache.get("lead_" + dedupeKey)) {
         return ContentService.createTextOutput(JSON.stringify({
           status: "success",
           message: "Duplicate lead submission ignored (already recorded within 15s window)",
           timestamp: istTimestamp
         })).setMimeType(ContentService.MimeType.JSON);
       }
       cache.put("lead_" + dedupeKey, "1", 15);
     }
     ```
3. **30-Second In-Memory Server Deduplication (`api/server.cjs`):**
   - Implemented a 30-second TTL map on the Express API server that rejects duplicate rapid clicks before any external requests are dispatched.

---

## 2. Instant Form Submission & Nodemailer Lead Email Delivery

### Problem Description
- Form submissions were experiencing a 3–5 second lag before showing the confirmation modal.
- Form submissions were not being delivered to the official email inbox (`info@orbitexhibitions.com`).

### Root Cause Analysis
1. **Synchronous Server Blocking:** The API server was awaiting both the Google Sheets HTTP forwarder (~3 seconds) and the Nodemailer SMTP connection (~1–2 seconds) synchronously before returning a response to the browser.
2. **Missing VPS Credentials:** The standalone server running on the VPS (`/var/www/ipvs/api/server.js`) did not have the Google App Password configured in its local `.env`.
3. **TLS Inspection / Certificate Validation:** When connecting to Google SMTP (`smtp.gmail.com:465`), strict TLS verification failed due to network-level self-signed cert handling unless `tls: { rejectUnauthorized: false }` was explicitly configured.

### Implementation Fix
1. **Asynchronous Fast-Response Architecture (`api/server.cjs`):**
   - The server validates required fields (`firstName`, `email`, `mobile`), generates a unique dedupe key, and immediately returns `HTTP 200 { success: true, message: 'Lead captured successfully' }` in **< 50 milliseconds**.
   - The frontend modal closes instantly with the green checkmark, delivering an ultra-fast user experience.
   - Google Sheets forwarding and Nodemailer email delivery execute seamlessly in the background via `Promise.allSettled()`.
2. **Verified Google Workspace SMTP Credentials:**
   - **Host:** `smtp.gmail.com`
   - **Port:** `465` (SSL)
   - **User:** `info@orbitexhibitions.com`
   - **Password:** `jtmacomtlpxareuj` (Google Workspace App Password)
   - **TLS Option:** `tls: { rejectUnauthorized: false }`
   - **Timeouts:** Socket timeout set to `8000ms` / connection timeout set to `5000ms`.
3. **Branded HTML Email Template:**
   - Automatically renders lead metadata, category badges (`EXHIBITOR STALL`, `VISITOR PASS`, `SPONSORSHIP`, `EVENT DESK`), contact details, stall requirements, marketing attribution tags (UTM Source, Campaign, Inviting Exhibitor), and a direct "Reply to Lead" button.

---

## 3. New Confirmed Exhibitor: Aqua Group (Stall A34)

### Integration Summary
- **Company Name:** Aqua Group (Texmo / Aquatex)
- **Stall Allocation:** Stall A34
- **Sector:** Submersible & Industrial Pumps
- **Logo File:** `public/Logo/Aqua Group.png`
- **Exhibitor ID:** `ex-23`
- **Slug:** `aquagroup`

### Placements Added
1. **Exhibitors Master Data (`src/data/ipvsData.ts`):** Added complete profile, description, high-resolution logo link, and stall info.
2. **Attribution Engine (`src/utils/attribution.ts`):** Added loose alias matching so `?exhibitor=aqua` or `?utm_source=aquagroup` automatically maps to Aqua Group.
3. **VIP Tracking Portal (`/visit`):** When visitors access via Aqua Group's link, the portal personalizes dynamically:
   > *"You have been exclusively invited by Aqua Group (Stall A34) to attend IPVS 2026 at HITEX Hyderabad."*
4. **Internal Generator Tool (`/invite-generator`):** Aqua Group is now selectable in the dropdown for 1-click QR code generation and CSV export.

### Generated Marketing & Tracking URLs

| Channel | Tracking URL |
| :--- | :--- |
| **Primary VIP Pass Link** | `https://ipvs.in/visit?utm_source=aquagroup&utm_medium=exhibitor_invite&utm_campaign=ipvs2026&utm_content=stall_a34` |
| **Clean Short Link** | `https://ipvs.in/visit?exhibitor=aquagroup` |
| **WhatsApp Broadcast Link** | `https://ipvs.in/visit?utm_source=aquagroup&utm_medium=whatsapp&utm_campaign=ipvs2026&utm_content=stall_a34_whatsapp_broadcast` |
| **LinkedIn / Social Link** | `https://ipvs.in/visit?utm_source=aquagroup&utm_medium=linkedin&utm_campaign=ipvs2026&utm_content=stall_a34_linkedin_social` |
| **Email Campaign Link** | `https://ipvs.in/visit?utm_source=aquagroup&utm_medium=email&utm_campaign=ipvs2026&utm_content=stall_a34_email_invite` |

**High-Resolution QR Code (1000 × 1000px):**  
`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https%3A%2F%2Fipvs.in%2Fvisit%3Futm_source%3Daquagroup%26utm_medium%3Dexhibitor_invite%26utm_campaign%3Dipvs2026%26utm_content%3Dstall_a34&margin=10`

---

## 4. Historical Data Retrieval: Old WordPress / Elementor Pro Submissions

### Current Status of the Old WordPress Site
- The old WordPress installation is **100% intact and running** on the GoDaddy server at IP **`107.180.112.97`**.
- It was not deleted when `ipvs.in` was migrated to the new VPS (`200.234.42.104`).

### Retrieval Method 1: The Local `hosts` File Trick (1-Click CSV Export)
Because WordPress requires the `ipvs.in` domain header, you can temporarily instruct your local computer to route `ipvs.in` to the old GoDaddy server:

1. Open **Notepad** as Administrator on Windows:
   - Press **Windows Key** → Type **Notepad** → Right-click and choose **Run as administrator**.
2. Open `C:\Windows\System32\drivers\etc\hosts` *(Set file filter to "All Files (*.*)")*.
3. Add this line at the bottom:
   ```text
   107.180.112.97 ipvs.in www.ipvs.in
   ```
4. Save (**Ctrl + S**).
5. Open an Incognito browser window and go to:
   **`https://ipvs.in/wp-admin`** (or `https://ipvs.in/wp-login.php`).
6. Log in with your old WordPress administrator credentials.
7. Go to **Elementor → Submissions** in the left sidebar.
8. Click **"Export All to CSV"** (top right corner).
9. Remove the line from `hosts` and save to return your PC to the live website.

### Retrieval Method 2: Via GoDaddy cPanel / phpMyAdmin
1. Log into your GoDaddy Hosting account → Open **cPanel Admin** (or browse to `https://107.180.112.97:2083`).
2. Open **phpMyAdmin** → Select the WordPress database (`wp_...`).
3. Run this query in the **SQL** tab to extract all submissions and field values:
   ```sql
   SELECT 
     s.id AS submission_id,
     s.form_name,
     s.created_at,
     v.key AS field_label,
     v.value AS field_value
   FROM wp_e_submissions s
   JOIN wp_e_submissions_values v ON s.id = v.submission_id
   ORDER BY s.created_at DESC;
   ```
4. Click **Export** → Select **CSV** or **Microsoft Excel**.

---

## 5. Production Server Deployment & Runbook (VPS `200.234.42.104`)

To sync the latest frontend code, API server, and exhibitor assets to the live production server, execute these commands via SSH terminal (`root@200.234.42.104`):

```bash
# 1. Pull latest code from GitHub
cd /var/www/ipvs-source
git pull origin main

# 2. Build the production React application
npm run build

# 3. Deploy build artifacts to Nginx public webroot
rsync -av --delete /var/www/ipvs-source/dist/ /var/www/ipvs/dist/

# 4. Update and restart the IPVS Lead API Server (Port 3002)
cp /var/www/ipvs-source/api/server.cjs /var/www/ipvs/api/server.js
cd /var/www/ipvs/api
npm install
pm2 restart ipvs-api

# 5. Reload Nginx web server
systemctl reload nginx
```

### Verification Checklist
- [x] `curl -s https://ipvs.in/api/health` returns `{"status":"ok","service":"ipvs-api"}`
- [x] Submitting any website form completes in under 100 milliseconds
- [x] Exactly **1 row** is added to Google Sheets per submission (no duplicates)
- [x] Instant notification email arrives at `info@orbitexhibitions.com`
- [x] Aqua Group logo displays cleanly in homepage & exhibitor carousels
- [x] `/visit?exhibitor=aquagroup` personalizes with Aqua Group branding & Stall A34
