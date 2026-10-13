import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import { PageHero, SectionHeading, CTABand } from '../components/ui.jsx';
import { exams } from '../data/exams.js';

export default function Exams() {
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/exams', label: 'Exams' }];
  return (
    <>
      <Seo path="/exams" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Exams & Tests"
        title="Tests Required to Study Abroad"
        subtitle="Know which test you need, the format and the score to aim for. Always confirm the requirement on your university’s course page."
      />

      <section className="section">
        <div className="container">
          <div className="card-grid cols-2">
            {exams.map((e) => (
              <article key={e.id} id={e.id} className="exam-card">
                <h2 className="h3">{e.name}</h2>
                <p className="muted">{e.full}</p>
                <dl className="exam-dl">
                  <dt>Needed for</dt><dd>{e.for}</dd>
                  <dt>Mode</dt><dd>{e.mode}</dd>
                  <dt>Scoring</dt><dd>{e.scoring}</dd>
                  <dt>Duration</dt><dd>{e.duration}</dd>
                  <dt>Sections</dt><dd>{e.sections}</dd>
                </dl>
                <a href={e.official} target="_blank" rel="noopener noreferrer" className="link-arrow">
                  Official website <ExternalLink size={14} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <p className="center mt-lg">
            Read: <Link to="/blog/ielts-vs-pte-for-uk-university-admissions">IELTS vs PTE for UK admissions</Link>
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow center">
          <SectionHeading title="Not sure which test to take?" subtitle="We look at your target countries and universities and tell you exactly which test and score you need." />
        </div>
      </section>

      <CTABand title="Get guidance on the right test for you" />
    </>
  );
}
