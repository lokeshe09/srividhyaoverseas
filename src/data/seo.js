// ============================================================================
// Single source of truth for SEO.
// Used by <Seo /> in the browser AND by scripts/prerender.mjs at build time, so
// every URL ships with complete, crawlable meta tags + JSON-LD in its static HTML.
// Plain JS only (no JSX / browser APIs) so Node can import it.
// ============================================================================
import { SITE } from '../config/site.js';
import { studyCountries, getStudyCountry } from './studyCountries.js';
import { mbbsCountries, getMbbsCountry } from './mbbsCountries.js';
import { locationPages, getLocationPage } from './locations.js';
import { blogPosts, getBlogPost } from './blog.js';
import { homeFaqs } from './faqs.js';
import { pageFaqs } from './pageFaqs.js';
import { services } from './services.js';

const url = (path = '/') => `${SITE.url}${path}`;
const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
export const OG_IMAGE = { url: url('/og-image.jpg'), width: 1200, height: 630, type: 'image/jpeg' };
export const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const BRAND_KW = ['Sri Vidhya Overseas', 'Sri Vidhya Overseas Warangal', 'Sri Vidhya Overseas Hyderabad'];
const LOCAL_KW = [
  'overseas education consultants in Warangal',
  'study abroad consultants in Warangal',
  'overseas education consultants in Hyderabad',
  'study abroad consultants in Hyderabad',
  'overseas education consultants in Telangana',
];
const MBBS_KW = [
  'MBBS abroad consultants in Telangana',
  'MBBS abroad consultants in Warangal',
  'MBBS abroad consultants in Hyderabad',
  'MBBS abroad for Indian students',
  'MBBS abroad fees',
  'MBBS abroad eligibility',
  'NMC approved universities abroad',
];
const UK_KW = [
  'UK education consultants in Hyderabad',
  'UK education consultants in Warangal',
  'study in UK consultants Telangana',
  'UK Masters consultants Hyderabad',
  'UK university admission consultants',
];

const uniq = (arr) => [...new Set(arr.filter(Boolean))];
const trim = (s, n) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

// Strict title rule: keep titles ≤ 65 characters so Google shows them in full.
// The brand is appended in full, short form, or not at all — whichever fits.
const TITLE_MAX = 65;
function withBrand(base) {
  const clean = base.replace(/\s*\|\s*Sri Vidhya Overseas$/, '');
  if (/Sri Vidhya/.test(clean)) return clean;
  if (`${clean} | ${SITE.name}`.length <= TITLE_MAX) return `${clean} | ${SITE.name}`;
  if (`${clean} | ${SITE.shortName}`.length <= TITLE_MAX) return `${clean} | ${SITE.shortName}`;
  return clean;
}

