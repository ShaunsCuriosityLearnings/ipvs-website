# IPVS 2026 Portal — Comprehensive Work & Deliverables Report
**Date:** September 11, 2026  
**Project:** IPVS 2026 (Industrial Pumps, Valves & Systems Exhibition)  
**Production URLs:** [https://www.ipvs.in](https://www.ipvs.in) | [https://ipvs-website-git-main-tibro-orbit.vercel.app](https://ipvs-website-git-main-tibro-orbit.vercel.app)  
**Repository Remotes:** `origin` (ShaunsCuriosityLearnings) & `orbit` (tibro-orbit)

---

## Executive Summary

Today, we executed major architectural, visual, marketing, and automation upgrades across the entire IPVS 2026 platform:
1. **Visual Density & Spacing Optimization:** Dramatically tightened vertical spacing across all pages and replaced monotonous box borders with modern, differentiated borders.
2. **Card Image Integration:** Seamlessly incorporated 4 new high-resolution `.jfif` card images with Cloudinary CDN optimization matching exact card headlines.
3. **Automated Google Sheets Lead System:** Designed, tested, and deployed an automated Google Apps Script pipeline capturing every form lead into categorized spreadsheet tabs in real-time.
4. **SSL / Mobile Security Resolution:** Diagnosed the exact DNS collision causing the *"Your connection is not private"* error on mobile devices and provided the fix.
5. **Hero Vertical Reel Video Player:** Integrated the official vertical Instagram/Reel-style video (`ipvs-reel.mp4`) into the Hero section with silent autoplay, interactive sound toggle, and a fullscreen modal.
6. **Google Ads Search Terms Audit & Exhibitor Strategy:** Deeply analyzed the Google Ads Search Terms report, identified a 71% budget waste on broad match queries, and developed an exhibitor-closing keyword strategy.

---

## 1. Visual Density & Vertical Spacing Reduction

### The Problem
The website previously had excessive vertical voids (`py-16`, `py-20`, `space-y-14`) and massive inner card paddings, making the site feel sparse and requiring excessive scrolling to see key exhibition information.

### Implemented Solutions
- **Section Containers:** Reduced vertical padding across all major sections from `py-10 sm:py-14` / `py-16 sm:py-20` down to `py-8 sm:py-10`.
- **Hero Sections (Visitor & Exhibitor):** Reduced from `pt-28 sm:pt-32 pb-16 sm:pb-20` to `pt-24 sm:pt-28 pb-10 sm:pb-12` for immediate above-the-fold access to value propositions.
- **Header Spacing:** Tightened from `space-y-10 sm:space-y-14` down to `space-y-6 sm:space-y-8`.
- **Inner Card Padding:** Reduced from `p-8 sm:p-12` to `p-5 sm:p-6` (secondary cards `p-4 sm:p-5`), increasing information density while preserving legibility.
- **Affected Files:**
  - `src/pages/HomePage.tsx`
  - `src/pages/VisitorPage.tsx`
  - `src/pages/ExhibitorPage.tsx`
  - `src/components/home/AboutSection.tsx`
  - `src/components/home/PastHighlightsSection.tsx`
  - `src/components/common/PastExhibitionGallery.tsx`
  - `src/components/home/AdvisoryCommitteeSection.tsx`
  - `src/components/home/EsteemedExhibitorsSection.tsx`
  - `src/components/home/LatestNewsSection.tsx`
  - `src/components/home/MediaPartnersSection.tsx`
  - `src/components/common/FaqAccordion.tsx`

---

## 2. Differentiated Card Border Architecture

### The Problem
Almost every card on the website previously shared an identical `border border-slate-200`, causing visual monotony and harsh nested boxes (especially when cards had inner image containers, logo containers, and tag pills).

### Implemented Solutions
We established a clear, editorial border hierarchy:
1. **Borderless Floating Cards with Soft Elevation:**
   - *Style:* `border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1`
   - *Applied To:* Highlights section, Photo Gallery, Exhibitor Logo grid, News/Blog tiles, and Bento opportunity cards.
2. **Top Accent Borders (`border-t-4`):**
   - *Style:* `border-t-4 border-t-[#1E65FF] / #00D2FF / emerald-500 border-x-0 border-b-0`
   - *Applied To:* Strategic pillars (Why Visit?), Media Partners cards, and Technology Showcase categories.
3. **Dynamic Left Accent Borders (`border-l-4`):**
   - *Style:* `border-l-4 border-l-[#1E65FF] border-y-0 border-r-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]`
   - *Applied To:* Milestone boxes (About Us), Visitor Perks, and interactive FAQ items (active opened item highlights in blue while collapsed remain clean).
4. **Borderless Category Chips:**
   - Replaced outlined boxes around 30+ category items with soft borderless pills (`bg-slate-100/70`).

---

## 3. 4 New Card Images Integration

### Assets Added & Mapped
We uploaded the 4 new `.jfif` images to Cloudinary CDN with automatic format and quality compression (`f_auto,q_auto`), committed local copies to `public/newcardimages/`, and mapped them to their exact headline matches on the **Exhibitor Page**:

| Image File | Destination Headline & Location | CDN URL |
| :--- | :--- | :--- |
| `4. Expand Your Market Presence.jfif` | **4. Expand Your Market Presence** (Exhibitor Benefits, Card 04) | `https://res.cloudinary.com/lh8mihme/image/upload/f_auto,q_auto/v1789117022/ipvs-website/newcardimages/4._Expand_Your_Market_Presence.jpg` |
| `Industrial Pumps.jfif` | **Industrial Pumps** (Technology Showcase, Card 01) | `https://res.cloudinary.com/lh8mihme/image/upload/f_auto,q_auto/v1789117025/ipvs-website/newcardimages/Industrial_Pumps.jpg` |
| `Industrial Valve Automation.jfif` | **Industrial Valve Automation** (Technology Showcase, Card 02) | `https://res.cloudinary.com/lh8mihme/image/upload/f_auto,q_auto/v1789117025/ipvs-website/newcardimages/Industrial_Valve_Automation.jpg` |
| `Automation & Instrumentation.jfif` | **Automation & Instrumentation** (Technology Showcase, Card 03) | `https://res.cloudinary.com/lh8mihme/image/upload/f_auto,q_auto/v1789117023/ipvs-website/newcardimages/Automation___Instrumentation.jpg` |

- **Files Updated:**
  - `src/data/cloudinaryMap.json`
  - `src/pages/ExhibitorPage.tsx`

---

## 4. Automated Google Sheets Lead Capture Automation

### System Architecture
Every form on the website now delivers lead data in real-time to Google Sheets:
1. **Google Apps Script Web App:**
   - Script created and stored at `scripts/google_apps_script.js`.
   - **Live Webhook URL:** `https://script.google.com/macros/s/AKfycbx9bdhZcGLXFApXJzxFd9DR5tgjRyegFhA2cffAfLaab1TC05YYOPBXeZpKzM2VAEjD/exec`
   - Automatically formats headers (`#0D327B` dark navy, white text, bold, frozen row).
   - Auto-sorts leads into 5 organized tabs:
     - **All Leads** (Master chronological log)
     - **Exhibitors** (Stall requests & required square meters)
     - **Visitors** (Free trade passes & sector interests)
     - **Sponsorship** (Tier inquiries & corporate sponsors)
     - **Contact & Inquiries** (General contact desk & newsletter signups)
2. **Dual-Layer Redundancy:**
   - **Server-Side (`api/send-lead.ts`):** Vercel serverless function forwards the JSON payload to Google Sheets and dispatches lead notifications via SMTP/Nodemailer to `info@orbitexhibitions.com`.
   - **Client-Side Fallback (`src/services/leadService.ts`):** Direct browser webhook dispatch ensures leads are captured even during network delays or local development.
3. **Fields Captured:**
   - Timestamp (IST), Form Type, Source, Full Name, First Name, Last Name, Email, Mobile, Company, Designation, City, Website, Stall Size, Sponsorship Tier, Sector Interest, How Did You Hear About Us, Message.
4. **Validation:**
   - Live end-to-end test submission was triggered and verified with HTTP 200 response:
     ```json
     {"status":"success","message":"Lead recorded successfully in Google Sheets","timestamp":"11/09/2026 15:46:58","category":"Visitors"}
     ```

---

## 5. Mobile SSL Diagnostic: "Your Connection is Not Private"

### Investigation Findings
- When testing on desktop or typing `https://www.ipvs.in`, the website opens with HTTP 200 and a valid SSL certificate.
- When mobile users type `ipvs.in` (without `www.`), mobile browsers show **`NET::ERR_CERT_COMMON_NAME_INVALID`**.
- **DNS Audit Result:**
  ```text
  Name: ipvs.in (apex)
  Addresses:
    216.150.1.1       <-- Vercel Edge IP (Correct)
    107.180.112.97    <-- Old GoDaddy Server IP (CONFLICTING!)
  ```
- Because the old GoDaddy IP is still present in DNS, Let's Encrypt / Vercel cannot verify domain ownership to issue the SSL certificate for `ipvs.in`, causing the mobile privacy warning.

### Resolution Steps
1. Log into **GoDaddy DNS Management** for `ipvs.in`.
2. Locate and **DELETE** the old A record pointing to `107.180.112.97`.
3. In **Vercel Dashboard** (Settings → Domains), click **Refresh** on `ipvs.in`. Vercel will issue the SSL certificate in 60 seconds.

---

## 6. Hero Section: Vertical Reel Video Autoplay

### Implementation Details
Replaced the static keynote conference speaker photo on the home page with an interactive **Vertical Reel Video Player**:
1. **Native HTML5 Autoplay:**
   - `<video autoPlay loop muted playsInline preload="auto">` ensures 100% reliable, silent autoplay across iPhone (iOS Safari), Android (Chrome), and desktop browsers without permission blocks.
2. **Vertical Aspect Ratio (`aspect-[9/16]`):**
   - Housed in a smartphone-style rounded glass frame (`rounded-[2rem] sm:rounded-[2.5rem]` with 4px subtle border and soft drop shadow).
3. **Dual CDN & Local Delivery:**
   - Primary: High-speed Cloudinary CDN video stream with adaptive bitrate (`https://res.cloudinary.com/lh8mihme/video/upload/f_auto,q_auto/v1789126184/wkbci960unajh9puvtys.mp4`).
   - Fallback: Local stream (`/ipvs-reel.mp4`).
4. **Interactive Controls:**
   - **Sound Toggle (`Volume2` / `VolumeX`):** One-tap button to unmute/mute audio directly on the hero card.
   - **Live Pulsing Badge:** Red pulsating dot with `IPVS REEL` label.
   - **Fullscreen Theater Modal:** Clicking the expand button or tapping the video opens the reel in a modal with full playback and audio controls.
   - **Exhibitors Badge:** Maintained the floating "100+ Exhibitors" badge.
- **Files Updated:**
  - `src/components/home/Hero.tsx`
  - `public/ipvs-reel.mp4`

---

## 7. Google Ads Search Terms Audit & Optimization

### Search Report Audit (152 Search Terms, 466 Impressions, 36 Clicks, ₹3,401.47 Spend)
- **The Core Issue (71% Wasted Spend):**
  - ₹2,414.43 (71% of total spend) was spent on people searching for single replacement pumps, repair shops, or specific manufacturer contact info (`l&t valves`, `wilo pumps`, `grundfos pumps india pvt ltd`, `armstrong fire pumps`, `sant valve jalandhar`).
  - These users bounce immediately when they realize IPVS is an exhibition, resulting in **0 conversions**.
- **What Worked (29% High-Value Intent):**
  - ₹987.04 was spent on competitor and peer exhibition queries (`valve world expo`, `valve world expo india 2026`, `india international pumps valves expo`).
  - These searchers are qualified B2B buyers and exhibitors looking for trade shows.

### Strategy for Exhibitor Closings
To generate high-value exhibitor stall bookings (stalls ranging from ₹1 Lakh to ₹10 Lakhs+), we provided:
1. **Targeted Commercial Keyword List (Phrase & Exact Match Only):**
   - Focuses strictly on `stall booking`, `exhibitor registration`, `exhibition space booking`, and competitor trade shows.
2. **Negative Keywords Blacklist:**
   - Blocks retail shoppers, technicians, students, and job seekers (`price`, `catalog`, `dealer`, `spare parts`, `repair`, `jobs`, `free pass`, `ticket price`).
3. **Ad Copy & Landing Page Guidelines:**
   - Direct all exhibitor ads to `https://www.ipvs.in/exhibitor` instead of the general homepage.
   - Enable Call Assets (+91 22 2410 2801) and Sitelink extensions.

---

## 8. Build, Git & Production Deployment Status

- **Build Verification:** `npm run build` (`tsc && vite build`) executed and passed with **0 errors**.
- **Git Author Alignment:** All commits authored with `tibro-orbit <304306621+tibro-orbit@users.noreply.github.com>` to ensure Vercel automated CI/CD deployments are never blocked.
- **Remote Synchronization:** Both `origin` (`https://github.com/ShaunsCuriosityLearnings/ipvs-website.git`) and `orbit` (`https://github.com/tibro-orbit/IPVS-Website.git`) are up to date on branch `main`.
- **Live Check:** Live website verified on Vercel edge and functioning properly.
