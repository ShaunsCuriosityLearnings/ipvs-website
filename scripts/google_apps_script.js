/**
 * ======================================================================================
 * IPVS 2026 - AUTOMATED GOOGLE SHEETS LEAD CAPTURE SYSTEM
 * ======================================================================================
 * This Google Apps Script automatically captures every form submission from the
 * IPVS 2026 website and logs all fields in real-time into your Google Spreadsheet.
 * 
 * FEATURES:
 * 1. Categorized Tabs:
 *    - "All Leads" (Master chronological log of every lead)
 *    - "Exhibitors" (Exhibitor stall bookings & area inquiries)
 *    - "Visitors" (Visitor trade pass registrations)
 *    - "Sponsorship" (Corporate and tier sponsorship inquiries)
 *    - "Contact & Inquiries" (Contact messages & newsletter signups)
 * 2. Auto-Initialization:
 *    - Auto-creates tabs if missing.
 *    - Formats headers with professional styling (#0D327B dark navy, white text, bold).
 *    - Freezes the top header row and auto-resizes columns for instant readability.
 * 3. Robust Error Handling & CORS support for seamless web app integration.
 * 
 * ======================================================================================
 * SETUP INSTRUCTIONS:
 * ======================================================================================
 * 1. Open Google Sheets (https://sheets.google.com) and create a new blank sheet.
 *    Name it: "IPVS 2026 Website Leads"
 * 2. In the top menu, click: Extensions -> Apps Script
 * 3. Delete any existing code in the editor, paste this entire file, and click Save (Floppy icon).
 * 4. (Optional) Run `initialSetup` from the function dropdown and click "Run" to pre-create
 *    all formatted tabs. Grant Google permissions when prompted.
 * 5. Click the blue "Deploy" button (top right) -> "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Configure:
 *    - Description: "IPVS 2026 Lead Automation Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (CRITICAL: Must be "Anyone" so the website can submit leads)
 * 8. Click "Deploy".
 * 9. Copy the generated "Web app URL" (ends in `/exec`).
 * 10. Add the URL to your project:
 *     - In `.env` (local and Vercel):
 *       GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 *       VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 * ======================================================================================
 */

// Master headers definition for the spreadsheet
var HEADERS = [
  "Timestamp (IST)",
  "Form Type",
  "Source / Origin",
  "Full Name",
  "First Name",
  "Last Name",
  "Email Address",
  "Mobile / Phone",
  "Company / Organization",
  "Designation / Title",
  "City",
  "Website",
  "Stall Size Required",
  "Sponsorship Tier",
  "Sector / Interest",
  "How Did You Hear About Us?",
  "Message / Requirements"
];

/**
 * Handle incoming POST requests from the website
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other processes to finish before acquiring lock
  lock.tryLock(10000);

  try {
    var rawData = e.postData ? e.postData.contents : "";
    var data = {};

    if (rawData) {
      try {
        data = JSON.parse(rawData);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var istTimestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");

    // Extract and normalize all fields
    var formType = (data.formType || "general").toString().toLowerCase();
    var source = data.source || "Website Form";
    var firstName = data.firstName || "";
    var lastName = data.lastName || "";
    var fullName = (firstName + " " + lastName).trim() || data.name || "N/A";
    var email = data.email || "N/A";
    var mobile = data.mobile || data.phone || "N/A";
    var company = data.company || "N/A";
    var designation = data.designation || "N/A";
    var city = data.city || "N/A";
    var website = data.website || "N/A";
    var stallSize = data.stallSize || "N/A";
    var sponsorshipTier = data.sponsorshipTier || "N/A";
    var sectorInterest = data.sectorInterest || "N/A";
    var heardFrom = data.heardFrom || "N/A";
    var message = data.message || "N/A";

    var rowValues = [
      istTimestamp,
      formType.toUpperCase(),
      source,
      fullName,
      firstName,
      lastName,
      email,
      mobile,
      company,
      designation,
      city,
      website,
      stallSize,
      sponsorshipTier,
      sectorInterest,
      heardFrom,
      message
    ];

    // 1. Always record in "All Leads" master sheet
    var masterSheet = getOrCreateSheet(spreadsheet, "All Leads", "#0D327B");
    masterSheet.appendRow(rowValues);
    formatNewRow(masterSheet);

    // 2. Also record in dedicated category sheet
    var targetTabName = "Contact & Inquiries";
    var tabThemeColor = "#D97706";

    if (formType === "exhibitor") {
      targetTabName = "Exhibitors";
      tabThemeColor = "#1E65FF";
    } else if (formType === "visitor") {
      targetTabName = "Visitors";
      tabThemeColor = "#059669";
    } else if (formType === "sponsorship") {
      targetTabName = "Sponsorship";
      tabThemeColor = "#7C3AED";
    }

    var categorySheet = getOrCreateSheet(spreadsheet, targetTabName, tabThemeColor);
    categorySheet.appendRow(rowValues);
    formatNewRow(categorySheet);

    // Return successful JSON response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded successfully in Google Sheets",
      timestamp: istTimestamp,
      category: targetTabName
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle incoming GET requests (Health check / testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "IPVS 2026 Google Sheets Lead Automation webhook is active and ready to receive form leads.",
    timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss")
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper to retrieve or create and format a specific sheet tab
 */
function getOrCreateSheet(spreadsheet, sheetName, headerColor) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    
    // Set headers
    sheet.appendRow(HEADERS);
    
    // Format Header Row
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setBackground(headerColor || "#0D327B");
    headerRange.setFontSize(10);
    headerRange.setFontFamily("Arial");
    headerRange.setVerticalAlignment("middle");
    headerRange.setHorizontalAlignment("center");
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Set row height for header
    sheet.setRowHeight(1, 38);
    
    // Auto-fit initial columns
    for (var i = 1; i <= HEADERS.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

/**
 * Format newly appended row for clean aesthetics
 */
function formatNewRow(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var range = sheet.getRange(lastRow, 1, 1, HEADERS.length);
    range.setFontFamily("Arial");
    range.setFontSize(9);
    range.setVerticalAlignment("middle");
    sheet.setRowHeight(lastRow, 28);
    
    // Alternating light background on even rows
    if (lastRow % 2 === 0) {
      range.setBackground("#F8FAFC");
    } else {
      range.setBackground("#FFFFFF");
    }
  }
}

/**
 * Run this function once from the Apps Script editor to pre-initialize all tabs!
 */
function initialSetup() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  getOrCreateSheet(spreadsheet, "All Leads", "#0D327B");
  getOrCreateSheet(spreadsheet, "Exhibitors", "#1E65FF");
  getOrCreateSheet(spreadsheet, "Visitors", "#059669");
  getOrCreateSheet(spreadsheet, "Sponsorship", "#7C3AED");
  getOrCreateSheet(spreadsheet, "Contact & Inquiries", "#D97706");
  
  Logger.log("All IPVS 2026 Google Sheet tabs have been successfully initialized!");
}
