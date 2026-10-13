import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, ShieldCheck, MapPin, FileCheck2, HeartHandshake, Scale, ArrowRight, Stethoscope, GraduationCap,
  BookOpenCheck, Award, CheckCircle2, Sparkles, MessageCircle, Languages, BadgeCheck, XCircle, Plane,
} from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Icon from '../components/Icon.jsx';
import HeroVideo from '../components/HeroVideo.jsx';
import { SectionHeading, FAQ, CTABand, BlogCard } from '../components/ui.jsx';
import { useEnquiry } from '../components/EnquiryModal.jsx';
import { studyCountries } from '../data/studyCountries.js';
import { mbbsCountries } from '../data/mbbsCountries.js';
import { services, journey } from '../data/services.js';
import { exams } from '../data/exams.js';
import { homeFaqs } from '../data/faqs.js';
import { blogPosts } from '../data/blog.js';
import { testimonials } from '../data/people.js';
import { telLink, whatsappLink, flagUrl } from '../utils/contact.js';
import { SITE } from '../config/site.js';

const quickGoals = [
  { label: 'MBBS Abroad', interest: 'MBBS Abroad', icon: Stethoscope },
  { label: 'Study in UK', interest: 'Study in UK', icon: GraduationCap },
  { label: 'Master’s Abroad', interest: 'Master’s / PG Abroad', icon: BookOpenCheck },
  { label: 'Not sure yet', interest: 'Not sure yet', icon: Sparkles },
];

const stats = [
  { value: mbbsCountries.length, label: 'MBBS destinations' },
  { value: studyCountries.length, label: 'Study-abroad countries' },
  { value: SITE.offices.length, label: 'Offices in Telangana' },
  { value: '₹0', label: 'First counselling session' },
];

const promises = [
  'Accurate, up-to-date information — with official sources',
  'Written, university-wise cost estimates before you decide',
  'Only NMC-compliant MBBS programmes recommended',
  'Parents involved at every important step',
  'Support continues after you fly',
];

const neverDo = ['“Guaranteed” admission or visa claims', 'Hidden charges or surprise fees', 'Pushing a university for commission'];

const reasons = [
  { icon: ShieldCheck, title: 'NMC-aware MBBS guidance', text: 'Every MBBS programme is checked against current NMC rules for foreign medical graduates.' },
  { icon: Scale, title: 'Transparent & ethical', text: 'Clear process, written estimates and honest advice — even when the answer is “not this one”.' },
  { icon: FileCheck2, title: 'End-to-end support', text: 'Shortlisting, SOPs, applications, finances, visa filing, travel and arrival.' },
  { icon: Languages, title: 'Telugu & English', text: 'Counselling in the language your family is most comfortable with.' },
  { icon: MapPin, title: 'Local offices', text: 'Meet us in person in Warangal or Hyderabad — parents are always welcome.' },
  { icon: HeartHandshake, title: 'Care after admission', text: 'We stay in touch with students and parents after departure.' },
];

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 520 520" className="hero-globe-svg">
        <defs>
          <radialGradient id="globeFill" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#7fb6ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0a2746" stopOpacity="0.18" />
          </radialGradient>
          <linearGradient id="arc" x1="0" x2="1">
            <stop offset="0%" stopColor="#f5a524" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f5a524" />
          </linearGradient>
        </defs>
        <circle cx="260" cy="260" r="200" fill="url(#globeFill)" />
        <g fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2">
          <ellipse cx="260" cy="260" rx="200" ry="70" />
          <ellipse cx="260" cy="260" rx="200" ry="140" />
          <ellipse cx="260" cy="260" rx="70" ry="200" />
          <ellipse cx="260" cy="260" rx="140" ry="200" />
          <line x1="60" y1="260" x2="460" y2="260" />
          <line x1="260" y1="60" x2="260" y2="460" />
        </g>
        <circle cx="260" cy="260" r="200" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        {/* Flight paths from Hyderabad */}
        <g fill="none" stroke="url(#arc)" strokeWidth="2.5" strokeLinecap="round" className="hero-arcs">
          <path d="M318 318 Q 250 170 150 150" />
          <path d="M318 318 Q 300 190 210 110" />
          <path d="M318 318 Q 360 200 330 120" />
          <path d="M318 318 Q 420 300 410 200" />
        </g>
        <g fill="#f5a524">
          <circle cx="150" cy="150" r="5" />
          <circle cx="210" cy="110" r="5" />
          <circle cx="330" cy="120" r="5" />
          <circle cx="410" cy="200" r="5" />
        </g>
        <circle cx="318" cy="318" r="9" fill="#fff" />
        <circle cx="318" cy="318" r="18" fill="none" stroke="#fff" strokeOpacity="0.5" className="hero-pulse" />
      </svg>

      <div className="float-card float-card-1">
        <img src={flagUrl('kg', 40)} alt="" width="28" height="19" />
        <div>
          <strong>MBBS in Kyrgyzstan</strong>
          <span>Tuition from ₹3 lakh / year*</span>
        </div>
      </div>
      <div className="float-card float-card-2">
        <img src={flagUrl('gb', 40)} alt="" width="28" height="19" />
        <div>
          <strong>UK Master’s</strong>
          <span>Finish in just 1 year</span>
        </div>
      </div>
      <div className="float-card float-card-3">
        <CheckCircle2 size={22} className="text-success" />
        <div>
          <strong>Visa file checklist</strong>
          <span>Prepared step by step</span>
        </div>
      </div>
      <div className="float-pin">
        <MapPin size={14} /> Warangal • Hyderabad
      </div>
    </div>
  );
}

