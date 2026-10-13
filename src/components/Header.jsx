import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, Phone, MessageCircle, MapPin } from 'lucide-react';
import { SITE } from '../config/site.js';
import { studyCountries } from '../data/studyCountries.js';
import { mbbsCountries } from '../data/mbbsCountries.js';
import { services } from '../data/services.js';
import { telLink, whatsappLink, flagUrl } from '../utils/contact.js';
import { useEnquiry } from './EnquiryModal.jsx';
import Logo from './Logo.jsx';

const ukLinks = [
  { to: '/study-in-uk', label: 'Study in UK' },
  { to: '/uk-masters', label: 'UK Master’s Programs' },
  { to: '/study-in-uk-warangal', label: 'UK Consultants – Warangal' },
  { to: '/study-in-uk-hyderabad', label: 'UK Consultants – Hyderabad' },
];

const serviceLinks = [
  ...services.map((s) => ({ to: `/services#${s.id}`, label: s.title })),
  { to: '/scholarships', label: 'Scholarships' },
  { to: '/education-loan', label: 'Education Loan', badge: 'New' },
  { to: '/student-visa', label: 'Student Visa' },
];

const simpleLinks = [
  { to: '/exams', label: 'Exams' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
];

function CountryLink({ to, code, label }) {
  return (
    <Link to={to} className="mega-country">
      <img src={flagUrl(code, 40)} alt="" width="24" height="16" loading="lazy" />
      <span>{label}</span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState({});
  const [desktopMenu, setDesktopMenu] = useState(null);
  const { pathname, hash } = useLocation();
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopMenu(null);
    // Drop focus from the clicked menu link so :focus-within doesn't keep the dropdown open.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const dropdownProps = (key) => ({
    className: `nav-item has-menu${desktopMenu === key ? ' is-open' : ''}`,
    onMouseEnter: () => setDesktopMenu(key),
    onMouseLeave: () => setDesktopMenu(null),
  });

  const triggerProps = (key) => ({
    type: 'button',
    className: 'nav-trigger',
    'aria-expanded': desktopMenu === key,
    onClick: () => setDesktopMenu((m) => (m === key ? null : key)),
  });

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-loc">
            <MapPin size={14} aria-hidden="true" /> Warangal • Hyderabad • Telangana
          </span>
          <div className="topbar-links">
            <a href={telLink}>
              <Phone size={14} aria-hidden="true" /> {SITE.phoneDisplay}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} aria-hidden="true" /> WhatsApp
            </a>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container header-inner">
          <Logo />

          <nav className="desktop-nav" aria-label="Main">
            <div {...dropdownProps('countries')}>
              <button {...triggerProps('countries')}>
                Explore Countries <ChevronDown size={16} aria-hidden="true" />
              </button>
              <div className="mega-menu">
                <div className="mega-col mega-col-wide">
                  <Link to="/study-abroad" className="mega-heading">Study Abroad →</Link>
                  <div className="mega-grid">
                    {studyCountries.map((c) => (
                      <CountryLink key={c.slug} to={`/study-in-${c.slug}`} code={c.code} label={c.name} />
                    ))}
                  </div>
                </div>
                <div className="mega-col">
                  <Link to="/mbbs-abroad" className="mega-heading">Medical Abroad (MBBS) →</Link>
                  <div className="mega-grid mega-grid-1">
                    {mbbsCountries.map((c) => (
                      <CountryLink key={c.slug} to={`/mbbs-in-${c.slug}`} code={c.code} label={`MBBS in ${c.name}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-item">
              <NavLink to="/mbbs-abroad" className="nav-link">MBBS Abroad</NavLink>
            </div>

            <div {...dropdownProps('uk')}>
              <button {...triggerProps('uk')}>
                Study in UK <ChevronDown size={16} aria-hidden="true" />
              </button>
              <div className="dropdown">
                {ukLinks.map((l) => (
                  <Link key={l.to} to={l.to}>{l.label}</Link>
                ))}
              </div>
            </div>

            <div {...dropdownProps('services')}>
              <button {...triggerProps('services')}>
                Services <span className="badge-new">New</span> <ChevronDown size={16} aria-hidden="true" />
              </button>
              <div className="dropdown dropdown-wide">
                {serviceLinks.map((l) => (
                  <Link key={l.to} to={l.to}>
                    {l.label} {l.badge && <span className="badge-new">{l.badge}</span>}
                  </Link>
                ))}
              </div>
            </div>

            {simpleLinks.map((l) => (
              <div className="nav-item" key={l.to}>
                <NavLink to={l.to} className="nav-link">{l.label}</NavLink>
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="btn btn-primary btn-sm header-cta" onClick={() => openEnquiry()}>
              Free Counselling
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — mirrors the accordion pattern from the reference site */}
      <div className={`mobile-drawer${mobileOpen ? ' is-open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-head">
          <Logo />
          <button type="button" className="menu-toggle" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <X size={26} />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile">
          <button type="button" className="m-row" aria-expanded={!!open.countries} onClick={() => toggle('countries')}>
            Explore Countries <ChevronDown size={20} className={open.countries ? 'rot' : ''} />
          </button>
          {open.countries && (
            <div className="m-sub">
              <button type="button" className="m-row m-row-sub" aria-expanded={!!open.study} onClick={() => toggle('study')}>
                Study Abroad <ChevronRight size={18} className={open.study ? 'rot90' : ''} />
              </button>
              {open.study && (
                <div className="m-sub">
                  {studyCountries.map((c) => (
                    <Link key={c.slug} className="m-row m-row-leaf" to={`/study-in-${c.slug}`}>
                      {c.name} <ChevronRight size={16} />
                    </Link>
                  ))}
                  <Link className="m-row m-row-leaf m-all" to="/study-abroad">All destinations</Link>
                </div>
              )}
              <button type="button" className="m-row m-row-sub" aria-expanded={!!open.medical} onClick={() => toggle('medical')}>
                Medical Abroad <ChevronRight size={18} className={open.medical ? 'rot90' : ''} />
              </button>
              {open.medical && (
                <div className="m-sub">
                  {mbbsCountries.map((c) => (
                    <Link key={c.slug} className="m-row m-row-leaf" to={`/mbbs-in-${c.slug}`}>
                      {c.name} <ChevronRight size={16} />
                    </Link>
                  ))}
                  <Link className="m-row m-row-leaf m-all" to="/mbbs-abroad">MBBS Abroad overview</Link>
                </div>
              )}
            </div>
          )}

          <button type="button" className="m-row" aria-expanded={!!open.uk} onClick={() => toggle('uk')}>
            Study in UK <ChevronDown size={20} className={open.uk ? 'rot' : ''} />
          </button>
          {open.uk && (
            <div className="m-sub">
              {ukLinks.map((l) => (
                <Link key={l.to} className="m-row m-row-leaf" to={l.to}>{l.label}</Link>
              ))}
            </div>
          )}

          <button type="button" className="m-row" aria-expanded={!!open.services} onClick={() => toggle('services')}>
            <span>Our Services <span className="badge-new">New</span></span>
            <ChevronDown size={20} className={open.services ? 'rot' : ''} />
          </button>
          {open.services && (
            <div className="m-sub">
              {serviceLinks.map((l) => (
                <Link key={l.to} className="m-row m-row-leaf" to={l.to}>{l.label}</Link>
              ))}
            </div>
          )}

          {[...simpleLinks, { to: '/contact', label: 'Contact' }].map((l) => (
            <Link key={l.to} className="m-row" to={l.to}>{l.label}</Link>
          ))}
        </nav>
        <div className="mobile-drawer-foot">
          <button type="button" className="btn btn-primary btn-block" onClick={() => { setMobileOpen(false); openEnquiry(); }}>
            Get Free Counselling
          </button>
          <div className="mobile-contact">
            <a className="btn btn-outline" href={telLink}><Phone size={18} /> Call</a>
            <a className="btn btn-whatsapp" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      {mobileOpen && <div className="drawer-backdrop" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
