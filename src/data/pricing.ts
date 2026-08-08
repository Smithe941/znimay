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

export type VideoOffer = {
  id: 'reels' | 'promo' | 'clip' | 'hourly';
  name: PriceLine;
  /** Duration / format line — same slot as photo packages */
  meta: PriceLine;
  summary: PriceLine;
  features: PriceLine[];
  price: number;
  from?: boolean;
  per?: 'hour' | 'piece';
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

export const videoOffers: VideoOffer[] = [
  {
    id: 'reels',
    name: { uk: 'Рілс', en: 'Reels' },
    meta: { uk: '1 шт', en: '1 pc' },
    summary: {
      uk: 'Сценарій · зйомка · монтаж · музика',
      en: 'Script · shoot · edit · music',
    },
    features: [
      { uk: 'ідеї та сценарій', en: 'idea and script' },
      {
        uk: 'динамічний монтаж, субтитри, музика',
        en: 'dynamic edit, subtitles, music',
      },
      {
        uk: 'постійна співпраця: від 10 роликів — 12 000 грн',
        en: 'ongoing collaboration: from 10 films — 12,000 UAH',
      },
    ],
    price: 1500,
    per: 'piece',
  },
  {
    id: 'promo',
    name: { uk: 'Промо', en: 'Promo' },
    meta: { uk: 'реклама · корпоратив', en: 'ads · corporate' },
    summary: {
      uk: '4K · світло · монтаж · колір · звук',
      en: '4K · lighting · edit · color · sound',
    },
    features: [
      { uk: 'зйомка 4K', en: '4K capture' },
      { uk: 'студійне світло на локації', en: 'studio lighting on location' },
      {
        uk: 'монтаж, корекція кольору, саунд-дизайн',
        en: 'edit, color grade, sound design',
      },
    ],
    price: 12000,
    from: true,
  },
  {
    id: 'clip',
    name: { uk: 'Кліп', en: 'Clip' },
    meta: { uk: 'кліп · YouTube · подкаст', en: 'clip · YouTube · podcast' },
    summary: {
      uk: 'Сценарій · режисура · кілька камер · звук',
      en: 'Script · directing · multi-cam · audio',
    },
    features: [
      { uk: 'підготовка сценарію', en: 'script prep' },
      { uk: 'режисура на майданчику', en: 'directing on set' },
      {
        uk: 'багатокамерна зйомка + чистий звук',
        en: 'multi-cam shoot + clean audio',
      },
      { uk: 'грейдинг і стилізація', en: 'grading and look' },
      {
        uk: 'бюджет — після затвердження ідеї',
        en: 'budget after the idea is locked',
      },
    ],
    price: 15000,
    from: true,
  },
  {
    id: 'hourly',
    name: { uk: 'Погодинна', en: 'Hourly' },
    meta: { uk: 'бекстейдж · події', en: 'backstage · events' },
    summary: {
      uk: 'Виїзд з технікою · базовий монтаж',
      en: 'Travel with gear · basic edit',
    },
    features: [
      {
        uk: 'перша година (включає виїзд з технікою та базовий монтаж) — 3 000 грн',
        en: 'first hour (travel with gear and basic edit) — 3,000 UAH',
      },
      { uk: 'кожна наступна година — 2 000 грн', en: 'each extra hour — 2,000 UAH' },
    ],
    price: 3000,
    per: 'hour',
  },
];

export function formatUah(
  amount: number,
  lang: Lang,
  opts?: { from?: boolean; per?: 'hour' | 'piece' },
) {
  const value = amount.toLocaleString(lang === 'uk' ? 'uk-UA' : 'en-US');
  const unit =
    opts?.per === 'hour'
      ? lang === 'uk'
        ? ' / год'
        : ' / hr'
      : opts?.per === 'piece'
        ? lang === 'uk'
          ? ' / шт'
          : ' / pc'
        : '';
  if (lang === 'uk') {
    return `${opts?.from ? 'від ' : ''}${value} грн${unit}`;
  }
  return `${opts?.from ? 'from ' : ''}${value} UAH${unit}`;
}
