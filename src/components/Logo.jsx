import { Link } from 'react-router-dom';
import { SITE } from '../config/site.js';

// Text-only wordmark for now. Add the official logo image here when available.
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo${light ? ' logo-light' : ''}`} aria-label={`${SITE.name} – Home`}>
      <span className="logo-text">
        <strong>Sri Vidhya</strong>
        <small>Overseas</small>
      </span>
    </Link>
  );
}
