# Nexora — Demo SaaS Dashboard

A fully-mocked SaaS dashboard built to showcase custom software development capabilities. Clean, modern UI (React + Tailwind), animated Recharts visualizations, a searchable/sortable data table, and full English ↔ Arabic (RTL) language support — all running on hardcoded frontend data with **no backend, database, or real authentication**.

## Tech stack

- **React 19** + **Vite** — app shell and dev/build tooling
- **Tailwind CSS v4** — styling, with logical properties (`ps-`, `pe-`, `start-`, `end-`) for automatic RTL mirroring
- **Recharts** — the revenue overview chart on the dashboard
- **react-i18next** — EN/AR translations, with a small context wrapper that flips `dir`/`lang` on `<html>` for full RTL layout
- **react-router-dom** — client-side routing between Login, Dashboard, Customers/Reports (placeholders), and Settings
- **lucide-react** — icon set

All data lives in [src/data/mockData.js](src/data/mockData.js) — stats, the 6-month chart series, and the 15-row orders table (with bilingual company names). Nothing is fetched from a network; nothing is persisted. "Login" and "Save" actions are simulated for demo purposes only.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Click **Sign in** on the login screen (any input, or none, works) to reach the dashboard. Use the language switcher in the top-right corner (or on the Settings page) to toggle Arabic/RTL mode.

## Project structure

```
src/
  components/     Reusable UI: Sidebar, Topbar, StatCard, RevenueChart, DataTable, StatusBadge, LanguageToggle
  context/        AuthContext (fake login state), LanguageContext (i18n + dir), ToastContext
  data/           mockData.js — all hardcoded demo data
  i18n/           i18next setup + en.json / ar.json translation resources
  layouts/        DashboardLayout (sidebar + topbar shell used by all authenticated pages)
  pages/          Login, Dashboard, Settings, ComingSoon
```

## Building for production

```bash
npm run build
```

Outputs a static site to `dist/`.

## Deploying to Vercel

**Option A — Vercel CLI**

```bash
npm install -g vercel
vercel
```

Follow the prompts (framework preset: Vite). Run `vercel --prod` to push to production once you're happy with the preview.

**Option B — Drag and drop**

1. Run `npm run build` locally.
2. Go to [vercel.com/new](https://vercel.com/new) and drag the generated `dist/` folder onto the upload area.
3. Vercel will host it instantly on a free-tier URL.

**Option C — Git integration**

Push this project to a GitHub/GitLab/Bitbucket repo, then import it at [vercel.com/new](https://vercel.com/new). Vercel auto-detects Vite (build command `npm run build`, output directory `dist`) — no extra config needed.

## Deploying to Netlify

```bash
npm run build
```

Then either drag the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo in the Netlify dashboard with build command `npm run build` and publish directory `dist`.
