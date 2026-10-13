import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowRight, Phone, Landmark, Languages, Coins, Thermometer } from 'lucide-react';
import { flagUrl, telLink } from '../utils/contact.js';
import { useEnquiry } from './EnquiryModal.jsx';

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.to}>
            {i < items.length - 1 ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
            {i < items.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ eyebrow, title, subtitle, breadcrumbs, flag, children, aside }) {
  return (
    <section className={`page-hero${aside ? ' page-hero-split' : ''}`}>
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
          <h1>
            {flag && <img className="hero-flag" src={flagUrl(flag, 80)} alt="" width="40" height="27" />}
            {title}
          </h1>
          {subtitle && <p className="page-hero-sub">{subtitle}</p>}
          {children}
        </div>
        {aside && <div className="page-hero-aside">{aside}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center = true, as: H = 'h2' }) {
  return (
    <div className={`section-heading${center ? ' is-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H>{title}</H>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  );
}

export function FAQ({ items, title = 'Frequently Asked Questions', subtitle }) {
  const [open, setOpen] = useState(0);
  if (!items?.length) return null;
  return (
    <div className="faq">
      {title && <SectionHeading title={title} subtitle={subtitle} />}
      <div className="faq-list">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
              <button type="button" className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{f.q}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </button>
              <div className="faq-a" hidden={!isOpen}>
                <p>{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CTABand({
  title = 'Ready to start your study abroad journey?',
  text = 'Free counselling and a personalised shortlist — talk to our team in Warangal or Hyderabad.',
  interest,
  country,
}) {
  const { openEnquiry } = useEnquiry();
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
          <p className="cta-trust">Free first session • Honest advice • End-to-end support</p>
        </div>
        <div className="cta-actions">
          <button type="button" className="btn btn-accent btn-lg" onClick={() => openEnquiry({ interest, country })}>
            Get Free Counselling
          </button>
          <a href={telLink} className="btn btn-outline-light btn-lg">
            <Phone size={18} aria-hidden="true" /> Talk to an Expert
          </a>
        </div>
      </div>
    </section>
  );
}

export function FactStrip({ facts, extra = [] }) {
  if (!facts) return null;
  const items = [
    { icon: Landmark, label: 'Capital', value: facts.capital },
    { icon: Languages, label: 'Language', value: facts.language },
    { icon: Coins, label: 'Currency', value: facts.currency },
    { icon: Thermometer, label: 'Climate', value: facts.climate },
    ...extra,
  ];
  return (
    <div className="fact-strip">
      {items.map(({ icon: Ico, label, value }) => (
        <div className="fact" key={label}>
          <Ico size={22} aria-hidden="true" />
          <div>
            <span className="fact-label">{label}</span>
            <strong className="fact-value">{value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CountryCard({ to, code, name, text, meta }) {
  return (
    <Link to={to} className="country-card">
      <div className="country-card-top">
        <img src={flagUrl(code)} alt={`${name} flag`} width="56" height="38" loading="lazy" />
        <h3>{name}</h3>
      </div>
      {text && <p>{text}</p>}
      {meta && <p className="country-card-meta">{meta}</p>}
      <span className="link-arrow">
        Explore <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}

export function Journey({ steps }) {
  return (
    <ol className="journey">
      {steps.map((s, i) => (
        <li key={s.title} className="journey-step">
          <span className="journey-num">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items, columns = 1 }) {
  return (
    <ul className={`checklist${columns > 1 ? ` cols-${columns}` : ''}`}>
      {items.map((it) => <li key={it}>{it}</li>)}
    </ul>
  );
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <span className="blog-cat">{post.category}</span>
      <h3>
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      <div className="blog-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
      </div>
    </article>
  );
}

export function InlineCTA({ title, text, interest, country }) {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="inline-cta">
      <div>
        <h3>{title}</h3>
        {text && <p>{text}</p>}
      </div>
      <button type="button" className="btn btn-primary" onClick={() => openEnquiry({ interest, country })}>
        Get Free Counselling
      </button>
    </div>
  );
}
