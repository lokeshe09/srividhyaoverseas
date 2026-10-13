import Seo from '../components/Seo.jsx';
import { PageHero, SectionHeading, CTABand, CheckList, Journey } from '../components/ui.jsx';
import { team } from '../data/people.js';
import { journey } from '../data/services.js';
import { SITE } from '../config/site.js';

const values = [
  { t: 'Student-first', d: 'Every recommendation is based on the student’s profile, budget and goals.' },
  { t: 'Honesty', d: 'Accurate information and no false promises of guaranteed admission or visa.' },
  { t: 'Transparency', d: 'Clear communication about fees, costs and every step of the process.' },
  { t: 'Care', d: 'We treat every family’s decision as if it were our own — before and after departure.' },
];

export default function About() {
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/about', label: 'About Us' }];
  return (
    <>
      <Seo path="/about" />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="About Us"
        title="Welcome to Sri Vidhya Overseas"
        subtitle="Helping students from Warangal, Hyderabad and across Telangana turn their overseas education plans into reality — with honesty, clarity and care."
      />

      <section className="section">
        <div className="container two-col">
          <div className="content">
            <h2>Who we are</h2>
            <p>
              {SITE.name} is an overseas education consultancy serving students and parents from our offices in Warangal and
              Hyderabad. We specialise in MBBS abroad, UK education, Master’s programmes and university admissions across popular
              study destinations.
            </p>
            <p>
              Choosing to study abroad is one of the biggest decisions a family makes. Our role is to give you accurate, up-to-date
              information, explain your options clearly and support you at every step — so you can make that decision with
              confidence.
            </p>
          </div>
          <div className="content">
            <h2>Our mission</h2>
            <p>
              To provide accurate information, ethical guidance and personalised support to every student, so that more students
              from Telangana can access quality global education.
            </p>
            <h2>What we do</h2>
            <CheckList
              items={[
                'MBBS abroad admissions at NMC-compliant universities',
                'UK undergraduate and Master’s admissions',
                'Study abroad counselling and university shortlisting',
                'Applications, SOPs and LORs',
                'Scholarship and education-loan guidance',
                'Student visa and pre-departure support',
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading title="Our values" />
          <div className="card-grid cols-4">
            {values.map((v) => <div key={v.t} className="info-box"><h3>{v.t}</h3><p>{v.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title="Our student-first approach" subtitle="Because your journey abroad deserves clarity, honesty and expert guidance." />
          <Journey steps={journey} />
        </div>
      </section>

      {team.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeading title="Meet our counsellors" />
            <div className="card-grid cols-4">
              {team.map((m) => (
                <div key={m.name} className="team-card">
                  {m.photo && <img src={m.photo} alt={m.name} loading="lazy" />}
                  <h3>{m.name}</h3>
                  <p className="muted">{m.role}</p>
                  {m.bio && <p>{m.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-alt">
        <div className="container container-narrow content center">
          <h2>Our commitment</h2>
          <p>
            Admission and visa decisions are made by universities and embassies — no consultant can guarantee them. What we commit to
            is accurate information, careful preparation and honest advice at every step, including telling you when an option is not
            right for you.
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
