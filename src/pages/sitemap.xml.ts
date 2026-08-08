import type { APIRoute } from 'astro';
import { team } from '../data/team';
import { withBase } from '../lib/paths';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://znimay.art');
  const lastmod = new Date().toISOString().slice(0, 10);
  const paths = ['/', ...team.map((member) => `/port/${member.slug}/`)];

  const urls = paths
    .map((path) => {
      const loc = new URL(withBase(path), origin).href;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
