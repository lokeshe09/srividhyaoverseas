import { Link } from 'react-router-dom';
import { SITE } from '../config/site.js';

// Official logo (globe + wordmark). WebP with PNG fallback, transparent background.
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo${light ? ' logo-light' : ''}`} aria-label={`${SITE.name} – Home`}>
      <picture>
        <source srcSet="/logo.webp" type="image/webp" />
        <img className="logo-img" src="/logo.png" alt={SITE.name} width="946" height="240" decoding="async" />
      </picture>
    </Link>
  );
}
