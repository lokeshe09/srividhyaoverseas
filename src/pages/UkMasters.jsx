import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { pageFaqs } from '../data/pageFaqs.js';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { PageHero, SectionHeading, FAQ, CTABand, CheckList, Journey } from '../components/ui.jsx';
import { getStudyCountry } from '../data/studyCountries.js';

const courses = [
  { name: 'MSc Data Science / AI', for: 'B.Tech, B.Sc (Maths/Stats/CS), BCA' },
  { name: 'MSc Computer Science', for: 'B.Tech / BCA / B.Sc Computer Science' },
  { name: 'MSc Business Analytics', for: 'Any graduate with quantitative background' },
  { name: 'MBA / MSc Management', for: 'Graduates (MBA often needs work experience)' },
  { name: 'MSc Finance / Accounting', for: 'B.Com, BBA, Economics graduates' },
  { name: 'MSc Public Health', for: 'MBBS, BDS, B.Pharm, Nursing, Life Sciences' },
  { name: 'MSc Engineering Management', for: 'B.Tech / BE graduates' },
  { name: 'MSc Project Management', for: 'Graduates from most disciplines' },
  { name: 'MSc Cyber Security', for: 'B.Tech / BCA / B.Sc Computer Science' },
];

const steps = [
  { title: 'Profile review', text: 'Academics, backlogs, gap years, work experience and budget.' },
  { title: 'Shortlist', text: '5–8 universities across ambitious, moderate and safe options.' },
  { title: 'Applications', text: 'SOP, CV, LORs and application filing.' },
  { title: 'Offers & deposit', text: 'Compare offers, scholarships and pay the deposit.' },
  { title: 'CAS', text: 'Funds planning and credibility interview preparation.' },
  { title: 'Visa & travel', text: 'Student visa filing, accommodation and pre-departure.' },
];

const faqs = pageFaqs.ukMasters;

export default function UkMasters() {
  const uk = getStudyCountry('uk');
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/study-in-uk', label: 'Study in UK' }, { to: '/uk-masters', label: 'UK Master’s' }];
  return (
    <>
      <Seo path="/uk-masters" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="UK Education"
        flag="gb"
        title="UK Master’s Programs"
        subtitle="Earn a globally recognised Master’s degree in just one year — and save a year of fees and living costs."
        aside={<EnquiryForm title="Plan your UK Master’s" subtitle="Free shortlist within 24–48 hours" defaultInterest="Study in UK" defaultCountry="United Kingdom" source="UK Masters" showMessage={false} />}
      />

      <section className="section">
        <div className="container">
          <SectionHeading title="Popular UK Master’s courses" subtitle="Choose a course that builds on your degree and career goals." />
          <div className="card-grid cols-3">
            {courses.map((c) => (
              <div key={c.name} className="course-card">
                <h3>{c.name}</h3>
                <p><span className="muted">Suitable for:</span> {c.for}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container two-col">
          <div>
            <h2>Entry requirements</h2>
            <CheckList
              items={[
                'Recognised bachelor’s degree (3 or 4 years, depending on university)',
                'Typically 55–60%+ (higher for top universities)',
                'IELTS / PTE / TOEFL / Duolingo, or an English waiver where accepted',
                'Statement of Purpose (SOP) and updated CV',
                'Letters of Recommendation (usually two)',
                'Work experience for MBA programmes',
              ]}
            />
          </div>
          <div>
            <h2>Costs & intakes</h2>
            <div className="table-wrap">
              <table>
                <tbody>
                  <tr><th scope="row">Tuition</th><td>{uk.costs.pg}</td></tr>
                  <tr><th scope="row">Living costs</th><td>{uk.costs.living}</td></tr>
                  <tr><th scope="row">Intakes</th><td>{uk.intakes.join(', ')}</td></tr>
                  <tr><th scope="row">Work while studying</th><td>{uk.workWhileStudying}</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt small muted">{uk.postStudyWork}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title="Our UK Master’s admission process" />
          <Journey steps={steps} />
          <p className="center mt">
            Read: <Link to="/blog/uk-masters-admission-process-indian-students">UK Master’s admission timeline</Link> ·{' '}
            <Link to="/blog/university-of-east-london-courses-fees-entry-requirements">University of East London guide</Link>
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <FAQ items={faqs} />
          <p className="center mt">
            Local support: <Link to="/study-in-uk-hyderabad">UK consultants in Hyderabad</Link> · <Link to="/study-in-uk-warangal">UK consultants in Warangal</Link>
          </p>
        </div>
      </section>

      <CTABand title="Start your UK Master’s journey" interest="Study in UK" country="United Kingdom" />
    </>
  );
}
