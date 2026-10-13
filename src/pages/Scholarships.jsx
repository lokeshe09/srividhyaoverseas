import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { pageFaqs } from '../data/pageFaqs.js';
import { PageHero, SectionHeading, FAQ, CTABand, CheckList, InlineCTA } from '../components/ui.jsx';
import { studyCountries } from '../data/studyCountries.js';
import { useEnquiry } from '../components/EnquiryModal.jsx';

const faqs = pageFaqs.scholarships;

export default function Scholarships() {
  const { openEnquiry } = useEnquiry();
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/scholarships', label: 'Scholarships' }];
  return (
    <>
      <Seo path="/scholarships" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Funding"
        title="Study Abroad Scholarships"
        subtitle="Reduce the cost of your overseas education with government, university and state scholarships — we help you find the ones you are eligible for."
      >
        <div className="hero-actions">
          <button type="button" className="btn btn-accent btn-lg" onClick={() => openEnquiry({ interest: 'Scholarships / Education Loan' })}>Check My Scholarship Options</button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading title="Types of scholarships" />
          <div className="card-grid cols-4">
            {[
              { t: 'Government scholarships', d: 'Funded by foreign governments — e.g. Chevening (UK), DAAD (Germany), Stipendium Hungaricum (Hungary).' },
              { t: 'University merit awards', d: 'Partial tuition waivers based on academics, typically 10%–50%.' },
              { t: 'Early-bird & deposit discounts', d: 'Fee reductions for early acceptance or full fee payment.' },
              { t: 'State government schemes', d: 'Telangana overseas education schemes for eligible students from specific categories.' },
            ].map((x) => (
              <div className="info-box" key={x.t}><h3>{x.t}</h3><p>{x.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Country-wise scholarships" subtitle="Popular options — eligibility and amounts change every year." />
          <div className="card-grid cols-3">
            {studyCountries.map((c) => (
              <div key={c.slug} className="info-box">
                <h3><Link to={`/study-in-${c.slug}`}>{c.name}</Link></h3>
                <CheckList items={c.scholarships} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow content">
          <h2>Telangana overseas education schemes</h2>
          <p>
            The Government of Telangana runs overseas education schemes that provide financial assistance to eligible students from
            SC, ST, BC, minority and other notified categories for postgraduate studies abroad. Eligibility conditions such as income
            limits, academic scores, age and admission to a recognised foreign university apply.
          </p>
          <p>
            Always check the latest notification and apply through the official <strong>Telangana ePASS</strong> portal. We help you
            prepare the documents and plan your admission timeline accordingly.
          </p>
          <h2>What to check before applying</h2>
          <CheckList
            items={[
              'Eligibility — academic cut-offs, nationality, category and income limits',
              'What the award covers — tuition, living costs or both',
              'Application deadlines and required documents',
              'Renewal conditions for multi-year courses',
              'Whether a separate application or essay is needed',
            ]}
          />
          <InlineCTA title="Need help finding scholarships?" text="We match scholarships to your profile and deadlines." interest="Scholarships / Education Loan" />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <FAQ items={faqs} />
        </div>
      </section>

      <CTABand title="Find scholarships that match your profile" interest="Scholarships / Education Loan" />
    </>
  );
}