// ---------------------------------------------------------------------------
// Page definitions
// ---------------------------------------------------------------------------
const STATIC_PAGES = {
  '/': {
    title: 'Sri Vidhya Overseas | Overseas Education Consultants in Warangal & Hyderabad',
    description:
      'Explore MBBS abroad, UK Masters and overseas education with Sri Vidhya Overseas. Admission, scholarship & visa guidance in Warangal & Hyderabad. Call 8500805336.',
    h1: 'Overseas Education Consultants in Warangal & Hyderabad',
    keywords: [...BRAND_KW, ...LOCAL_KW, ...MBBS_KW.slice(0, 4), ...UK_KW.slice(0, 3), 'study abroad', 'student visa assistance', 'study abroad scholarships'],
    faqs: homeFaqs,
    pageType: 'WebPage',
    home: true,
  },
  '/study-abroad': {
    title: 'Study Abroad Destinations for Indian Students',
    description:
      'Compare study abroad destinations for Indian students — UK, USA, Canada, Australia, Ireland, Germany & more. Universities, costs, intakes and visas.',
    h1: 'Study Abroad Destinations',
    crumbs: [['Study Abroad', '/study-abroad']],
    keywords: ['study abroad for Indian students', 'best country to study abroad', 'study abroad consultants in Hyderabad', 'study abroad consultants in Warangal', ...studyCountries.map((c) => `study in ${c.shortName}`)],
    faqs: pageFaqs.studyAbroad,
    pageType: 'CollectionPage',
    itemList: studyCountries.map((c) => ({ name: `Study in ${c.name}`, path: `/study-in-${c.slug}` })),
  },
  '/mbbs-abroad': {
    title: 'MBBS Abroad for Indian Students 2026–27: Fees & Eligibility',
    description:
      'MBBS abroad for Indian students: NMC rules, NEET eligibility and fees for Russia, Kyrgyzstan, Kazakhstan, Georgia & more. Free eligibility check.',
    h1: 'MBBS Abroad for Indian Students',
    crumbs: [['MBBS Abroad', '/mbbs-abroad']],
    keywords: [...MBBS_KW, 'MBBS in Russia for Indian students', 'MBBS in Kyrgyzstan for Indian students', 'MBBS abroad admission consultants', 'FMGE', 'NExT'],
    faqs: pageFaqs.mbbsAbroad,
    pageType: 'CollectionPage',
    service: { name: 'MBBS Abroad Admission Guidance', type: 'Educational consulting – MBBS abroad admissions' },
    itemList: mbbsCountries.map((c) => ({ name: `MBBS in ${c.name}`, path: `/mbbs-in-${c.slug}` })),
  },
  '/uk-masters': {
    title: 'UK Master’s for Indian Students – Courses, Fees & Entry',
    description:
      '1-year UK Master’s for Indian students: popular courses, entry requirements, fees, scholarships and intakes. UK Masters consultants in Hyderabad & Warangal.',
    h1: 'UK Master’s Programs',
    crumbs: [['Study in UK', '/study-in-uk'], ['UK Master’s', '/uk-masters']],
    keywords: [...UK_KW, 'UK masters for Indian students', '1 year masters in UK', 'MSc in UK', 'UK masters without IELTS', 'University of East London'],
    faqs: pageFaqs.ukMasters,
    service: { name: 'UK Master’s Admission Guidance', type: 'Educational consulting – UK postgraduate admissions' },
  },
  '/scholarships': {
    title: 'Study Abroad Scholarships for Indian Students',
    description:
      'Study abroad scholarships for Indian students — government, university and Telangana state overseas schemes. Eligibility, deadlines and application guidance.',
    h1: 'Study Abroad Scholarships',
    crumbs: [['Scholarships', '/scholarships']],
    keywords: ['study abroad scholarships', 'scholarships for Indian students abroad', 'Chevening scholarship', 'DAAD scholarship', 'Stipendium Hungaricum', 'Telangana overseas scholarship', 'ePASS overseas scholarship'],
    faqs: pageFaqs.scholarships,
    service: { name: 'Scholarship Guidance', type: 'Educational consulting – scholarships' },
  },
  '/education-loan': {
    title: 'Education Loan for Study Abroad & MBBS Abroad',
    description:
      'Overseas education loan guidance — secured and unsecured loans, documents, co-applicants and proof of funds. Free guidance in Warangal & Hyderabad.',
    h1: 'Education Loans for Your Study Abroad Journey',
    crumbs: [['Education Loan', '/education-loan']],
    keywords: ['overseas education loan guidance', 'education loan for study abroad', 'education loan for MBBS abroad', 'education loan without collateral', 'proof of funds student visa'],
    faqs: pageFaqs.educationLoan,
    service: { name: 'Overseas Education Loan Guidance', type: 'Educational consulting – education finance' },
  },
  '/student-visa': {
    title: 'Student Visa Assistance – UK, USA, Canada & more',
    description:
      'Student visa assistance in Warangal & Hyderabad — checklists, proof of funds, application filing and mock interviews for UK, USA, Canada & more.',
    h1: 'Student Visa Assistance',
    crumbs: [['Student Visa', '/student-visa']],
    keywords: ['student visa assistance', 'student visa consultants in Hyderabad', 'UK student visa', 'F1 visa', 'Canada study permit', 'Australia student visa subclass 500', 'Germany student visa'],
    faqs: pageFaqs.studentVisa,
    service: { name: 'Student Visa Assistance', type: 'Educational consulting – student visa guidance' },
  },
  '/services': {
    title: 'Study Abroad & MBBS Abroad Services',
    description:
      'Study abroad counselling, MBBS abroad admissions, UK education, shortlisting, SOP/LOR, scholarships, loans, student visa and pre-departure support.',
    h1: 'Our Services',
    crumbs: [['Services', '/services']],
    keywords: ['study abroad services', 'overseas education services', 'SOP writing help', 'university shortlisting', 'pre-departure support', ...services.map((s) => s.title)],
    pageType: 'CollectionPage',
    itemList: services.map((s) => ({ name: s.title, path: `/services#${s.id}` })),
  },
  '/exams': {
    title: 'IELTS, PTE, TOEFL, GRE, GMAT & NEET – Tests to Study Abroad',
    description:
      'Which test do you need to study abroad? Compare IELTS, PTE, TOEFL, Duolingo, GRE, GMAT, SAT and NEET — format, scoring, duration and who needs them.',
    h1: 'Tests Required to Study Abroad',
    crumbs: [['Exams', '/exams']],
    keywords: ['IELTS', 'PTE Academic', 'TOEFL', 'Duolingo English Test', 'GRE', 'GMAT', 'SAT', 'NEET UG', 'IELTS vs PTE'],
  },
  '/events': {
    title: 'Study Abroad Events, Seminars & Webinars',
    description:
      'Free study abroad and MBBS abroad seminars, webinars, university visits and pre-departure sessions for students and parents in Warangal & Hyderabad.',
    h1: 'Events and Webinars',
    crumbs: [['Events', '/events']],
    keywords: ['study abroad seminar Hyderabad', 'MBBS abroad seminar Warangal', 'study abroad webinar', 'education fair Hyderabad'],
    faqs: pageFaqs.events,
  },
  '/about': {
    title: 'About Sri Vidhya Overseas – Warangal & Hyderabad',
    description:
      'Sri Vidhya Overseas is an overseas education consultancy in Warangal & Hyderabad offering honest guidance for MBBS abroad, UK education and Master’s.',
    h1: 'Welcome to Sri Vidhya Overseas',
    crumbs: [['About Us', '/about']],
    keywords: [...BRAND_KW, 'about Sri Vidhya Overseas', 'trusted overseas education consultants Telangana'],
    pageType: 'AboutPage',
  },
  '/contact': {
    title: 'Contact Sri Vidhya Overseas – Warangal & Hyderabad | 8500805336',
    description:
      'Contact Sri Vidhya Overseas for free counselling on MBBS abroad, UK education and study abroad. Call or WhatsApp 8500805336. Offices in Warangal and Hyderabad.',
    h1: 'Get in touch',
    crumbs: [['Contact', '/contact']],
    keywords: [...BRAND_KW, 'Sri Vidhya Overseas contact number', 'Sri Vidhya Overseas address', 'study abroad consultants near me'],
    pageType: 'ContactPage',
  },
  '/free-counselling': {
    title: 'Book Free Study Abroad & MBBS Counselling',
    description:
      'Book a free counselling session with Sri Vidhya Overseas in Warangal or Hyderabad. Expert guidance on MBBS abroad, UK education, Master’s and scholarships.',
    h1: 'Get Free Counselling Today',
    crumbs: [['Free Counselling', '/free-counselling']],
    keywords: ['free study abroad counselling', 'free MBBS abroad counselling', 'study abroad counselling Warangal', 'study abroad counselling Hyderabad'],
    faqs: pageFaqs.freeCounselling,
    service: { name: 'Free Study Abroad Counselling', type: 'Educational consulting – career and admissions counselling' },
  },
  '/blog': {
    title: 'Study Abroad & MBBS Guides for Students & Parents',
    description:
      'Guides on MBBS abroad, studying in the UK, scholarships, education loans, student visas and more — written for students and parents in Telangana.',
    h1: 'Insights, Guides & Updates',
    crumbs: [['Blog', '/blog']],
    keywords: ['study abroad blog', 'MBBS abroad guide', 'study in UK guide', 'student visa tips', 'overseas education guide Telangana'],
    pageType: 'CollectionPage',
    itemList: blogPosts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Sri Vidhya Overseas',
    description: 'How Sri Vidhya Overseas collects, uses and protects the personal information of students and parents.',
    h1: 'Privacy Policy',
    crumbs: [['Privacy Policy', '/privacy-policy']],
    keywords: [],
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Sri Vidhya Overseas',
    description: 'Terms and conditions for using the Sri Vidhya Overseas website and our study abroad, MBBS abroad and counselling services.',
    h1: 'Terms & Conditions',
    crumbs: [['Terms & Conditions', '/terms-and-conditions']],
    keywords: [],
  },
};