function DestinationTabs() {
  const [tab, setTab] = useState('mbbs');
  const list =
    tab === 'mbbs'
      ? mbbsCountries.map((c) => ({ key: c.slug, to: `/mbbs-in-${c.slug}`, code: c.code, name: `MBBS in ${c.name}`, sub: c.tuition, tag: c.duration }))
      : studyCountries.map((c) => ({ key: c.slug, to: `/study-in-${c.slug}`, code: c.code, name: `Study in ${c.shortName}`, sub: c.costs.pg, tag: c.intakes[0] }));

  return (
    <div className="dest">
      <div className="tabs" role="tablist" aria-label="Destination type">
        <button type="button" role="tab" aria-selected={tab === 'mbbs'} className={tab === 'mbbs' ? 'is-active' : ''} onClick={() => setTab('mbbs')}>
          <Stethoscope size={18} aria-hidden="true" /> Medical Abroad (MBBS)
        </button>
        <button type="button" role="tab" aria-selected={tab === 'study'} className={tab === 'study' ? 'is-active' : ''} onClick={() => setTab('study')}>
          <GraduationCap size={18} aria-hidden="true" /> Study Abroad
        </button>
      </div>
      <div className="dest-grid" role="tabpanel">
        {list.map((c) => (
          <Link key={c.key} to={c.to} className="dest-card">
            <div className="dest-flag" style={{ backgroundImage: `url(${flagUrl(c.code, 320)})` }} />
            <div className="dest-body">
              <h3>{c.name}</h3>
              <p>{c.sub}</p>
              <span className="dest-tag">{c.tag}</span>
            </div>
            <ArrowRight size={18} className="dest-arrow" aria-hidden="true" />
          </Link>
        ))}
      </div>
      <p className="dest-note">
        *Indicative ranges for planning — we share a written, university-wise estimate during counselling.{' '}
        <Link to={tab === 'mbbs' ? '/mbbs-abroad' : '/study-abroad'}>
          {tab === 'mbbs' ? 'Compare all MBBS countries →' : 'Compare all study destinations →'}
        </Link>
      </p>
    </div>
  );
}

