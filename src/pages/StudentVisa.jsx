import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { pageFaqs } from '../data/pageFaqs.js';
import { PageHero, SectionHeading, FAQ, CTABand, CheckList, Journey } from '../components/ui.jsx';
import { studyCountries } from '../data/studyCountries.js';
import { useEnquiry } from '../components/EnquiryModal.jsx';

const support = [
  { title: 'Checklist', text: 'Country-specific document checklist for your visa type.' },
  { title: 'Finances', text: 'Plan proof of funds, sponsor documents and loan letters.' },
  { title: 'Application', text: 'Guidance on filling the online application accurately.' },
  { title: 'Appointment', text: 'Biometrics / interview booking and what to carry.' },
  { title: 'Mock interview', text: 'Practice sessions for interview-based visas.' },
  { title: 'Decision & travel', text: 'Next steps after approval — travel, insurance and arrival.' },
];

const faqs = pageFaqs.studentVisa;

export default function StudentVisa() {
  const { openEnquiry } = useEnquiry();
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/student-visa', label: 'Student Visa' }];
  return (
    <>
      <Seo path="/student-visa" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Our Services"
        title="Student Visa Assistance"
        subtitle="Careful documentation, financial preparation and interview practice — so your visa application is complete and consistent."
      >
        <div className="hero-actions">
          <button type="button" className="btn btn-accent btn-lg" onClick={() => openEnquiry({ interest: 'Student Visa' })}>Get Visa Guidance</button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading title="How we support your visa" />
          <Journey steps={support} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Student visas by country" subtitle="Indicative overview — always follow the official immigration website." />
          <div className="table-wrap">
            <table className="table-compare">
              <thead>
                <tr><th>Country</th><th>Visa</th><th>Work while studying</th><th>Post-study work</th></tr>
              </thead>
              <tbody>
                {studyCountries.map((c) => (
                  <tr key={c.slug}>
                    <td><Link to={`/study-in-${c.slug}`}>{c.name}</Link></td>
                    <td>{c.visa.name}</td>
                    <td>{c.workWhileStudying}</td>
                    <td>{c.postStudyWork}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>Common mistakes to avoid</h2>
            <CheckList
              items={[
                'Funds below the required amount or not held for the required period',
                'Unexplained large deposits in bank statements',
                'Information that differs between forms and documents',
                'Weak explanation of study gaps or course choice',
                'Applying too close to the course start date',
              ]}
            />
            <p className="mt"><Link to="/blog/student-visa-process-common-mistakes">Read the full guide</Link></p>
          </div>
          <div>
            <h2>MBBS abroad visas</h2>
            <p>
              For MBBS abroad, the university issues an admission / invitation letter, after which you apply for the student visa of
              that country. Some countries require apostilled documents and medical tests. We guide you through every step — see the{' '}
              <Link to="/mbbs-abroad">MBBS abroad guide</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <FAQ items={faqs} />
        </div>
      </section>

      <CTABand title="Prepare your visa application with experts" interest="Student Visa" />
    </>
  );
}