function studyCountryPage(c) {
  return {
    title: `Study in ${c.shortName} – Universities, Fees, Visa & Scholarships`,
    description: `Study in ${c.inName} for Indian students: top universities, intakes, fees, scholarships, visa & post-study work. Free counselling in Warangal & Hyderabad.`,
    h1: `Study in ${c.shortName}`,
    intro: c.intro,
    crumbs: [['Study Abroad', '/study-abroad'], [`Study in ${c.shortName}`, `/study-in-${c.slug}`]],
    keywords: [
      `study in ${c.shortName}`,
      `study in ${c.shortName} for Indian students`,
      `${c.shortName} education consultants in Hyderabad`,
      `${c.shortName} education consultants in Warangal`,
      `${c.shortName} student visa`,
      `${c.shortName} universities for Indian students`,
      `cost of studying in ${c.shortName}`,
      `${c.shortName} scholarships`,
      ...(c.slug === 'uk' ? UK_KW : []),
    ],
    faqs: c.faqs,
    service: { name: `Study in ${c.name} – Admission & Visa Guidance`, type: `Educational consulting – ${c.name} admissions` },
    itemList: c.universities.map((u) => ({ name: u })),
  };
}

function mbbsCountryPage(c) {
  return {
    title: `MBBS in ${c.name} for Indian Students – Fees & Eligibility`,
    description: trim(
      `MBBS in ${c.name}: ${c.tuition.length <= 22 ? `fees ${c.tuition}, ` : ''}NEET eligibility, top universities & admission steps. Free counselling in Warangal & Hyderabad.`,
      160
    ),
    h1: `MBBS in ${c.name}`,
    intro: c.intro,
    crumbs: [['MBBS Abroad', '/mbbs-abroad'], [`MBBS in ${c.name}`, `/mbbs-in-${c.slug}`]],
    keywords: [
      `MBBS in ${c.name}`,
      `MBBS in ${c.name} for Indian students`,
      `MBBS in ${c.name} fees`,
      `MBBS in ${c.name} eligibility`,
      `${c.name} medical universities`,
      `MBBS in ${c.name} consultants in Hyderabad`,
      `MBBS in ${c.name} consultants in Warangal`,
      ...MBBS_KW.slice(0, 3),
    ],
    faqs: c.faqs,
    service: { name: `MBBS in ${c.name} – Admission Guidance`, type: 'Educational consulting – MBBS abroad admissions' },
    itemList: c.universities.map((u) => ({ name: u })),
  };
}

