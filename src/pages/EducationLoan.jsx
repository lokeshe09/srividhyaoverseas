import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { pageFaqs } from '../data/pageFaqs.js';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { PageHero, SectionHeading, FAQ, CTABand, CheckList, Journey } from '../components/ui.jsx';

const lenderTypes = [
  { t: 'Public sector banks', d: 'Usually lower interest rates; collateral typically required above a certain loan amount.' },
  { t: 'Private banks', d: 'Faster processing; secured and unsecured options depending on profile.' },
  { t: 'NBFCs', d: 'Flexible eligibility and unsecured options for many universities; interest may be higher.' },
  { t: 'International lenders', d: 'Some lenders fund students at selected universities without an Indian co-applicant.' },
];

const steps = [
  { title: 'Share your details', text: 'Admission status, course, university and co-applicant details.' },
  { title: 'Eligibility check', text: 'We explain secured vs unsecured options for your profile.' },
  { title: 'Compare offers', text: 'Interest rate, margin money, processing fee and moratorium.' },
  { title: 'Documents', text: 'We help you prepare a complete, consistent document set.' },
  { title: 'Sanction', text: 'Loan sanction letter — usable as proof of funds for many visas.' },
];

const faqs = pageFaqs.educationLoan;

export default function EducationLoan() {
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/education-loan', label: 'Education Loan' }];
  return (
    <>
      <Seo path="/education-loan" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Our Services • New"
        title="Education Loans for Your Study Abroad Journey"
        subtitle="Understand your loan options, prepare the right documents and get your sanction on time for the visa."
        aside={<EnquiryForm title="Get loan guidance" subtitle="Tell us your plan — we’ll explain your options" defaultInterest="Scholarships / Education Loan" source="Education loan" showMessage={false} />}
      />

      <section className="section">
        <div className="container">
          <SectionHeading title="Types of lenders" subtitle="We help you understand and compare — the loan decision is always made by the lender." />
          <div className="card-grid cols-4">
            {lenderTypes.map((x) => <div className="info-box" key={x.t}><h3>{x.t}</h3><p>{x.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="How our loan guidance works" />
          <Journey steps={steps} />
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <h2>Documents usually required</h2>
            <CheckList
              items={[
                'Admission / offer letter and fee structure',
                '10th, 12th and degree mark sheets',
                'Test score reports (IELTS / GRE / NEET etc.)',
                'KYC of student and co-applicant (PAN, Aadhaar, passport)',
                'Co-applicant income proofs (salary slips / ITR / bank statements)',
                'Collateral documents for secured loans',
              ]}
            />
          </div>
          <div>
            <h2>What to compare</h2>
            <CheckList
              items={[
                'Interest rate (fixed or floating)',
                'Margin money and processing fees',
                'Moratorium period and repayment tenure',
                'Pre-disbursement for visa / proof of funds',
                'Pre-payment charges',
              ]}
            />
            <p className="mt">
              Read: <Link to="/blog/overseas-education-loan-documents-guide">Overseas education loan guide</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <FAQ items={faqs} />
        </div>
      </section>

      <CTABand title="Plan your finances with confidence" interest="Scholarships / Education Loan" />
    </>
  );
}
