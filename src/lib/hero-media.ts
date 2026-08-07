import fs from 'node:fs';
import path from 'node:path';

/** Local hero carousel frames from `public/media/hero`. */
export function listHeroImages(baseUrl = '/'): string[] {
  const dir = path.join(process.cwd(), 'public/media/hero');
  if (!fs.existsSync(dir)) return [];

  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `${base}media/hero/${file}`);
}
