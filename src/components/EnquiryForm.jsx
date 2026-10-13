import { useId, useState } from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import { studyCountries } from '../data/studyCountries.js';
import { mbbsCountries } from '../data/mbbsCountries.js';
import { INTERESTS, CITIES, isValidPhone, isValidEmail, submitLead } from '../utils/lead.js';

const COUNTRY_OPTIONS = [
  ...studyCountries.map((c) => c.name),
  ...mbbsCountries.map((c) => `MBBS – ${c.name}`),
  'Not decided',
];

export default function EnquiryForm({
  title = 'Get Free Counselling',
  subtitle = 'Share your details and our counsellor will contact you shortly.',
  defaultInterest = '',
  defaultCountry = '',
  source = 'Enquiry form',
  showMessage = true,
  variant = 'card',
}) {
  const uid = useId();
  const [data, setData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    interest: defaultInterest,
    country: defaultCountry,
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (data.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!isValidPhone(data.phone)) e.phone = 'Please enter a valid 10-digit mobile number.';
    if (!isValidEmail(data.email)) e.email = 'Please enter a valid email address.';
    if (!data.interest) e.interest = 'Please choose what you are interested in.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    const res = await submitLead(data, source);
    setSending(false);
    setDone(res);
  };

  if (done) {
    return (
      <div className={`enquiry enquiry-${variant} enquiry-done`}>
        <CheckCircle2 size={44} className="text-success" aria-hidden="true" />
        <h3>Thank you, {data.name.split(' ')[0]}!</h3>
        <p>
          Your enquiry is ready in WhatsApp — just press <strong>Send</strong>. Our counsellor will get back to you
          shortly.
        </p>
        <a className="btn btn-whatsapp" href={done.link} target="_blank" rel="noopener noreferrer">
          Open WhatsApp again
        </a>
      </div>
    );
  }

  const field = (k) => `${uid}-${k}`;

  return (
    <form className={`enquiry enquiry-${variant}`} onSubmit={onSubmit} noValidate>
      {title && <h3 className="enquiry-title">{title}</h3>}
      {subtitle && <p className="enquiry-sub">{subtitle}</p>}

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={field('name')}>Full name *</label>
          <input id={field('name')} value={data.name} onChange={set('name')} autoComplete="name" placeholder="Student name" />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor={field('phone')}>Mobile number *</label>
          <input
            id={field('phone')}
            value={data.phone}
            onChange={set('phone')}
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile"
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
        <div className="form-field">
          <label htmlFor={field('email')}>Email</label>
          <input id={field('email')} type="email" value={data.email} onChange={set('email')} autoComplete="email" placeholder="Optional" />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor={field('city')}>City</label>
          <select id={field('city')} value={data.city} onChange={set('city')}>
            <option value="">Select city</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor={field('interest')}>Interested in *</label>
          <select id={field('interest')} value={data.interest} onChange={set('interest')}>
            <option value="">Select</option>
            {INTERESTS.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errors.interest && <span className="form-error">{errors.interest}</span>}
        </div>
        <div className="form-field">
          <label htmlFor={field('country')}>Preferred country</label>
          <select id={field('country')} value={data.country} onChange={set('country')}>
            <option value="">Select country</option>
            {COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        {showMessage && (
          <div className="form-field form-field-full">
            <label htmlFor={field('message')}>Message</label>
            <textarea id={field('message')} rows={3} value={data.message} onChange={set('message')} placeholder="Your qualification, NEET score, questions…" />
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
        {sending ? 'Sending…' : 'Book Free Counselling'}
      </button>
      <p className="form-note">
        <Lock size={13} aria-hidden="true" /> Your details are safe with us. No spam.
      </p>
    </form>
  );
}
