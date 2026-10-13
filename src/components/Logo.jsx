import { Link } from 'react-router-dom';
import { SITE } from '../config/site.js';

// Text + SVG mark. Replace with the official logo image when available.
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo${light ? ' logo-light' : ''}`} aria-label={`${SITE.name} – Home`}>
      <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="currentColor" />
        <path d="M14 40c6-14 16-22 36-24-10 6-17 14-21 26" fill="none" stroke="#f5a524" strokeWidth="5" strokeLinecap="round" />
        <circle cx="20" cy="46" r="5" fill="#fff" />
      </svg>
      <span className="logo-text">
        <strong>Sri Vidhya</strong>
        <small>Overseas</small>
      </span>
    </Link>
  );
}
