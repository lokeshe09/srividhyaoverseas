import { createElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSeo, buildHeadTags } from '../data/seo.js';

// All titles, descriptions, keywords, Open Graph / Twitter tags and JSON-LD come from
// src/data/seo.js — the same data the build-time prerender writes into static HTML.
export default function Seo({ path }) {
  const seo = getSeo(path);
  if (!seo) return null;
  return (
    <Helmet prioritizeSeoTags>
      {buildHeadTags(seo).map(({ tag, attrs = {}, children }, i) =>
        createElement(tag, { key: `${tag}-${i}`, ...attrs }, children)
      )}
    </Helmet>
  );
}
