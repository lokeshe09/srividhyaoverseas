import { useState } from 'react';
import Seo from '../components/Seo.jsx';
import { PageHero, BlogCard, CTABand } from '../components/ui.jsx';
import { blogPosts } from '../data/blog.js';

export default function Blog() {
  const categories = ['All', ...new Set(blogPosts.map((p) => p.category))];
  const [cat, setCat] = useState('All');
  const posts = cat === 'All' ? blogPosts : blogPosts.filter((p) => p.category === cat);
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/blog', label: 'Blog' }];

  return (
    <>
      <Seo path="/blog" />
      <PageHero breadcrumbs={crumbs} eyebrow="Blog" title="Insights, Guides & Updates" subtitle="Practical articles on MBBS abroad, UK education, scholarships, loans and visas." />

      <section className="section">
        <div className="container">
          <div className="chips chips-center" role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} className={`chip${cat === c ? ' is-on' : ''}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="card-grid cols-3 mt-lg">
            {posts.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
