// Generates public/sitemap.xml (with image + lastmod data). Runs before `vite build`.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/config/site.js';
import { getAllRoutes } from '../src/data/routes.js';
import { getSeo } from '../src/data/seo.js';
import { blogPosts } from '../src/data/blog.js';

const today = new Date().toISOString().slice(0, 10);
const postDates = Object.fromEntries(blogPosts.map((p) => [`/blog/${p.slug}`, p.updated || p.date]));

const rank = (path) => {
  if (path === '/') return ['1.0', 'weekly'];
  if (['/mbbs-abroad', '/study-abroad', '/study-in-uk', '/uk-masters'].includes(path)) return ['0.9', 'weekly'];
  if (/^\/(mbbs-in|study-in)-/.test(path) || /consultants|-warangal$|-hyderabad$/.test(path)) return ['0.8', 'monthly'];
  if (path.startsWith('/blog/')) return ['0.6', 'monthly'];
  if (/privacy|terms/.test(path)) return ['0.2', 'yearly'];
  return ['0.7', 'monthly'];
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const urls = getAllRoutes()
  .map((path) => {
    const [priority, changefreq] = rank(path);
    const seo = getSeo(path);
    return [
      '  <url>',
      `    <loc>${SITE.url}${path}</loc>`,
      `    <lastmod>${postDates[path] || today}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '    <image:image>',
      `      <image:loc>${SITE.url}/og-image.jpg</image:loc>`,
      `      <image:title>${esc(seo.h1)}</image:title>`,
      '    </image:image>',
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

writeFileSync(fileURLToPath(new URL('../public/sitemap.xml', import.meta.url)), xml);

// robots.txt always points at the configured domain.
const robots = `# ${SITE.name}
User-agent: *
Allow: /
Disallow: /404

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;
writeFileSync(fileURLToPath(new URL('../public/robots.txt', import.meta.url)), robots);

console.log(`sitemap.xml + robots.txt written (${getAllRoutes().length} URLs)`);
