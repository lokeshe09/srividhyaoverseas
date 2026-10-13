import Seo from '../components/Seo.jsx';
import { PageHero } from '../components/ui.jsx';
import { SITE } from '../config/site.js';

// Template legal text — have it reviewed before going live.
function LegalPage({ title, path, sections }) {
  return (
    <>
      <Seo path={path} />
      <PageHero breadcrumbs={[{ to: '/', label: 'Home' }, { to: path, label: title }]} title={title} />
      <section className="section">
        <div className="container container-narrow content">
          {sections.map(([h, p]) => (
            <div key={h}>
              <h2 className="h3">{h}</h2>
              <p>{p}</p>
            </div>
          ))}
          <p className="muted small">Last updated: {new Date().getFullYear()}</p>
        </div>
      </section>
    </>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      sections={[
        ['Information we collect', 'When you submit an enquiry, call or message us, we collect details such as your name, phone number, email, city, academic information and study preferences.'],
        ['How we use your information', 'We use your information only to provide counselling, respond to your enquiry, process applications you ask us to make, and share relevant updates. We do not sell your personal data.'],
        ['Sharing', 'With your consent, we share necessary details with universities, lenders or service providers involved in your application. We may disclose information where required by law.'],
        ['WhatsApp and third-party services', 'Enquiry forms may open WhatsApp to send your details to us. Your use of WhatsApp is governed by its own privacy policy.'],
        ['Cookies', 'This website may use basic cookies and analytics to understand usage and improve the site.'],
        ['Data security', 'We take reasonable measures to protect your information, but no method of transmission over the internet is completely secure.'],
        ['Your choices', `You can ask us to update or delete your information at any time by contacting us on ${SITE.phoneDisplay}.`],
        ['Changes', 'We may update this policy from time to time. Changes take effect when posted on this page.'],
      ]}
    />
  );
}

export function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms-and-conditions"
      sections={[
        ['Our services', `${SITE.name} provides counselling and guidance for overseas education, MBBS abroad, admissions, scholarships, education loans and visas.`],
        ['No guarantees', 'Admission, scholarship, loan and visa decisions are made solely by universities, lenders and government authorities. We do not guarantee any outcome.'],
        ['Accuracy of information', 'Fees, eligibility, rankings and visa rules mentioned on this website are indicative and change frequently. Always confirm with official sources; we confirm the latest information during counselling.'],
        ['Student responsibilities', 'Students must provide true, complete and accurate documents and information. Submitting false documents can lead to refusal and legal consequences.'],
        ['Fees & payments', 'Any service fees are communicated in writing before you engage a paid service. Fees paid to universities, embassies and third parties are governed by their own refund policies.'],
        ['Intellectual property', 'Content on this website belongs to Sri Vidhya Overseas and may not be copied without permission.'],
        ['Governing law', 'These terms are governed by the laws of India, with jurisdiction in Telangana.'],
      ]}
    />
  );
}
