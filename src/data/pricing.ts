import type { Lang } from '../i18n/config';

export type PriceLine = Record<Lang, string>;

export type PackageOffer = {
  id: 'express' | 'pro' | 'pro-max';
  name: string;
  duration: PriceLine;
  /** One line under the price — what you get, at a glance */
  summary: PriceLine;
  features: PriceLine[];
  price: number;
};

export type HourlyRate = {
  title: PriceLine;
  lead: PriceLine;
  includes: PriceLine[];
  price: number;
  unit: PriceLine;
};

export type VideoRate = {
  title: PriceLine;
  lead: PriceLine;
  note: PriceLine;
  fromPrice: number;
};

export const packages: PackageOffer[] = [
  {
    id: 'express',
    name: 'Express',
    duration: { uk: '30 хв', en: '30 min' },
    summary: {
      uk: 'Студія + фотограф · 15+ фото',
      en: 'Studio + photographer · 15+ photos',
    },
    features: [
      { uk: 'фотостудія', en: 'photo studio' },
      { uk: 'фотограф', en: 'photographer' },
      { uk: '15+ фото в обробці', en: '15+ edited photos' },
    ],
    price: 2300,
  },
  {
    id: 'pro',
    name: 'Pro',
    duration: { uk: '60 хв', en: '60 min' },
    summary: {
      uk: 'Студія + фотограф · 30+ фото · відео',
      en: 'Studio + photographer · 30+ photos · video',
    },
    features: [
      { uk: 'фотостудія', en: 'photo studio' },
      { uk: 'фотограф', en: 'photographer' },
      { uk: '30+ фото в обробці', en: '30+ edited photos' },
      { uk: '1 відео-бекстейдж', en: '1 video backstage' },
    ],
    price: 3300,
  },
  {
    id: 'pro-max',
    name: 'Pro Max',
    duration: { uk: '90 хв', en: '90 min' },
    summary: {
      uk: 'Студія + фотограф · гримерка · 40+ фото · 2 рілс',
      en: 'Studio + photographer · dressing room · 40+ photos · 2 reels',
    },
    features: [
      { uk: 'фотостудія', en: 'photo studio' },
      { uk: 'фотограф', en: 'photographer' },
      { uk: '+ 1 година гримерки', en: '+ 1 hour dressing room' },
      { uk: '40+ фото в обробці', en: '40+ edited photos' },
      {
        uk: 'всі вдалі кадри з кольорокорекцією',
        en: 'all good shots with color correction',
      },
      { uk: '2 відео-рілс', en: '2 video reels' },
      { uk: 'бекстейдж', en: 'backstage' },
    ],
    price: 6000,
  },
];

export const hourly: HourlyRate = {
  title: {
    uk: 'Оренда студії',
    en: 'Studio rental',
  },
  lead: {
    uk: 'Без фотографа — лише простір і техніка.',
    en: 'No photographer — just the space and gear.',
  },
  includes: [
    { uk: 'усі локації студії', en: 'all studio locations' },
    {
      uk: 'гримерка (доступна за 15 хв до бронювання)',
      en: 'dressing room (arrive 15 min before booking)',
    },
    {
      uk: 'реквізит, техніка, елементи з гардеробу',
      en: 'props, gear, wardrobe pieces',
    },
  ],
  price: 800,
  unit: { uk: 'грн / год', en: 'UAH / hr' },
};

export const video: VideoRate = {
  title: {
    uk: 'Відеозйомка',
    en: 'Video shoot',
  },
  lead: {
    uk: 'Кліпи, рілс, бекстейдж — під ваш формат.',
    en: 'Clips, reels, backstage — shaped to your brief.',
  },
  note: {
    uk: 'Кожен проєкт обговорюємо окремо.',
    en: 'Every project is scoped individually.',
  },
  fromPrice: 1000,
};

export function formatUah(amount: number, lang: Lang, opts?: { from?: boolean }) {
  const value = amount.toLocaleString(lang === 'uk' ? 'uk-UA' : 'en-US');
  if (lang === 'uk') {
    return opts?.from ? `від ${value} грн` : `${value} грн`;
  }
  return opts?.from ? `from ${value} UAH` : `${value} UAH`;
}
