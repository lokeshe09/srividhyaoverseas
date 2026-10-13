import { SITE } from '../config/site.js';
import { whatsappLink } from './contact.js';

export const INTERESTS = ['MBBS Abroad', 'Study in UK', 'Master’s / PG Abroad', 'Bachelor’s Abroad', 'Scholarships / Education Loan', 'Student Visa', 'Not sure yet'];
export const CITIES = ['Warangal', 'Hyderabad', 'Other – Telangana', 'Other – Andhra Pradesh', 'Other'];

export const isValidPhone = (v) => /^[6-9]\d{9}$/.test(v.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, ''));
export const isValidEmail = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const LABELS = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  city: 'City',
  interest: 'Interested in',
  country: 'Preferred country',
  qualification: 'Qualification',
  neet: 'NEET status',
  score: 'Academic score',
  budget: 'Budget',
  intake: 'Intake',
  message: 'Message',
};

/**
 * Sends an enquiry. Always opens WhatsApp with a pre-filled summary so the lead reaches the team
 * even without a backend; additionally POSTs JSON to SITE.formEndpoint when one is configured.
 */
export async function submitLead(data, source = 'Website') {
  const lines = Object.entries(data)
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${LABELS[k] || k}: ${Array.isArray(v) ? v.join(', ') : v}`);
  const message = `New enquiry – ${SITE.name} website (${source})\n\n${lines.join('\n')}`;
  const link = whatsappLink(message);

  // Open WhatsApp first (inside the click handler) so pop-up blockers allow it.
  window.open(link, '_blank', 'noopener');

  if (SITE.formEndpoint) {
    try {
      await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, source, page: window.location.pathname }),
      });
    } catch {
      // WhatsApp hand-off already happened; ignore network errors here.
    }
  }
  return { link };
}
