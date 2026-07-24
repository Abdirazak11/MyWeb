const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string

if (!APPS_SCRIPT_URL) {
  console.warn('[ZackNode] VITE_APPS_SCRIPT_URL is not set.')
}

export interface WaitingListEntry {
  full_name: string
  email: string
  service_interest: 'Software' | 'Design' | 'Automation' | 'All'
}

export async function insertWaitingListEntry(
  entry: WaitingListEntry
): Promise<{ success: boolean; error?: string }> {
  if (!APPS_SCRIPT_URL) {
    return { success: false, error: 'Apps Script URL is not configured. Check your .env file.' }
  }

  try {
    const params = new URLSearchParams({
      full_name: entry.full_name,
      email: entry.email,
      service_interest: entry.service_interest,
      submitted_at: new Date().toISOString(),
    })

    const url = `${APPS_SCRIPT_URL}?${params.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })

    if (!response.ok) {
      return { success: false, error: 'Submission failed. Please try again.' }
    }

    const data = await response.json()
    return data.success
      ? { success: true }
      : { success: false, error: data.error || 'Submission failed.' }

  } catch (err) {
    console.error('[ZackNode] Sheets error:', err)
    return { success: false, error: 'Network error. Please try again.' }
  }
}