export type TeamMember = {
  slug: 'roman' | 'olena' | 'oleksandr';
  /** Cloudinary folder under znimay/team/ */
  folder: string;
  name: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    slug: 'roman',
    folder: 'roman',
    name: 'Roman',
    bio: 'Продакшн у кадрі: світло, ритм і історії для фото та відео.',
  },
  {
    slug: 'olena',
    folder: 'olena',
    name: 'Olena',
    bio: 'Мʼяка естетика й чиста композиція — атмосфера, в якій легко бути собою.',
  },
  {
    slug: 'oleksandr',
    folder: 'alex',
    name: 'Oleksandr',
    bio: 'Між красою та зухвалістю — сміливі образи з характером.',
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
