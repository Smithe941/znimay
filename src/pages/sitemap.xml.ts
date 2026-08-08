import type { APIRoute } from 'astro';
import { team } from '../data/team';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://smithe941.github.io');
  const paths = ['/', ...team.map((member) => `/port/${member.slug}/`)];

  const urls = paths
    .map((path) => {
      const loc = new URL(path, origin).href;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
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
