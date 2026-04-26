// ─────────────────────────────────────────────────────────────────────────────
//  ZackNode Systems — Google Sheets Integration
//
//  Architecture:
//    Browser → Google Apps Script Web App → Google Sheet
//
//  The browser cannot write to Google Sheets directly (CORS).
//  A Google Apps Script deployed as a "Web App" acts as the bridge.
//  It's free, serverless, and takes ~5 minutes to set up.
//
//  Setup instructions: see README.md → "Google Sheets Setup"
// ─────────────────────────────────────────────────────────────────────────────

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string

if (!APPS_SCRIPT_URL) {
  console.warn(
    '[ZackNode] VITE_APPS_SCRIPT_URL is not set. ' +
    'Follow the Google Sheets setup in README.md to get your URL.'
  )
}

// ─────────────────────────────────────────────
//  TYPE DEFINITIONS
// ─────────────────────────────────────────────
export interface WaitingListEntry {
  full_name: string
  email: string
  service_interest: 'Software' | 'Design' | 'Automation' | 'All'
}

// ─────────────────────────────────────────────
//  MAIN FUNCTION
// ─────────────────────────────────────────────
export async function insertWaitingListEntry(
  entry: WaitingListEntry
): Promise<{ success: boolean; error?: string }> {
  if (!APPS_SCRIPT_URL) {
    return { success: false, error: 'Apps Script URL is not configured. Check your .env file.' }
  }

  try {
    // Google Apps Script Web Apps only accept GET or POST with no-cors.
    // We send data as URL search params via a no-cors POST so the browser
    // doesn't block it. The Apps Script reads from e.postData or e.parameter.
    const params = new URLSearchParams({
      full_name: entry.full_name,
      email: entry.email,
      service_interest: entry.service_interest,
      submitted_at: new Date().toISOString(),
    })

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // 'no-cors' means we won't be able to read the response body,
      // but the request WILL go through. The sheet will be updated.
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

    // With no-cors, response.type === 'opaque' — we can't read status.
    // We optimistically treat any completed fetch as success.
    // The Apps Script handles all validation on its end.
    if (response.type === 'opaque' || response.ok) {
      return { success: true }
    }

    return { success: false, error: 'Submission failed. Please try again.' }
  } catch (err) {
    console.error('[ZackNode] Google Sheets submission error:', err)
    return { success: false, error: 'Network error. Please check your connection and try again.' }
  }
}
