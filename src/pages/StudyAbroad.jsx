import Seo from '../components/Seo.jsx';
import { pageFaqs } from '../data/pageFaqs.js';
import { PageHero, SectionHeading, CTABand, CountryCard, Journey, FAQ } from '../components/ui.jsx';
import { studyCountries } from '../data/studyCountries.js';
import { journey } from '../data/services.js';
import { useEnquiry } from '../components/EnquiryModal.jsx';

const faqs = pageFaqs.studyAbroad;

export default function StudyAbroad() {
  const { openEnquiry } = useEnquiry();
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/study-abroad', label: 'Study Abroad' }];
  return (
    <>
      <Seo path="/study-abroad" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Study Abroad"
        title="Study Abroad Destinations"
        subtitle="Explore top destinations and choose the country that best fits your academic goals, budget and career plans."
      >
        <div className="hero-actions">
          <button type="button" className="btn btn-accent btn-lg" onClick={() => openEnquiry()}>Book Free Counselling</button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading title="Popular study destinations" />
          <div className="card-grid cols-4">
            {studyCountries.map((c) => (
              <CountryCard key={c.slug} to={`/study-in-${c.slug}`} code={c.code} name={c.name} text={c.tagline} meta={`Intakes: ${c.intakes.slice(0, 2).map((i) => i.split(' ')[0]).join(', ')}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Compare at a glance" subtitle="Indicative ranges — confirm with the university before applying." />
          <div className="table-wrap">
            <table className="table-compare">
              <thead>
                <tr><th>Country</th><th>PG duration</th><th>PG tuition</th><th>Main intake</th><th>Post-study work</th></tr>
              </thead>
              <tbody>
                {studyCountries.map((c) => (
                  <tr key={c.slug}>
                    <td>{c.name}</td>
                    <td>{c.programs[1]?.duration}</td>
                    <td>{c.costs.pg}</td>
                    <td>{c.intakes[0]}</td>
                    <td>{c.postStudyWork.split('.')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title="Still unsure which country is right for you?" subtitle="Our step-by-step process helps you decide with confidence." />
          <Journey steps={journey} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <FAQ items={faqs} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