export default function Home() {
  const { openEnquiry } = useEnquiry();
  const marquee = [...mbbsCountries, ...studyCountries].filter((c, i, a) => a.findIndex((x) => x.code === c.code) === i);

  return (
    <>
      <Seo path="/" />

      {/* ============ HERO ============ */}
      <section className="home-hero">
        <HeroVideo />
        <div className="home-hero-bg" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <p className="hero-badge">
              <span className="dot" /> Now counselling for 2026–27 intakes
            </p>
            <h1>
              Overseas Education Consultants in <span className="text-gradient">Warangal &amp; Hyderabad</span>
            </h1>
            <p className="hero-lead">
              Honest, step-by-step guidance for <strong>MBBS abroad</strong>, <strong>UK education</strong> and{' '}
              <strong>Master’s programmes</strong> — from your first counselling session to the day you fly.
            </p>

            <div className="goal-picker">
              <p className="goal-label">What are you planning?</p>
              <div className="goal-options">
                {quickGoals.map(({ label, interest, icon: Ico }) => (
                  <button key={label} type="button" className="goal" onClick={() => openEnquiry({ interest })}>
                    <Ico size={18} aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-actions">
              <button type="button" className="btn btn-accent btn-lg" onClick={() => openEnquiry()}>
                Get Free Counselling <ArrowRight size={18} aria-hidden="true" />
              </button>
              <Link to="/mbbs-abroad#eligibility" className="btn btn-glass btn-lg">
                Check Your Eligibility
              </Link>
            </div>

            <div className="hero-contact">
              <a href={telLink}>
                <span className="hero-contact-icon"><Phone size={16} aria-hidden="true" /></span>
                <span><small>Talk to an Admission Expert</small>{SITE.phoneDisplay}</span>
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <span className="hero-contact-icon wa"><MessageCircle size={16} aria-hidden="true" /></span>
                <span><small>Prefer chat?</small>WhatsApp us</span>
              </a>
            </div>
          </div>

          <HeroVisual />
        </div>

        <div className="container">
          <ul className="stats-bar">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ COUNTRY MARQUEE ============ */}
      <section className="marquee" aria-label="Destinations we guide students to">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((c, i) => (
            <span className="marquee-item" key={`${c.code}-${i}`} aria-hidden={i >= marquee.length}>
              <img src={flagUrl(c.code, 40)} alt="" width="24" height="16" loading="lazy" />
              {c.shortName || c.name}
            </span>
          ))}
        </div>
      </section>

      {/* ============ PATHWAYS (BENTO) ============ */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="What we help with" title="Choose your path abroad" subtitle="Four focused pathways, one trusted team in Warangal and Hyderabad." />
          <div className="bento">
            <Link to="/mbbs-abroad" className="bento-card bento-feature reveal">
              <span className="bento-icon"><Stethoscope size={26} aria-hidden="true" /></span>
              <h3>MBBS Abroad</h3>
              <p>NMC-compliant medical universities in Russia, Kyrgyzstan, Georgia, Kazakhstan, Uzbekistan and more — with honest fee comparisons.</p>
              <ul className="bento-list">
                <li><BadgeCheck size={16} aria-hidden="true" /> NEET-based counselling</li>
                <li><BadgeCheck size={16} aria-hidden="true" /> University-wise cost sheet</li>
                <li><BadgeCheck size={16} aria-hidden="true" /> Visa, travel &amp; hostel support</li>
              </ul>
              <span className="link-arrow">Explore MBBS abroad <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>
            <Link to="/study-in-uk" className="bento-card reveal">
              <span className="bento-icon"><GraduationCap size={24} aria-hidden="true" /></span>
              <h3>Study in UK</h3>
              <p>Undergraduate and 1-year Master’s admissions, CAS and student visa.</p>
              <span className="link-arrow">Learn more <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>
            <Link to="/uk-masters" className="bento-card reveal">
              <span className="bento-icon"><BookOpenCheck size={24} aria-hidden="true" /></span>
              <h3>Master’s Abroad</h3>
              <p>MS, MBA and PG programmes in the UK, USA, Canada, Germany and Ireland.</p>
              <span className="link-arrow">Learn more <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>
            <Link to="/scholarships" className="bento-card bento-wide reveal">
              <span className="bento-icon"><Award size={24} aria-hidden="true" /></span>
              <div>
                <h3>Scholarships, Loans &amp; Visa</h3>
                <p>Find scholarships (including Telangana state schemes), plan education loans and prepare a strong visa file.</p>
              </div>
              <span className="link-arrow">See funding options <ArrowRight size={16} aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ DESTINATIONS (TABS) ============ */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="Destinations" title="Explore countries" subtitle="Switch between medical and study-abroad destinations to compare indicative costs." />
          <DestinationTabs />
        </div>
      </section>

      {/* ============ ELIGIBILITY BAND ============ */}
      <section className="section section-tight">
        <div className="container">
          <div className="elig-band reveal">
            <div className="elig-band-icon"><Stethoscope size={30} aria-hidden="true" /></div>
            <div className="elig-band-copy">
              <h2>Are you eligible for MBBS abroad?</h2>
              <p>Check NEET, PCB % and age criteria against NMC rules in under a minute — free and instant.</p>
            </div>
            <Link to="/mbbs-abroad#eligibility" className="btn btn-accent btn-lg">
              Check Eligibility <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ JOURNEY TIMELINE ============ */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="How it works" title="Your journey, step by step" subtitle="You always know what comes next — and who to call." />
          <ol className="timeline">
            {journey.map((s, i) => (
              <li key={s.title} className="timeline-step reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="timeline-dot">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="center mt-lg">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => openEnquiry()}>
              Start with a free session <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* ============ PROMISE ============ */}
      <section className="section section-dark">
        <div className="container promise">
          <div className="promise-copy reveal">
            <p className="eyebrow eyebrow-light">Why families trust us</p>
            <h2>Honest guidance is our whole business</h2>
            <p className="promise-lead">
              Studying abroad is one of the biggest decisions your family will make. We give you the facts, compare options side
              by side and let you decide — with no pressure and no false promises.
            </p>
            <div className="promise-cols">
              <div>
                <h3>We always give you</h3>
                <ul className="promise-list">
                  {promises.map((p) => <li key={p}><CheckCircle2 size={18} aria-hidden="true" /> {p}</li>)}
                </ul>
              </div>
              <div>
                <h3>We never do</h3>
                <ul className="promise-list promise-never">
                  {neverDo.map((p) => <li key={p}><XCircle size={18} aria-hidden="true" /> {p}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <div className="reason-grid">
            {reasons.map(({ icon: Ico, title, text }) => (
              <div key={title} className="reason reveal">
                <Ico size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Services" title="Everything you need, under one roof" />
          <div className="svc-grid">
            {services.map((s) => (
              <Link key={s.id} to={s.link} className="svc reveal">
                <span className="service-icon"><Icon name={s.icon} /></span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXAMS ============ */}
      <section className="section section-alt">
        <div className="container exams-split">
          <div>
            <p className="eyebrow">Exams</p>
            <h2>Know exactly which test you need</h2>
            <p className="muted">
              From NEET for MBBS abroad to IELTS, PTE, GRE and GMAT for study abroad — we tell you the test and the score to aim for,
              based on your target universities.
            </p>
            <Link to="/exams" className="btn btn-outline">Compare all tests</Link>
          </div>
          <div className="exam-strip">
            {exams.map((e) => (
              <Link key={e.id} to={`/exams#${e.id}`} className="exam-pill">
                <strong>{e.name}</strong>
                <span>{e.scoring}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS (only when genuine ones are added) ============ */}
      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow="Student stories" title="Hear from our students" />
            <div className="card-grid cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="testimonial reveal">
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{[t.course, t.city].filter(Boolean).join(' • ')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ LOCAL OFFICES ============ */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Visit us" title="Counselling in Warangal & Hyderabad" subtitle="Meet our counsellors in person — students and parents are always welcome." />
          <div className="office-duo">
            {[
              {
                city: 'Warangal',
                text: 'For students from Warangal, Hanamkonda, Kazipet, Jangaon, Karimnagar, Khammam and nearby districts.',
                links: [
                  ['/overseas-education-consultants-warangal', 'Overseas Education Consultants in Warangal'],
                  ['/mbbs-abroad-warangal', 'MBBS Abroad Consultants in Warangal'],
                  ['/study-in-uk-warangal', 'Study in UK Consultants in Warangal'],
                ],
              },
              {
                city: 'Hyderabad',
                text: 'For students across Hyderabad and Secunderabad — close to the city’s visa application centres.',
                links: [
                  ['/overseas-education-consultants-hyderabad', 'Overseas Education Consultants in Hyderabad'],
                  ['/mbbs-abroad-hyderabad', 'MBBS Abroad Consultants in Hyderabad'],
                  ['/study-in-uk-hyderabad', 'Study in UK Consultants in Hyderabad'],
                ],
              },
            ].map((o) => (
              <div key={o.city} className="office-tile reveal">
                <div className="office-tile-head">
                  <span className="office-tile-icon"><MapPin size={22} aria-hidden="true" /></span>
                  <div>
                    <h3>{o.city}</h3>
                    <p>{SITE.offices.find((x) => x.city === o.city)?.address || `${o.city}, Telangana`}</p>
                  </div>
                </div>
                <p className="muted">{o.text}</p>
                <ul className="office-tile-links">
                  {o.links.map(([to, label]) => (
                    <li key={to}><Link to={to}>{label} <ArrowRight size={14} aria-hidden="true" /></Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOG ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head-row">
            <SectionHeading eyebrow="Guides" title="Read before you decide" center={false} />
            <Link to="/blog" className="btn btn-outline">All articles</Link>
          </div>
          <div className="card-grid cols-3">
            {blogPosts.slice(0, 3).map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section">
        <div className="container faq-split">
          <div className="faq-aside">
            <p className="eyebrow">FAQs</p>
            <h2>Questions parents ask us most</h2>
            <p className="muted">Can’t find your answer? Talk to a counsellor — it’s free.</p>
            <div className="faq-contact">
              <a href={telLink} className="btn btn-primary"><Phone size={18} aria-hidden="true" /> Call {SITE.phoneDisplay}</a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp
              </a>
            </div>
            <div className="faq-plane" aria-hidden="true"><Plane size={120} /></div>
          </div>
          <FAQ items={homeFaqs} title={null} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
