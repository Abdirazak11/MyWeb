/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ZackNode Systems — Google Apps Script
 *  
 *  PASTE THIS ENTIRE FILE into script.google.com
 *  Then deploy it as a Web App (see README for step-by-step).
 *
 *  This script:
 *  1. Receives a POST request from the React form
 *  2. Validates the incoming data
 *  3. Appends a new row to your Google Sheet
 *  4. Returns a JSON response
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── CONFIGURATION ─────────────────────────────────────────────────────────────
// Change this to the name of the sheet tab inside your spreadsheet.
// Default is "Sheet1" — rename it to "Waiting List" if you prefer.
const SHEET_NAME = 'Waiting List';

// Column headers — these will be written on the first run automatically.
const HEADERS = ['ID', 'Full Name', 'Email', 'Service Interest', 'Submitted At', 'Source'];

// ── MAIN HANDLER ──────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();

    // Parse incoming form data
    const params = e.parameter || {};
    const fullName       = (params.full_name        || '').toString().trim();
    const email          = (params.email             || '').toString().trim().toLowerCase();
    const serviceInterest = (params.service_interest || '').toString().trim();
    const submittedAt    = (params.submitted_at      || new Date().toISOString()).toString();

    // Server-side validation
    if (!fullName || fullName.length < 2) {
      return jsonResponse({ success: false, error: 'Invalid name.' });
    }
    if (!isValidEmail(email)) {
      return jsonResponse({ success: false, error: 'Invalid email address.' });
    }
    const validServices = ['Software', 'Design', 'Automation', 'All'];
    if (!validServices.includes(serviceInterest)) {
      return jsonResponse({ success: false, error: 'Invalid service selection.' });
    }

    // Check for duplicate email
    if (emailExists(sheet, email)) {
      // Return success anyway — user already registered, no need to alarm them
      return jsonResponse({ success: true, note: 'duplicate' });
    }

    // Generate a short unique ID
    const id = 'ZN-' + Date.now().toString(36).toUpperCase();

    // Append the row
    sheet.appendRow([
      id,
      fullName,
      email,
      serviceInterest,
      submittedAt,
      'Website',
    ]);

    return jsonResponse({ success: true, id: id });

  } catch (err) {
    console.error('ZackNode Apps Script error:', err.toString());
    return jsonResponse({ success: false, error: 'Server error: ' + err.toString() });
  }
}

// Handle GET requests (useful for testing the endpoint is live)
function doGet(e) {
  return jsonResponse({ 
    status: 'ZackNode Systems — Waiting List API is live.',
    timestamp: new Date().toISOString()
  });
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

/**
 * Returns the target sheet, creating it and adding headers if it doesn't exist.
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Add headers if the sheet is empty
  if (sheet.getLastRow() === 0) {
    const headerRow = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRow.setValues([HEADERS]);

    // Style the header row
    headerRow.setBackground('#0A0A0A');
    headerRow.setFontColor('#D4AF37');
    headerRow.setFontWeight('bold');
    headerRow.setFontSize(11);
    sheet.setFrozenRows(1);

    // Set column widths
    sheet.setColumnWidth(1, 120);  // ID
    sheet.setColumnWidth(2, 200);  // Full Name
    sheet.setColumnWidth(3, 260);  // Email
    sheet.setColumnWidth(4, 160);  // Service Interest
    sheet.setColumnWidth(5, 200);  // Submitted At
    sheet.setColumnWidth(6, 100);  // Source
  }

  return sheet;
}

/**
 * Checks if an email already exists in column 3 (Email).
 */
function emailExists(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false; // Only headers, no data

  const emailColumn = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
  return emailColumn.some(function(row) {
    return row[0].toString().toLowerCase() === email;
  });
}

/**
 * Basic email validation.
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Returns a JSON ContentService response with CORS headers.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
