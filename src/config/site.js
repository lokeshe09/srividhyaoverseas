// Central business details. Update the TODO fields with real, verified information —
// anything left empty is simply hidden on the site (nothing is invented).
export const SITE = {
  name: 'Sri Vidhya Overseas',
  shortName: 'Sri Vidhya',
  tagline: 'Overseas Education Consultants in Warangal & Hyderabad',
  // TODO: replace with the live domain before deploying (also used in sitemap.xml / robots.txt).
  url: 'https://www.srividhyaoverseas.com',
  phone: '8500805336',
  phoneIntl: '+918500805336',
  phoneDisplay: '+91 85008 05336',
  whatsapp: '918500805336',
  whatsappGreeting: "Hi Sri Vidhya Overseas, I'm interested in studying abroad. Please guide me.",
  // TODO: add the official email address.
  email: '',
  // TODO: add office hours, e.g. 'Mon – Sat, 10:00 AM – 7:00 PM'.
  hours: '',
  offices: [
    {
      city: 'Warangal',
      region: 'Telangana',
      // TODO: full street address, PIN code, exact office coordinates and a Google Maps embed URL.
      address: '',
      postalCode: '',
      geo: null, // e.g. { lat: 17.9689, lng: 79.5941 } — exact office location only
      mapEmbed: '',
    },
    {
      city: 'Hyderabad',
      region: 'Telangana',
      address: '',
      postalCode: '',
      geo: null,
      mapEmbed: '',
    },
  ],
  // Search-console verification codes (only the content value). Added to every page when set.
  googleSiteVerification: '',
  bingSiteVerification: '',
  // e.g. '@srividhyaoverseas' — used for twitter:site when set.
  twitterHandle: '',
  // Year the business started (for structured data). Leave empty if unsure.
  foundingYear: '',
  // Optional: a form backend URL (e.g. Formspree, Google Apps Script, CRM webhook) that accepts
  // a JSON POST. Leave empty to send enquiries via WhatsApp only.
  formEndpoint: '',
  // TODO: add real profile links; empty ones are hidden.
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
    linkedin: '',
  },
};
