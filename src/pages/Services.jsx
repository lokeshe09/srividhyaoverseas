import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import { PageHero, SectionHeading, CTABand, CheckList, Journey } from '../components/ui.jsx';
import { services, journey } from '../data/services.js';
import { useEnquiry } from '../components/EnquiryModal.jsx';

export default function Services() {
  const { openEnquiry } = useEnquiry();
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/services', label: 'Services' }];
  return (
    <>
      <Seo path="/services" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="What we do"
        title="Our Services"
        subtitle="End-to-end guidance for students and parents — from choosing the right country to settling into your university."
      >
        <div className="hero-actions">
          <button type="button" className="btn btn-accent btn-lg" onClick={() => openEnquiry()}>Book Free Counselling</button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container service-list">
          {services.map((s) => (
            <article key={s.id} id={s.id} className="service-row">
              <span className="service-icon service-icon-lg"><Icon name={s.icon} size={28} /></span>
              <div>
                <h2 className="h3">{s.title}</h2>
                <p>{s.text}</p>
                <CheckList items={s.points} columns={2} />
                <Link to={s.link} className="link-arrow">Learn more <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Our student-first process" />
          <Journey steps={journey} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
