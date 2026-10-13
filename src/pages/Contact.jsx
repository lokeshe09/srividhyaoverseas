import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { PageHero } from '../components/ui.jsx';
import { SITE } from '../config/site.js';
import { telLink, whatsappLink } from '../utils/contact.js';

export default function Contact() {
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/contact', label: 'Contact' }];
  return (
    <>
      <Seo path="/contact" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Contact Us"
        title="Get in touch"
        subtitle="Have a question about MBBS abroad, studying in the UK or any other destination? Call, WhatsApp or send us your details."
      />

      <section className="section">
        <div className="container two-col contact-grid">
          <div>
            <div className="contact-cards">
              <a href={telLink} className="contact-card">
                <Phone size={24} aria-hidden="true" />
                <div><strong>Call us</strong><span>{SITE.phoneDisplay}</span></div>
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="contact-card">
                <MessageCircle size={24} aria-hidden="true" />
                <div><strong>WhatsApp</strong><span>Chat with a counsellor</span></div>
              </a>
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className="contact-card">
                  <Mail size={24} aria-hidden="true" />
                  <div><strong>Email</strong><span>{SITE.email}</span></div>
                </a>
              )}
              {SITE.hours && (
                <div className="contact-card">
                  <Clock size={24} aria-hidden="true" />
                  <div><strong>Office hours</strong><span>{SITE.hours}</span></div>
                </div>
              )}
            </div>

            <h2 className="h3 mt-lg">Our offices</h2>
            <div className="office-list">
              {SITE.offices.map((o) => (
                <div key={o.city} className="office-card">
                  <h3 className="h4"><MapPin size={18} aria-hidden="true" /> {o.city}</h3>
                  <p>{o.address || `${o.city}, ${o.region}`}</p>
                  {o.mapEmbed && (
                    <iframe title={`${SITE.name} ${o.city} map`} src={o.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="map-embed" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <EnquiryForm title="Send us your enquiry" subtitle="We usually reply within 24 hours." source="Contact page" />
        </div>
      </section>
    </>
  );
}
