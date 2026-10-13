import { Link } from 'react-router-dom';
import { CalendarDays, Briefcase } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { PageHero, SectionHeading, FAQ, CTABand, FactStrip, CheckList, InlineCTA, CountryCard } from '../components/ui.jsx';
import { getStudyCountry, studyCountries } from '../data/studyCountries.js';
import { useEnquiry } from '../components/EnquiryModal.jsx';

export default function StudyCountry({ slug }) {
  const c = getStudyCountry(slug);
  const { openEnquiry } = useEnquiry();
  const path = `/study-in-${c.slug}`;
  const crumbs = [
    { to: '/', label: 'Home' },
    { to: '/study-abroad', label: 'Study Abroad' },
    { to: path, label: `Study in ${c.shortName}` },
  ];
  const others = studyCountries.filter((x) => x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <Seo path={path} />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Study Abroad"
        flag={c.code}
        title={`Study in ${c.shortName}`}
        subtitle={c.tagline}
        aside={<EnquiryForm title={`Plan your ${c.shortName} admission`} subtitle="Free counselling • Reply within 24 hours" defaultCountry={c.name} source={`Study in ${c.shortName}`} showMessage={false} />}
      >
        <div className="hero-actions">
          <button type="button" className="btn btn-accent" onClick={() => openEnquiry({ interest: 'Master’s / PG Abroad', country: c.name })}>
            Book Free Counselling
          </button>
        </div>
      </PageHero>

      <section className="section section-tight">
        <div className="container">
          <h2 className="h3">Life in {c.name}</h2>
          <FactStrip
            facts={c.facts}
            extra={[{ icon: CalendarDays, label: 'Main intake', value: c.intakes[0] }, { icon: Briefcase, label: 'Work while studying', value: 'Yes – part-time' }]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <article className="content">
            <p className="lead">{c.intro}</p>

            <h2>Why study in {c.inName}?</h2>
            <CheckList items={c.why} />

            <h2>Programmes & entry requirements</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Level</th><th>Duration</th><th>Typical entry requirement</th></tr>
                </thead>
                <tbody>
                  {c.programs.map((p) => (
                    <tr key={p.level}><td>{p.level}</td><td>{p.duration}</td><td>{p.entry}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>{c.shortName} intakes</h2>
            <div className="tag-row">
              {c.intakes.map((i) => <span className="tag" key={i}>{i}</span>)}
            </div>

            <h2>Accepted tests</h2>
            <CheckList items={c.tests} columns={2} />

            <InlineCTA title={`Not sure which ${c.shortName} university fits your profile?`} text="Get a free, profile-based shortlist from our counsellors." country={c.name} />

            <h2>Top universities in {c.inName}</h2>
            <ul className="uni-grid">
              {c.universities.map((u) => <li key={u}>{u}</li>)}
            </ul>
            <p className="muted">We work with both top-ranked and budget-friendly universities based on your profile.</p>

            <h2>Cost of studying in {c.inName}</h2>
            <div className="table-wrap">
              <table>
                <tbody>
                  <tr><th scope="row">Undergraduate tuition</th><td>{c.costs.ug}</td></tr>
                  <tr><th scope="row">Postgraduate tuition</th><td>{c.costs.pg}</td></tr>
                  <tr><th scope="row">Living costs</th><td>{c.costs.living}</td></tr>
                </tbody>
              </table>
            </div>
            <p className="muted small">Indicative ranges for planning. Exact fees depend on the university and course.</p>

            <h2>Scholarships</h2>
            <CheckList items={c.scholarships} />
            <p>
              Also see our <Link to="/scholarships">scholarship guide</Link> and <Link to="/education-loan">education loan guidance</Link>.
            </p>

            <h2>{c.visa.name} process</h2>
            <ol className="steps-list">
              {c.visa.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>

            <h2>Documents required for the {c.shortName} student visa</h2>
            <CheckList items={c.documents} columns={2} />

            <h2>Work while studying & after graduation</h2>
            <div className="info-pair">
              <div className="info-box">
                <h3>While studying</h3>
                <p>{c.workWhileStudying}</p>
              </div>
              <div className="info-box">
                <h3>Post-study work</h3>
                <p>{c.postStudyWork}</p>
              </div>
            </div>

            <h2>Why choose Sri Vidhya Overseas for {c.shortName}?</h2>
            <CheckList
              items={[
                'Profile-based university and course shortlisting',
                'Application, SOP and LOR guidance',
                'Scholarship and education-loan support',
                `${c.visa.name} documentation and interview preparation`,
                'Pre-departure briefing and accommodation guidance',
              ]}
            />
          </article>

          <aside className="sidebar">
            <div className="sidebar-card">
              <h3>Quick facts</h3>
              <dl>
                <dt>Intakes</dt><dd>{c.intakes.join(', ')}</dd>
                <dt>PG duration</dt><dd>{c.programs[1]?.duration}</dd>
                <dt>Visa</dt><dd>{c.visa.name}</dd>
              </dl>
              <button type="button" className="btn btn-primary btn-block" onClick={() => openEnquiry({ country: c.name })}>Get Free Counselling</button>
            </div>
            <div className="sidebar-card">
              <h3>Other destinations</h3>
              <ul className="sidebar-links">
                {studyCountries.filter((x) => x.slug !== c.slug).map((x) => (
                  <li key={x.slug}><Link to={`/study-in-${x.slug}`}>Study in {x.shortName}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <FAQ items={c.faqs} subtitle={`Common questions about studying in ${c.inName}.`} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title="Explore other destinations" />
          <div className="card-grid cols-4">
            {others.map((x) => <CountryCard key={x.slug} to={`/study-in-${x.slug}`} code={x.code} name={x.name} text={x.tagline} />)}
          </div>
        </div>
      </section>

      <CTABand title={`Ready to start your ${c.shortName} study journey?`} country={c.name} />
    </>
  );
}
