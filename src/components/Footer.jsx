import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { SITE } from '../config/site.js';
import { studyCountries } from '../data/studyCountries.js';
import { mbbsCountries } from '../data/mbbsCountries.js';
import { telLink, whatsappLink } from '../utils/contact.js';
import Logo from './Logo.jsx';

const socialIcons = { instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin };

export default function Footer() {
  const socials = Object.entries(SITE.social).filter(([, url]) => url);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>
            Honest, student-first guidance for MBBS abroad, UK education, Master’s programmes and overseas
            admissions — for students and parents in Warangal, Hyderabad and across Telangana.
          </p>
          <p className="footer-trust">Free counselling • Transparent process • No false promises</p>
          {socials.length > 0 && (
            <div className="footer-social">
              {socials.map(([key, url]) => {
                const Ico = socialIcons[key];
                return (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                    <Ico size={18} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h3 className="footer-title">MBBS Abroad</h3>
          <ul className="footer-links">
            <li><Link to="/mbbs-abroad">MBBS Abroad Overview</Link></li>
            {mbbsCountries.slice(0, 6).map((c) => (
              <li key={c.slug}><Link to={`/mbbs-in-${c.slug}`}>MBBS in {c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Study Destinations</h3>
          <ul className="footer-links">
            {studyCountries.slice(0, 7).map((c) => (
              <li key={c.slug}><Link to={`/study-in-${c.slug}`}>Study in {c.shortName}</Link></li>
            ))}
            <li><Link to="/uk-masters">UK Master’s Programs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/scholarships">Scholarships</Link></li>
            <li><Link to="/education-loan">Education Loan</Link></li>
            <li><Link to="/student-visa">Student Visa</Link></li>
            <li><Link to="/exams">Exams</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Get In Touch</h3>
          <ul className="footer-contact">
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={telLink}>{SITE.phoneDisplay}</a>
            </li>
            <li>
              <MessageCircle size={16} aria-hidden="true" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </li>
            {SITE.email && (
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            )}
            {SITE.offices.map((o) => (
              <li key={o.city}>
                <MapPin size={16} aria-hidden="true" />
                <span>
                  <strong>{o.city} Office</strong>
                  <br />
                  {o.address || `${o.city}, ${o.region}`}
                </span>
              </li>
            ))}
            {SITE.hours && (
              <li>
                <Clock size={16} aria-hidden="true" />
                <span>{SITE.hours}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="footer-local">
        <div className="container">
          <span>Popular searches:</span>
          <Link to="/overseas-education-consultants-warangal">Overseas Education Consultants in Warangal</Link>
          <Link to="/overseas-education-consultants-hyderabad">Overseas Education Consultants in Hyderabad</Link>
          <Link to="/mbbs-abroad-warangal">MBBS Abroad Consultants in Warangal</Link>
          <Link to="/mbbs-abroad-hyderabad">MBBS Abroad Consultants in Hyderabad</Link>
          <Link to="/study-in-uk-warangal">Study in UK – Warangal</Link>
          <Link to="/study-in-uk-hyderabad">Study in UK – Hyderabad</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} {SITE.name}. All rights reserved.</span>
          <span className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          </span>
        </div>
        <p className="container footer-disclaimer">
          Admission and visa decisions are made by universities and embassies. Fees, eligibility and visa rules shown on this
          website are indicative and change regularly — we confirm the latest official information during counselling.
        </p>
      </div>
    </footer>
  );
}