function locationPage(p) {
  const kw = { overseas: LOCAL_KW, mbbs: MBBS_KW, uk: UK_KW }[p.focus];
  return {
    title: p.title,
    description: p.description,
    h1: p.h1,
    intro: p.intro,
    crumbs: [[p.h1, p.path]],
    keywords: uniq([p.h1, ...kw, ...p.areas.map((a) => `${p.focus === 'mbbs' ? 'MBBS abroad' : 'study abroad'} consultants ${a}`), ...BRAND_KW.slice(0, 1)]),
    faqs: p.faqs,
    service: { name: p.h1, type: 'Educational consulting', city: p.city },
    local: p.city,
  };
}

function blogPage(post) {
  return {
    title: post.title,
    description: trim(post.excerpt, 160),
    h1: post.title,
    intro: post.excerpt,
    crumbs: [['Blog', '/blog'], [post.title, `/blog/${post.slug}`]],
    keywords: uniq([post.category, ...post.title.split(/[:–,]/).map((s) => s.trim()).filter((s) => s.length > 4), 'Sri Vidhya Overseas']),
    article: post,
    ogType: 'article',
  };
}

function definePage(path) {
  if (STATIC_PAGES[path]) return STATIC_PAGES[path];
  let m;
  if ((m = path.match(/^\/study-in-([a-z-]+)$/)) && getStudyCountry(m[1])) return studyCountryPage(getStudyCountry(m[1]));
  if ((m = path.match(/^\/mbbs-in-([a-z-]+)$/)) && getMbbsCountry(m[1])) return mbbsCountryPage(getMbbsCountry(m[1]));
  if (getLocationPage(path)) return locationPage(getLocationPage(path));
  if ((m = path.match(/^\/blog\/([a-z0-9-]+)$/)) && getBlogPost(m[1])) return blogPage(getBlogPost(m[1]));
  return null;
}

