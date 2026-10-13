import { useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { PageHero, BlogCard, CTABand, InlineCTA, formatDate } from '../components/ui.jsx';
import { getBlogPost, blogPosts } from '../data/blog.js';
import { SITE } from '../config/site.js';
import NotFound from './NotFound.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  if (!post) return <NotFound />;

  const path = `/blog/${post.slug}`;
  const crumbs = [{ to: '/', label: 'Home' }, { to: '/blog', label: 'Blog' }, { to: path, label: post.title }];
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const more = related.length ? related : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const isMbbs = post.category === 'MBBS Abroad';

  return (
    <>
      <Seo path={path} />
      <PageHero breadcrumbs={crumbs} eyebrow={post.category} title={post.title} subtitle={post.excerpt}>
        <p className="post-meta">
          By Team {SITE.name} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
        </p>
      </PageHero>

      <section className="section">
        <div className="container container-narrow">
          <article className="content post-body">
            {post.sections.map((s, i) => (
              <div key={i}>
                {s.h && <h2>{s.h}</h2>}
                {s.p?.map((t) => <p key={t}>{t}</p>)}
                {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
              </div>
            ))}
            <p className="muted small mt-lg">
              Information in this article is for general guidance and may change. Always confirm the latest details with the
              university or the official government website.
            </p>
          </article>
          <InlineCTA
            title={isMbbs ? 'Have questions about MBBS abroad?' : 'Need personalised guidance?'}
            text="Talk to our counsellors in Warangal or Hyderabad — the first session is free."
            interest={isMbbs ? 'MBBS Abroad' : undefined}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="center">Related articles</h2>
          <div className="card-grid cols-3 mt">
            {more.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
