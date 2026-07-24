const SHEET_NAME = 'Waiting List';
const HEADERS = ['ID', 'Full Name', 'Email', 'Service Interest', 'Submitted At', 'Source'];

function doGet(e) {
  try {
    const params = e.parameter || {};

    if (!params.email) {
      return respond({ status: 'ZackNode Waiting List API is live.' });
    }

    const sheet       = getOrCreateSheet();
    const fullName    = (params.full_name       || '').toString().trim();
    const email       = (params.email            || '').toString().trim().toLowerCase();
    const service     = (params.service_interest || '').toString().trim();
    const submittedAt = (params.submitted_at     || new Date().toISOString()).toString();

    if (!fullName || fullName.length < 2)
      return respond({ success: false, error: 'Invalid name.' });

    if (!isValidEmail(email))
      return respond({ success: false, error: 'Invalid email.' });

    const validServices = ['Software', 'Design', 'Automation', 'All'];
    if (!validServices.includes(service))
      return respond({ success: false, error: 'Invalid service.' });

    if (emailExists(sheet, email))
      return respond({ success: true, note: 'duplicate' });

    const id = 'ZN-' + Date.now().toString(36).toUpperCase();
    sheet.appendRow([id, fullName, email, service, submittedAt, 'Website']);

    return respond({ success: true, id: id });

  } catch (err) {
    return respond({ success: false, error: err.toString() });
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    const headerRow = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRow.setValues([HEADERS]);
    headerRow.setBackground('#0A0A0A');
    headerRow.setFontColor('#D4AF37');
    headerRow.setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 120);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 260);
    sheet.setColumnWidth(4, 160);
    sheet.setColumnWidth(5, 200);
    sheet.setColumnWidth(6, 100);
  }
  return sheet;
}

function emailExists(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;
  const col = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
  return col.some(row => row[0].toString().toLowerCase() === email);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}