// ---------------------------------------------------------------------------
// Structured data (schema.org JSON-LD, single @graph per page)
// ---------------------------------------------------------------------------
const knowsAbout = ['MBBS abroad', 'Study in UK', 'UK Master’s admissions', 'Study abroad counselling', 'Student visa guidance', 'Study abroad scholarships', 'Overseas education loans', 'University admissions'];

const areaServed = [
  { '@type': 'City', name: 'Warangal' },
  { '@type': 'City', name: 'Hanamkonda' },
  { '@type': 'City', name: 'Hyderabad' },
  { '@type': 'City', name: 'Secunderabad' },
  { '@type': 'State', name: 'Telangana' },
  { '@type': 'Country', name: 'India' },
];

const postalAddress = (o) => ({
  '@type': 'PostalAddress',
  ...(o.address && { streetAddress: o.address }),
  addressLocality: o.city,
  addressRegion: o.region,
  ...(o.postalCode && { postalCode: o.postalCode }),
  addressCountry: 'IN',
});

export function organizationNode() {
  return {
    '@type': ['EducationalOrganization', 'Organization'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: ['Sri Vidhya Overseas Education Consultants', 'Sri Vidhya Overseas Warangal', 'Sri Vidhya Overseas Hyderabad'],
    url: url('/'),
    logo: { '@type': 'ImageObject', url: url('/logo.png'), width: 946, height: 240 },
    image: OG_IMAGE.url,
    description: STATIC_PAGES['/'].description,
    slogan: 'Honest guidance for your overseas education',
    telephone: SITE.phoneIntl,
    ...(SITE.email && { email: SITE.email }),
    ...(SITE.foundingYear && { foundingDate: String(SITE.foundingYear) }),
    address: postalAddress(SITE.offices[0]),
    areaServed,
    knowsAbout,
    knowsLanguage: ['en', 'te', 'hi'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneIntl,
        contactType: 'admissions',
        areaServed: 'IN',
        availableLanguage: ['English', 'Telugu', 'Hindi'],
      },
    ],
    department: SITE.offices.map((o) => ({ '@id': `${SITE.url}/#office-${o.city.toLowerCase()}` })),
    sameAs: Object.values(SITE.social).filter(Boolean),
  };
}

