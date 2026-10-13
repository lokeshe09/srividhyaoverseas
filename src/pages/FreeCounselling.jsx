import Seo from '../components/Seo.jsx';
import { pageFaqs } from '../data/pageFaqs.js';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { PageHero, FAQ, CheckList, Journey } from '../components/ui.jsx';

const next = [
  { title: 'We call you', text: 'A counsellor contacts you, usually within 24 hours.' },
  { title: 'Profile evaluation', text: 'We understand your academics, budget and goals.' },
  { title: 'Recommendations', text: 'Country, course and university options — explained clearly.' },
  { title: 'Next steps', text: 'A clear plan for applications, tests, finances and visa.' },
];

const faqs = pageFaqs.freeCounselling;

export default function FreeCounselling() {
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/free-counselling', label: 'Free Counselling' }];
  return (
    <>
      <Seo path="/free-counselling" />
      <PageHero breadcrumbs={crumbs} eyebrow="Free Counselling" title="Get Free Counselling Today" subtitle="Fill in your details and our counsellor will contact you, usually within 24 hours." />

      <section className="section">
        <div className="container two-col">
          <EnquiryForm title="Book your free session" subtitle="" source="Free counselling page" />
          <div>
            <h2 className="h3">Why book with us</h2>
            <CheckList
              items={[
                '100% free first counselling session',
                'MBBS abroad and study abroad under one roof',
                'Profile-based, honest recommendations',
                'Scholarship and education-loan guidance',
                'Complete visa and pre-departure support',
                'Offices in Warangal and Hyderabad',
              ]}
            />
            <h2 className="h3 mt-lg">What happens next?</h2>
            <Journey steps={next} />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container container-narrow">
          <FAQ items={faqs} />
        </div>
      </section>
    </>
  );
}
