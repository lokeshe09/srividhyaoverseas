import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { PageHero, SectionHeading, FAQ, CTABand, CheckList, CountryCard, Journey } from '../components/ui.jsx';
import { getLocationPage, locationPages } from '../data/locations.js';
import { mbbsCountries, mbbsAdmissionSteps } from '../data/mbbsCountries.js';
import { studyCountries, getStudyCountry } from '../data/studyCountries.js';
import { journey } from '../data/services.js';
import { SITE } from '../config/site.js';
import { telLink } from '../utils/contact.js';

const focusLabel = { overseas: 'Study Abroad', mbbs: 'MBBS Abroad', uk: 'Study in UK' };
const focusInterest = { overseas: '', mbbs: 'MBBS Abroad', uk: 'Study in UK' };

export default function LocationPage({ path }) {
  const p = getLocationPage(path);
  const office = SITE.offices.find((o) => o.city === p.city);
  const crumbs = [{ to: '/', label: 'Home' }, { to: p.path, label: p.h1 }];
  const related = locationPages.filter((x) => x.path !== p.path && (x.city === p.city || x.focus === p.focus));
  const uk = getStudyCountry('uk');

  return (
    <>
      <Seo path={p.path} />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow={`${focusLabel[p.focus]} • ${p.city}`}
        title={p.h1}
        subtitle={p.intro}
        aside={<EnquiryForm title={`Free counselling in ${p.city}`} subtitle="Meet us in person or talk over phone / WhatsApp" defaultInterest={focusInterest[p.focus]} source={p.h1} showMessage={false} />}
      >
        <a href={telLink} className="hero-call"><Phone size={18} aria-hidden="true" /> Call {SITE.phoneDisplay}</a>
      </PageHero>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>How we help students in {p.city}</h2>
            <CheckList items={p.highlights} />
          </div>
          <div className="office-card">
            <h2 className="h3"><MapPin size={20} aria-hidden="true" /> Our {p.city} office</h2>
            <p>{office?.address || `${p.city}, ${office?.region || 'Telangana'}`}</p>
            {SITE.hours && <p className="muted">{SITE.hours}</p>}
            <p>Call or WhatsApp <a href={telLink}>{SITE.phoneDisplay}</a> to book an appointment.</p>
            {office?.mapEmbed && (
              <iframe title={`${SITE.name} ${p.city} map`} src={office.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="map-embed" />
            )}
            <h3 className="h4 mt">Students we serve</h3>
            <div className="tag-row">
              {p.areas.map((a) => <span className="tag" key={a}>{a}</span>)}
            </div>
          </div>
        </div>
      </section>

      {p.focus === 'mbbs' && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeading title={`MBBS abroad options for ${p.city} students`} subtitle="Indicative tuition per year — full cost sheet shared during counselling." />
            <div className="card-grid cols-4">
              {mbbsCountries.map((c) => (
                <CountryCard key={c.slug} to={`/mbbs-in-${c.slug}`} code={c.code} name={`MBBS in ${c.name}`} meta={c.tuition} />
              ))}
            </div>
            <div className="center mt-lg"><Link to="/mbbs-abroad#eligibility" className="btn btn-primary">Check Your Eligibility</Link></div>
          </div>
        </section>
      )}

      {p.focus === 'overseas' && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeading title={`Popular destinations for ${p.city} students`} />
            <div className="card-grid cols-5">
              {studyCountries.map((c) => <CountryCard key={c.slug} to={`/study-in-${c.slug}`} code={c.code} name={c.name} />)}
            </div>
            <p className="center mt">Planning medicine? See <Link to="/mbbs-abroad">MBBS abroad</Link>.</p>
          </div>
        </section>
      )}

      {p.focus === 'uk' && (
        <section className="section section-alt">
          <div className="container two-col">
            <div>
              <h2>UK at a glance</h2>
              <div className="table-wrap">
                <table>
                  <tbody>
                    <tr><th scope="row">Intakes</th><td>{uk.intakes.join(', ')}</td></tr>
                    <tr><th scope="row">Master’s duration</th><td>{uk.programs[1].duration}</td></tr>
                    <tr><th scope="row">PG tuition</th><td>{uk.costs.pg}</td></tr>
                    <tr><th scope="row">Living costs</th><td>{uk.costs.living}</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt"><Link to="/study-in-uk">Full UK guide</Link> · <Link to="/uk-masters">UK Master’s programmes</Link></p>
            </div>
            <div>
              <h2>Popular UK universities</h2>
              <ul className="uni-grid">{uk.universities.map((u) => <li key={u}>{u}</li>)}</ul>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <SectionHeading title="Our process" />
          <Journey steps={p.focus === 'mbbs' ? mbbsAdmissionSteps : journey} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <FAQ items={p.faqs} title={`FAQs – ${p.h1}`} />
          <div className="related-links">
            <h3 className="h4">Related pages</h3>
            {related.map((r) => <Link key={r.path} to={r.path}>{r.h1}</Link>)}
          </div>
        </div>
      </section>

      <CTABand title={`Visit our ${p.city} office for free counselling`} interest={focusInterest[p.focus] || undefined} />
    </>
  );
}
