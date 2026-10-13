import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <section className="section not-found">
      <Helmet>
        <title>Page not found | Sri Vidhya Overseas</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container container-narrow center">
        <p className="eyebrow">404</p>
        <h1>We couldn’t find that page</h1>
        <p>The page may have moved. Try one of these instead:</p>
        <div className="hero-actions center-actions">
          <Link to="/" className="btn btn-primary">Home</Link>
          <Link to="/mbbs-abroad" className="btn btn-outline">MBBS Abroad</Link>
          <Link to="/study-abroad" className="btn btn-outline">Study Abroad</Link>
          <Link to="/contact" className="btn btn-outline">Contact</Link>
        </div>
      </div>
    </section>
  );
}
