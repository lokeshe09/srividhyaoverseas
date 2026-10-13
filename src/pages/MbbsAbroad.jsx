import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { pageFaqs } from '../data/pageFaqs.js';
import EligibilityChecker from '../components/EligibilityChecker.jsx';
import { PageHero, SectionHeading, FAQ, CTABand, CheckList, CountryCard, Journey } from '../components/ui.jsx';
import { mbbsCountries, mbbsEligibility, mbbsDocuments, mbbsAdmissionSteps, nmcRules } from '../data/mbbsCountries.js';
import { useEnquiry } from '../components/EnquiryModal.jsx';

const faqs = pageFaqs.mbbsAbroad;

export default function MbbsAbroad() {
  const { openEnquiry } = useEnquiry();
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/mbbs-abroad', label: 'MBBS Abroad' }];

  return (
    <>
      <Seo path="/mbbs-abroad" />

      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Medical Abroad"
        title="MBBS Abroad for Indian Students"
        subtitle="Compare NMC-compliant medical universities abroad, understand the real cost and get complete admission support — from NEET result to university arrival."
      >
        <div className="hero-actions">
          <button type="button" className="btn btn-accent btn-lg" onClick={() => openEnquiry({ interest: 'MBBS Abroad' })}>Get Free Counselling</button>
          <a href="#eligibility" className="btn btn-outline-light btn-lg">Check Your Eligibility</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Countries" title="Choose your MBBS destination" subtitle="Indicative tuition per year. Click a country for universities, eligibility and documents." />
          <div className="card-grid cols-4">
            {mbbsCountries.map((c) => (
              <CountryCard key={c.slug} to={`/mbbs-in-${c.slug}`} code={c.code} name={`MBBS in ${c.name}`} text={c.tagline} meta={`${c.duration} • ${c.tuition}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Country-wise MBBS fee comparison" subtitle="Indicative ranges for planning — exact fees vary by university and year." />
          <div className="table-wrap">
            <table className="table-compare">
              <thead>
                <tr><th>Country</th><th>Duration</th><th>Tuition / year</th><th>Total tuition</th><th>Hostel / year</th></tr>
              </thead>
              <tbody>
                {mbbsCountries.map((c) => (
                  <tr key={c.slug}>
                    <td><Link to={`/mbbs-in-${c.slug}`}>{c.name}</Link></td>
                    <td>{c.duration}</td>
                    <td>{c.tuition}</td>
                    <td>{c.totalCost}</td>
                    <td>{c.hostel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="eligibility">
        <div className="container">
          <SectionHeading eyebrow="Eligibility" title="Check your MBBS abroad eligibility" subtitle="Answer five quick questions based on NMC criteria." />
          <EligibilityChecker />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container two-col">
          <div>
            <h2>Eligibility criteria</h2>
            <CheckList items={mbbsEligibility} />
          </div>
          <div>
            <h2>NMC rules for foreign medical graduates</h2>
            <CheckList items={nmcRules} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Process" title="MBBS abroad admission process" />
          <Journey steps={mbbsAdmissionSteps} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <h2 className="center">Documents required for MBBS abroad</h2>
          <CheckList items={mbbsDocuments} columns={2} />
          <p className="center mt">
            Read more: <Link to="/blog/mbbs-abroad-documents-required">MBBS abroad documents guide</Link> ·{' '}
            <Link to="/blog/how-to-choose-mbbs-abroad-university">How to choose an MBBS university</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <FAQ items={faqs} subtitle="Questions NEET students and parents ask us most." />
          <p className="center mt">
            Local counselling: <Link to="/mbbs-abroad-warangal">MBBS abroad consultants in Warangal</Link> ·{' '}
            <Link to="/mbbs-abroad-hyderabad">MBBS abroad consultants in Hyderabad</Link>
          </p>
        </div>
      </section>

      <CTABand title="Your MBBS dream deserves honest guidance" text="Get a free NEET-based counselling session and a written cost estimate." interest="MBBS Abroad" />
    </>
  );
}