export function officeNodes() {
  return SITE.offices.map((o) => ({
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE.url}/#office-${o.city.toLowerCase()}`,
    name: `${SITE.name} – ${o.city}`,
    url: url(`/overseas-education-consultants-${o.city.toLowerCase()}`),
    image: OG_IMAGE.url,
    telephone: SITE.phoneIntl,
    ...(SITE.email && { email: SITE.email }),
    address: postalAddress(o),
    ...(o.geo && { geo: { '@type': 'GeoCoordinates', latitude: o.geo.lat, longitude: o.geo.lng } }),
    ...(o.geo && { hasMap: `https://www.google.com/maps?q=${o.geo.lat},${o.geo.lng}` }),
    areaServed: [{ '@type': 'City', name: o.city }, { '@type': 'State', name: 'Telangana' }],
    parentOrganization: { '@id': ORG_ID },
    knowsAbout,
  }));
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: url('/'),
    name: SITE.name,
    alternateName: 'Sri Vidhya Overseas Education Consultants',
    description: STATIC_PAGES['/'].description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

function breadcrumbNode(path, crumbs) {
  const items = [['Home', '/'], ...(crumbs || [])];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url(path)}#breadcrumb`,
    itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url(p) })),
  };
}

function faqNode(path, faqs) {
  return {
    '@type': 'FAQPage',
    '@id': `${url(path)}#faq`,
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

function buildGraph(path, def) {
  const canonical = url(path);
  const graph = [websiteNode(), organizationNode()];
  if (def.home || def.local) graph.push(...officeNodes());

  const page = {
    '@type': def.pageType || (def.article ? 'WebPage' : 'WebPage'),
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: def.title,
    description: def.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height },
    ...(def.keywords?.length && { keywords: def.keywords.join(', ') }),
  };
  if (!def.home) {
    page.breadcrumb = { '@id': `${canonical}#breadcrumb` };
    graph.push(breadcrumbNode(path, def.crumbs));
  }
  graph.push(page);

  if (def.faqs?.length) {
    page.mainEntity = { '@id': `${canonical}#faq` };
    graph.push(faqNode(path, def.faqs));
  }

  if (def.service) {
    graph.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: def.service.name,
      serviceType: def.service.type,
      description: def.description,
      url: canonical,
      provider: { '@id': def.local ? `${SITE.url}/#office-${def.local.toLowerCase()}` : ORG_ID },
      areaServed: def.service.city ? [{ '@type': 'City', name: def.service.city }, { '@type': 'State', name: 'Telangana' }] : areaServed,
      audience: { '@type': 'EducationalAudience', educationalRole: 'student', audienceType: 'Indian students and parents' },
      offers: { '@type': 'Offer', name: 'Free first counselling session', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
    });
  }

  if (def.itemList?.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${canonical}#list`,
      name: def.h1,
      numberOfItems: def.itemList.length,
      itemListElement: def.itemList.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        ...(it.path && { url: url(it.path) }),
      })),
    });
  }

  if (def.article) {
    const a = def.article;
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      dateModified: a.updated || a.date,
      articleSection: a.category,
      keywords: def.keywords.join(', '),
      wordCount: a.sections.reduce((n, s) => n + [...(s.p || []), ...(s.list || [])].join(' ').split(/\s+/).length, 0),
      inLanguage: 'en-IN',
      image: OG_IMAGE.url,
      author: { '@type': 'Organization', name: `Team ${SITE.name}`, url: url('/about') },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: { '@id': `${canonical}#webpage` },
      isPartOf: { '@id': WEBSITE_ID },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Full SEO object for a path, or null if the path isn't a real page. */
export function getSeo(path) {
  const def = definePage(path);
  if (!def) return null;
  return {
    path,
    canonical: url(path),
    title: def.home ? def.title : withBrand(def.title),
    description: trim(def.description, 160),
    keywords: uniq([...(def.keywords || []), ...(def.home ? [] : BRAND_KW.slice(0, 1))]),
    h1: def.h1,
    intro: def.intro || def.description,
    ogType: def.ogType || 'website',
    article: def.article || null,
    jsonLd: buildGraph(path, def),
  };
}

/**
 * Head tags for a page as plain descriptors: { tag, attrs, children? }.
 * Rendered by <Seo/> (react-helmet-async) and serialised by the prerender script.
 */
export function buildHeadTags(seo) {
  const m = (name, content) => ({ tag: 'meta', attrs: { name, content } });
  const p = (property, content) => ({ tag: 'meta', attrs: { property, content } });
  const imageAlt = `${SITE.name} – Overseas Education Consultants in Warangal & Hyderabad`;

  const tags = [
    { tag: 'title', children: seo.title },
    m('description', seo.description),
    seo.keywords.length && m('keywords', seo.keywords.join(', ')),
    m('robots', ROBOTS),
    m('googlebot', ROBOTS),
    m('bingbot', ROBOTS),
    m('author', SITE.name),
    m('publisher', SITE.name),
    m('copyright', SITE.name),
    m('rating', 'general'),
    m('language', 'English'),
    m('geo.region', 'IN-TG'),
    m('geo.placename', 'Warangal, Hyderabad, Telangana'),
    ...(SITE.offices[0].geo
      ? [m('geo.position', `${SITE.offices[0].geo.lat};${SITE.offices[0].geo.lng}`), m('ICBM', `${SITE.offices[0].geo.lat}, ${SITE.offices[0].geo.lng}`)]
      : []),
    { tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } },
    // Home hero poster is the largest above-the-fold image (LCP) — fetch it first.
    seo.path === '/' && SITE.heroPoster && { tag: 'link', attrs: { rel: 'preload', as: 'image', href: SITE.heroPoster, fetchpriority: 'high' } },
    { tag: 'link', attrs: { rel: 'alternate', hrefLang: 'en-IN', href: seo.canonical } },
    { tag: 'link', attrs: { rel: 'alternate', hrefLang: 'x-default', href: seo.canonical } },

    // Open Graph
    p('og:type', seo.ogType),
    p('og:site_name', SITE.name),
    p('og:title', seo.title),
    p('og:description', seo.description),
    p('og:url', seo.canonical),
    p('og:locale', 'en_IN'),
    p('og:image', OG_IMAGE.url),
    p('og:image:secure_url', OG_IMAGE.url),
    p('og:image:type', OG_IMAGE.type),
    p('og:image:width', String(OG_IMAGE.width)),
    p('og:image:height', String(OG_IMAGE.height)),
    p('og:image:alt', imageAlt),
    ...(seo.article
      ? [
          p('article:published_time', seo.article.date),
          p('article:modified_time', seo.article.updated || seo.article.date),
          p('article:section', seo.article.category),
          p('article:author', SITE.name),
          ...seo.keywords.slice(0, 6).map((k) => p('article:tag', k)),
        ]
      : []),

    // Twitter / X
    m('twitter:card', 'summary_large_image'),
    m('twitter:title', seo.title),
    m('twitter:description', seo.description),
    m('twitter:image', OG_IMAGE.url),
    m('twitter:image:alt', imageAlt),
    SITE.twitterHandle && m('twitter:site', SITE.twitterHandle),
    SITE.twitterHandle && m('twitter:creator', SITE.twitterHandle),

    // Search console verification
    SITE.googleSiteVerification && m('google-site-verification', SITE.googleSiteVerification),
    SITE.bingSiteVerification && m('msvalidate.01', SITE.bingSiteVerification),

    { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(seo.jsonLd) },
  ];
  return tags.filter(Boolean);
}

// Exported for the prerender script.
export const allSeoPaths = () => [
  ...Object.keys(STATIC_PAGES),
  ...studyCountries.map((c) => `/study-in-${c.slug}`),
  ...mbbsCountries.map((c) => `/mbbs-in-${c.slug}`),
  ...locationPages.map((p) => p.path),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
];
