// Post-build SEO prerender.
// For every route it writes a static HTML file into dist/ with that page's full <head>
// (title, description, keywords, canonical, Open Graph, Twitter, JSON-LD) and crawlable
// fallback content inside #root. Vercel (cleanUrls) serves /about from dist/about.html,
// so search engines and social previews get complete tags without running JavaScript.
// Tags carry data-rh="true", so react-helmet-async takes them over on the client.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSeo, buildHeadTags, allSeoPaths } from '../src/data/seo.js';
import { SITE } from '../src/config/site.js';
import { studyCountries } from '../src/data/studyCountries.js';
import { mbbsCountries } from '../src/data/mbbsCountries.js';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const START = '<!--seo:start-->';
const END = '<!--seo:end-->';
if (!template.includes(START) || !template.includes(END)) {
  throw new Error('index.html is missing the <!--seo:start--> / <!--seo:end--> markers');
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderTag({ tag, attrs = {}, children }) {
  const a = Object.entries({ ...attrs, 'data-rh': 'true' })
    .map(([k, v]) => `${k.toLowerCase()}="${esc(v)}"`)
    .join(' ');
  if (tag === 'meta' || tag === 'link') return `<${tag} ${a} />`;
  if (tag === 'script') return `<${tag} ${a}>${String(children).replace(/</g, '\\u003c')}</${tag}>`;
  return `<${tag} ${a}>${esc(children)}</${tag}>`;
}

const navLinks = [
  ['/', 'Home'],
  ['/mbbs-abroad', 'MBBS Abroad'],
  ['/study-abroad', 'Study Abroad'],
  ['/study-in-uk', 'Study in UK'],
  ['/uk-masters', 'UK Master’s'],
  ['/scholarships', 'Scholarships'],
  ['/education-loan', 'Education Loan'],
  ['/student-visa', 'Student Visa'],
  ['/services', 'Services'],
  ['/exams', 'Exams'],
  ['/events', 'Events'],
  ['/blog', 'Blog'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/free-counselling', 'Free Counselling'],
];

function fallbackBody(seo) {
  const links = (list) => list.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('');
  const faqs = seo.jsonLd['@graph'].find((n) => n['@type'] === 'FAQPage');
  return `
    <div class="prerender">
      <header><a href="/">${esc(SITE.name)}</a> · <a href="tel:${SITE.phoneIntl}">${esc(SITE.phoneDisplay)}</a></header>
      <nav aria-label="Main"><ul>${links(navLinks)}</ul></nav>
      <main>
        <h1>${esc(seo.h1)}</h1>
        <p>${esc(seo.intro)}</p>
        ${faqs ? `<section><h2>Frequently Asked Questions</h2>${faqs.mainEntity.map((q) => `<h3>${esc(q.name)}</h3><p>${esc(q.acceptedAnswer.text)}</p>`).join('')}</section>` : ''}
      </main>
      <footer>
        <h2>MBBS Abroad</h2><ul>${links(mbbsCountries.map((c) => [`/mbbs-in-${c.slug}`, `MBBS in ${c.name}`]))}</ul>
        <h2>Study Abroad</h2><ul>${links(studyCountries.map((c) => [`/study-in-${c.slug}`, `Study in ${c.shortName}`]))}</ul>
        <p>${esc(SITE.name)} — Overseas Education Consultants in Warangal &amp; Hyderabad, Telangana. Call ${esc(SITE.phoneDisplay)}.</p>
      </footer>
    </div>`;
}

function render(head, body) {
  const [before, rest] = template.split(START);
  const after = rest.split(END)[1];
  return `${before}${START}\n    ${head}\n    ${END}${after}`.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

let count = 0;
for (const path of allSeoPaths()) {
  const seo = getSeo(path);
  const head = buildHeadTags(seo).map(renderTag).join('\n    ');
  const file = path === '/' ? join(dist, 'index.html') : join(dist, `${path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(head, fallbackBody(seo)));
  count += 1;
}

// 404 page (served by Vercel for unknown URLs; the SPA renders the NotFound view).
const notFoundHead = [
  `<title data-rh="true">Page not found | ${esc(SITE.name)}</title>`,
  '<meta name="robots" content="noindex, follow" data-rh="true" />',
].join('\n    ');
writeFileSync(join(dist, '404.html'), render(notFoundHead, '<div class="prerender"><h1>Page not found</h1><p><a href="/">Go to the home page</a></p></div>'));

console.log(`Prerendered ${count} pages + 404.html`);
