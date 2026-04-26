# ZackNode Systems — Landing Page

Premium Dubai-based agency landing page with waiting list → Google Sheets.

**Stack:** React + Vite · TypeScript · Tailwind CSS · Framer Motion · React Hook Form + Zod · Google Sheets (via Apps Script)

---

## How the Google Sheets integration works

```
User fills form → React app → Google Apps Script Web App → Google Sheet
```

No database. No backend server. No monthly cost.
Every submission appears as a new row in your spreadsheet instantly.

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

---

### 2. Google Sheets Setup (one-time, ~5 minutes)

#### Step 1 — Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it **ZackNode Waiting List** (or anything you like)
3. Leave it open — the Apps Script will auto-create the headers on first run

#### Step 2 — Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. A new tab opens with a code editor
3. **Delete** all existing code in the editor

#### Step 3 — Paste the script

1. Open `google-apps-script/Code.gs` from this project
2. Copy the entire contents
3. Paste it into the Apps Script editor
4. Click **Save** (the 💾 icon or Ctrl+S)

#### Step 4 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Type" → select **Web app**
3. Fill in the settings:
   - **Description:** ZackNode Waiting List API
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone ← this is required
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → Allow
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

#### Step 5 — Add the URL to your project

```bash
cp .env.example .env
```

Open `.env` and paste your URL:

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

---

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:5173. Fill in the form — a new row will appear in your Google Sheet within seconds.

---

## Redeploying after script changes

If you ever edit Code.gs, you must create a new deployment for changes to take effect:

1. Apps Script editor → Deploy → Manage deployments
2. Click the pencil edit icon
3. Change Version to New version
4. Click Deploy

The URL stays the same — no changes needed in .env

---

## What your Sheet looks like after submissions

| ID | Full Name | Email | Service Interest | Submitted At | Source |
|---|---|---|---|---|---|
| ZN-LX4K2A | Ahmed Al Mansouri | ahmed@company.ae | Software | 2024-03-15T... | Website |
| ZN-LX4K3B | Sara Yilmaz | sara@firma.com | All | 2024-03-15T... | Website |

- **ID** — unique auto-generated reference per lead
- **Duplicate emails** — silently ignored (user still sees success)
- **Headers and styling** — auto-applied on first submission (gold on black, frozen row)

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── WaitingForm.tsx       (sends data via sheetsClient)
│   ├── SuccessModal.tsx
│   ├── AboutContact.tsx
│   └── Footer.tsx
├── pages/
│   └── Home.tsx
└── lib/
    ├── sheetsClient.ts       (Google Sheets integration)
    └── validation.ts         (Zod schemas)
google-apps-script/
└── Code.gs                   (paste this into Apps Script editor)
```

---

## Build for Production

```bash
npm run build
```

Deploy the dist/ folder to Vercel or Netlify. Add VITE_APPS_SCRIPT_URL in your host's environment variable settings.

---

## Customisation

| What to change | Where |
|---|---|
| Brand name / logo | Navbar.tsx, Footer.tsx, index.html |
| Hero headline | Hero.tsx |
| Service cards | Services.tsx → services array |
| Colors | tailwind.config.js → colors.gold / colors.obsidian |
| Sheet tab name | Code.gs → const SHEET_NAME |
| Contact email | SuccessModal.tsx → href="mailto:..." |

---

*Built for ZackNode Systems · Dubai, UAE*
