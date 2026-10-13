# Sri Vidhya Overseas — Website

React + Vite website for **Sri Vidhya Overseas**, overseas education consultants in Warangal & Hyderabad
(MBBS abroad, UK education, Master’s, admissions). Built from the SEO blueprint in `../reference`.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # sitemap + robots → vite build → SEO prerender of all 52 pages
npm run preview   # serve the production build
```

## Deploy on Vercel

1. Push the `website` folder to GitHub (or run `npx vercel` inside it).
2. In Vercel → **Add New Project** → import the repo. If the repo root is the parent folder, set
   **Root Directory = `website`**.
3. Everything else is read from `vercel.json` (framework Vite, `npm run build`, output `dist`).
4. Add your domain in Vercel → Settings → Domains, then set the same domain in `src/config/site.js` → `url`
   and redeploy (canonical URLs, sitemap, robots.txt and JSON-LD all use it).
5. Submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console and Bing Webmaster Tools, and paste the
   verification codes into `googleSiteVerification` / `bingSiteVerification`.

`vercel.json` provides clean URLs (`/about` → `dist/about.html`), no trailing slashes, security headers
(HSTS, nosniff, frame-options, referrer & permissions policy), long-term caching for hashed assets,
and 301 redirects for common alternate URLs (`/about-us`, `/contact-us`, `/blogs`, `/loans`, …).
Unknown URLs get a real 404 status with `404.html`.

## SEO architecture

- **`src/data/seo.js`** — single source of truth: per-page title (≤ 65 chars), meta description (≤ 160),
  keywords, canonical, hreflang, robots / googlebot / bingbot, geo tags, Open Graph, Twitter cards and a
  schema.org **JSON-LD @graph** (WebSite, EducationalOrganization, LocalBusiness offices, WebPage /
  CollectionPage / AboutPage / ContactPage, BreadcrumbList, FAQPage, Service, ItemList, BlogPosting).
- **`scripts/prerender.mjs`** — after `vite build`, writes a static HTML file for every route with the full
  `<head>` and crawlable fallback content (H1, intro, FAQs, internal links). Search engines and social
  previews see everything without running JavaScript; React takes over in the browser.
- **`scripts/generate-sitemap.mjs`** — `sitemap.xml` (lastmod, changefreq, priority, image tags) and `robots.txt`.
- `public/` — `og-image.jpg` (1200×630), favicons, app icons, `site.webmanifest`, `llms.txt`, `humans.txt`.

## Before going live — update these

All in `src/config/site.js` (empty values are simply hidden — nothing is invented):

- `url` — the live domain
- `email`, `hours`, `foundingYear`
- `offices[]` — street `address`, `postalCode`, exact `geo` coordinates and `mapEmbed` for Warangal & Hyderabad
  (these strengthen the LocalBusiness structured data and Google Business Profile matching)
- `social` profile links, `twitterHandle`
- `googleSiteVerification`, `bingSiteVerification`
- `formEndpoint` — optional JSON endpoint (Formspree / Google Apps Script / CRM). Without it, every
  enquiry opens WhatsApp (8500805336) with the details pre-filled.

Hero video: put `hero.mp4` (H.264, 1920×1080, no audio, < 6 MB) and `hero-poster.jpg` (first frame, < 200 KB)
in `public/`. Paths are set in `src/config/site.js` (`heroVideo`, `heroVideoWebm`, `heroPoster`). Until the
files exist, the hero shows its gradient background. The video is skipped for reduced-motion and data-saver users.

Also:

- `src/data/people.js` — add **genuine** testimonials and team members (sections stay hidden while empty)
- `src/pages/Events.jsx` — add real upcoming events to `upcoming`
- `src/components/Logo.jsx` + `public/og-image.jpg` / icons — swap in the official logo when available
- Review fees / visa rules in `src/data/*.js` every intake; have the legal pages reviewed

## Structure

```
src/
  config/site.js         business details (phone, offices, domain, verification codes)
  data/                  content + seo.js (all SEO), routes, FAQs, countries, locations, blog
  components/            Header (mega menu + mobile drawer), Footer, EnquiryForm, EnquiryModal (multi-step),
                         EligibilityChecker, Seo, shared UI
  pages/                 one file per page / template
  styles/                global.css (design system) + home.css (home page & polish)
scripts/                 generate-sitemap.mjs, prerender.mjs
public/                  static assets served as-is
vercel.json              Vercel build, headers, redirects
```
