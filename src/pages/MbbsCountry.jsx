import { Link } from 'react-router-dom';
import { Clock, BookOpen } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { PageHero, SectionHeading, FAQ, CTABand, FactStrip, CheckList, InlineCTA, CountryCard, Journey } from '../components/ui.jsx';
import { getMbbsCountry, mbbsCountries, mbbsEligibility, mbbsDocuments, mbbsAdmissionSteps, nmcRules } from '../data/mbbsCountries.js';
import { useEnquiry } from '../components/EnquiryModal.jsx';

export default function MbbsCountry({ slug }) {
  const c = getMbbsCountry(slug);
  const { openEnquiry } = useEnquiry();
  const path = `/mbbs-in-${c.slug}`;
  const crumbs = [
    { to: '/', label: 'Home' },
    { to: '/mbbs-abroad', label: 'MBBS Abroad' },
    { to: path, label: `MBBS in ${c.name}` },
  ];
  const others = mbbsCountries.filter((x) => x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <Seo path={path} />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Medical Abroad"
        flag={c.code}
        title={`MBBS in ${c.name}`}
        subtitle={c.tagline}
        aside={<EnquiryForm title={`MBBS in ${c.name} – free counselling`} subtitle="Get a university-wise fee sheet" defaultInterest="MBBS Abroad" defaultCountry={`MBBS – ${c.name}`} source={`MBBS in ${c.name}`} showMessage={false} />}
      >
        <div className="hero-actions">
          <button type="button" className="btn btn-accent" onClick={() => openEnquiry({ interest: 'MBBS Abroad', country: c.name })}>
            Talk to an Admission Expert
          </button>
          <Link to="/mbbs-abroad#eligibility" className="btn btn-outline-light">Check Eligibility</Link>
        </div>
      </PageHero>

      <section className="section section-tight">
        <div className="container">
          <h2 className="h3">Life in {c.name}</h2>
          <FactStrip
            facts={c.facts}
            extra={[{ icon: Clock, label: 'Course duration', value: c.duration }, { icon: BookOpen, label: 'Medium', value: c.medium }]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <article className="content">
            <p className="lead">{c.intro}</p>

            <h2>MBBS in {c.name} at a glance</h2>
            <div className="table-wrap">
              <table>
                <tbody>
                  <tr><th scope="row">Course duration</th><td>{c.duration}</td></tr>
                  <tr><th scope="row">Medium of instruction</th><td>{c.medium}</td></tr>
                  <tr><th scope="row">Tuition fee (indicative)</th><td>{c.tuition}</td></tr>
                  <tr><th scope="row">Total tuition (indicative)</th><td>{c.totalCost}</td></tr>
                  <tr><th scope="row">Hostel (indicative)</th><td>{c.hostel}</td></tr>
                  <tr><th scope="row">Eligibility</th><td>NEET-UG qualified + 50% PCB (40% reserved)</td></tr>
                  <tr><th scope="row">Main intake</th><td>September / October</td></tr>
                </tbody>
              </table>
            </div>
            <p className="muted small">Fees differ by university and change yearly. We share a written, university-wise fee sheet during counselling.</p>

            <h2>Why study MBBS in {c.name}?</h2>
            <CheckList items={c.why} />

            <h2>Eligibility for MBBS in {c.name}</h2>
            <CheckList items={mbbsEligibility} />

            <InlineCTA title={`Want to know the exact fees for MBBS in ${c.name}?`} text="Get a university-wise comparison of tuition, hostel and food costs." interest="MBBS Abroad" country={c.name} />

            <h2>Top medical universities in {c.name}</h2>
            <ul className="uni-grid">
              {c.universities.map((u) => <li key={u}>{u}</li>)}
            </ul>
            <p className="muted small">University names are for reference. We confirm each programme’s NMC compliance and current fees before recommending it.</p>

            <h2>NMC rules you must check</h2>
            <CheckList items={nmcRules} />

            <h2>Student life in {c.name}</h2>
            <p>{c.life}</p>

            <h2>Documents required</h2>
            <CheckList items={mbbsDocuments} columns={2} />
          </article>

          <aside className="sidebar">
            <div className="sidebar-card">
              <h3>Quick facts</h3>
              <dl>
                <dt>Duration</dt><dd>{c.duration}</dd>
                <dt>Tuition</dt><dd>{c.tuition}</dd>
                <dt>Medium</dt><dd>{c.medium}</dd>
              </dl>
              <button type="button" className="btn btn-primary btn-block" onClick={() => openEnquiry({ interest: 'MBBS Abroad', country: c.name })}>Get Free Counselling</button>
            </div>
            <div className="sidebar-card">
              <h3>Other MBBS destinations</h3>
              <ul className="sidebar-links">
                {mbbsCountries.filter((x) => x.slug !== c.slug).map((x) => (
                  <li key={x.slug}><Link to={`/mbbs-in-${x.slug}`}>MBBS in {x.name}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title={`MBBS in ${c.name} – admission process`} subtitle="A clear, step-by-step process for students and parents." />
          <Journey steps={mbbsAdmissionSteps} />
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <FAQ items={c.faqs} subtitle={`Common questions about MBBS in ${c.name}.`} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Compare other MBBS destinations" />
          <div className="card-grid cols-4">
            {others.map((x) => (
              <CountryCard key={x.slug} to={`/mbbs-in-${x.slug}`} code={x.code} name={`MBBS in ${x.name}`} text={x.tagline} meta={x.tuition} />
            ))}
          </div>
        </div>
      </section>

      <CTABand title={`Planning MBBS in ${c.name}?`} text="Get honest advice, a written cost estimate and complete admission support." interest="MBBS Abroad" country={c.name} />
    </>
  );
}
