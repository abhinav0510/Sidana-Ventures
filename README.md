# Sidana Ventures – Website + Sedana Platform Walkthrough

The Sidana Ventures marketing site with the Sedana fundraising platform walkthrough integrated behind the **Launch Platform** button. Plain HTML, CSS and JavaScript, no build step.

## Marketing site

`index.html` (Home, animated canvas globe), `about.html`, `approach.html`, `portfolio.html`, `insights.html`, `resources.html`, `platform.html` (Startup Login). Styles in `css/site.css`, behaviour in `js/site.js` (globe, scroll reveals, count-ups, word-by-word headlines, hover tilt, mouse parallax, nav, login + request-access / forgot-password modals).

**Flow:** any *Launch Platform* button → `platform.html` → Sign In → `app.html` (startup type → business details / pitch-deck upload → dashboard with guided tour). Logging out of the app returns to `platform.html`.

## Run it

Open `index.html` in any browser (the app itself is `app.html`), or serve the folder:

```bash
python -m http.server 8765
```

then visit http://localhost:8765. Internet access is needed once for the Inter font and the Lucide icon set (CDN).

## Walkthrough sequence

1. **Login** – "Continue with Google" (account chooser popup) or email + password. Sign-up and forgot-password screens are included.
2. **Startup type** – Pre-revenue / Medium size (₹50L – ₹5Cr) / Established (> ₹5Cr).
3. **Business details** – fill the form manually, or switch to *Upload pitch deck*: the drop zone simulates an upload and an AI extraction sequence, then shows the extracted details for review.
4. **Dashboard** – the guided tour starts automatically (8 spotlight steps). Replay it from the "Take a tour" button, the floating "Walkthrough" pill, or the user menu.

## Pages (sidebar)

Dashboard · My Profile (8 tabs) · Pitch Deck & Documents (incl. AI analysis) · Financial Details (7 tabs) · AI Studio (Pitch Deck Maker wizard, Teaser Maker, Other Tools, My Creations, Templates) · Investor Matches (filters, list/grid, detail panel) · Start Outreaching (campaign list, investor list, templates, AI personalization, analytics, activity log, 5-step launch wizard) · Meetings (calendar) · Credit Wallet · Settings (8 sections).

"My Activity" and "Managed Promotion" were removed from the sidebar; "Campaign" is renamed "Start Outreaching" everywhere.

## Popups and dropdowns

Buy Credits (plans + simulated payment), Unlock Contact (credit deduction), Upload Document, Invite Team Member, Schedule Meeting, Join Call, Book a Call, Share Link, Document Preview, Public Profile Preview, Contact Sales, confirm dialogs, edit-field modals, notifications dropdown, user menu, row action menus, All-Activity drawer, and a Ctrl+K command palette.

Credits, startup details and unlocked investors persist in `localStorage`. Log out from the user menu to restart the walkthrough from the login screen.

## Structure

```
index.html … platform.html   marketing pages
css/site.css, js/site.js      marketing styles/behaviour
app.html                      platform app shell
css/styles.css          design system + page styles
js/data.js              mock data
js/ui.js                modals, dropdowns, toasts, shared popups
js/auth.js              login / signup / onboarding
js/app.js               hash router, shell, sidebar, tour
js/pages/*.js           one module per page
```
