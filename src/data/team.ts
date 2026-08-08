import type { Lang } from '../i18n/config';

export type TeamMember = {
  slug: 'roman' | 'olena' | 'oleksandr';
  /** Cloudinary folder under znimay/team/ */
  folder: string;
  name: Record<Lang, string>;
  bio: Record<Lang, string>;
};

export const team: TeamMember[] = [
  {
    slug: 'roman',
    folder: 'roman',
    name: {
      uk: 'Roman',
      en: 'Roman',
    },
    bio: {
      uk: 'Продакшн у кадрі: світло, ритм і історії для фото та відео.',
      en: 'Production in frame: light, rhythm, and stories for photo and video.',
    },
  },
  {
    slug: 'olena',
    folder: 'olena',
    name: {
      uk: 'Olena',
      en: 'Olena',
    },
    bio: {
      uk: 'Мʼяка естетика й чиста композиція — атмосфера, в якій легко бути собою.',
      en: 'Soft aesthetics and clean composition — an atmosphere where it’s easy to be yourself.',
    },
  },
  {
    slug: 'oleksandr',
    folder: 'alex',
    name: {
      uk: 'Oleksandr',
      en: 'Oleksandr',
    },
    bio: {
      uk: 'Між красою та зухвалістю — сміливі образи з характером.',
      en: 'Between beauty and boldness — daring images with character.',
    },
  },
];

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}

/** One–two letter monogram for portrait fallbacks */
export function teamMonogram(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
