import { SITE } from '../config/site.js';

export const whatsappLink = (message = SITE.whatsappGreeting) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${SITE.phoneIntl}`;

// Canonical absolute URL. Home keeps a trailing slash; every other path has none.
export const absoluteUrl = (path = '/') => `${SITE.url}${path}`;

export const flagUrl = (code, width = 160) => `https://flagcdn.com/w${width}/${code}.png`;
