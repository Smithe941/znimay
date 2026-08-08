const configuredBase = import.meta.env.BASE_URL || '/';

/** Normalize Astro BASE_URL to a path without trailing slash (except root). */
export function getBasePath() {
  if (!configuredBase || configuredBase === '/') return '';
  return configuredBase.replace(/\/$/, '');
}

export function withBase(path = '/') {
  const base = getBasePath();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!base) return normalized;
  if (normalized === '/') return `${base}/`;
  return `${base}${normalized}`;
}

export function homePath() {
  return withBase('/');
}

export function teamMemberPath(slug: string) {
  return withBase(`/port/${slug}/`);
}
