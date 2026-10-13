import { CalendarDays, Users, Video, Plane, Stethoscope, BookOpen } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import { pageFaqs } from '../data/pageFaqs.js';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { PageHero, SectionHeading, FAQ, CTABand } from '../components/ui.jsx';

// Add real, dated events here: { title, date: '2026-11-15', time: '11:00 AM', mode: 'Warangal office', text }
const upcoming = [];

const formats = [
  { icon: Stethoscope, title: 'MBBS Abroad Parent Seminars', text: 'NMC rules, country comparison, costs and safety — Q&A for NEET students and parents.' },
  { icon: Users, title: 'Study Abroad Fairs', text: 'Meet university representatives and get on-the-spot profile evaluation.' },
  { icon: Video, title: 'Free Webinars', text: 'Country-specific sessions on the UK, USA, Canada, Germany and more.' },
  { icon: BookOpen, title: 'IELTS / PTE Workshops', text: 'Understand test formats, scoring and preparation strategies.' },
  { icon: Plane, title: 'Pre-Departure Orientation', text: 'Travel, accommodation, banking and first-week tips before you fly.' },
  { icon: CalendarDays, title: 'University Delegate Visits', text: 'One-to-one meetings with visiting admission officers.' },
];

const faqs = pageFaqs.events;

export default function Events() {
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/events', label: 'Events' }];
  return (
    <>
      <Seo path="/events" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Events & Webinars"
        title="Events and Webinars"
        subtitle="Free seminars, webinars and university sessions for students and parents in Warangal and Hyderabad."
      />

      <section className="section">
        <div className="container">
          <SectionHeading title="Live & upcoming sessions" />
          {upcoming.length ? (
            <div className="card-grid cols-3">
              {upcoming.map((e) => (
                <article key={e.title + e.date} className="event-card">
                  <time dateTime={e.date}>{new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {e.time}</time>
                  <h3>{e.title}</h3>
                  <p className="muted">{e.mode}</p>
                  <p>{e.text}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <CalendarDays size={36} aria-hidden="true" />
              <p>New session dates will be announced soon. Register your interest and we’ll notify you on WhatsApp.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Sessions we organise" />
          <div className="card-grid cols-3">
            {formats.map(({ icon: Ico, title, text }) => (
              <div key={title} className="info-box">
                <Ico size={26} aria-hidden="true" className="text-primary" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <FAQ items={faqs} title="Event FAQs" />
          <EnquiryForm title="Register your interest" subtitle="We’ll share upcoming event dates with you." source="Events" />
        </div>
      </section>

      <CTABand />
    </>
  );
}
