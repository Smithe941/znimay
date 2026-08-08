export type PackageOffer = {
  id: 'express' | 'pro' | 'pro-max';
  name: string;
  duration: string;
  /** One line under the price — what you get, at a glance */
  summary: string;
  features: string[];
  price: number;
};

export type HourlyRate = {
  title: string;
  lead: string;
  includes: string[];
  price: number;
  unit: string;
};

export type VideoOffer = {
  id: 'reels' | 'promo' | 'clip' | 'hourly';
  name: string;
  /** Duration / format line — same slot as photo packages */
  meta: string;
  summary: string;
  features: string[];
  price: number;
  from?: boolean;
  per?: 'hour' | 'piece';
};

export const packages: PackageOffer[] = [
  {
    id: 'express',
    name: 'Express',
    duration: '30 хв',
    summary: 'Студія + фотограф · 15+ фото',
    features: ['фотостудія', 'фотограф', '15+ фото в обробці'],
    price: 2300,
  },
  {
    id: 'pro',
    name: 'Pro',
    duration: '60 хв',
    summary: 'Студія + фотограф · 30+ фото · відео',
    features: ['фотостудія', 'фотограф', '30+ фото в обробці', '1 відео-бекстейдж'],
    price: 3300,
  },
  {
    id: 'pro-max',
    name: 'Pro Max',
    duration: '90 хв',
    summary: 'Студія + фотограф · гримерка · 40+ фото · 2 рілс',
    features: [
      'фотостудія',
      'фотограф',
      '+ 1 година гримерки',
      '40+ фото в обробці',
      'всі вдалі кадри з кольорокорекцією',
      '2 відео-рілс',
      'бекстейдж',
    ],
    price: 6000,
  },
];

export const hourly: HourlyRate = {
  title: 'Оренда студії',
  lead: 'Без фотографа — лише простір і техніка.',
  includes: [
    'усі локації студії',
    'гримерка (доступна за 15 хв до бронювання)',
    'реквізит, техніка, елементи з гардеробу',
  ],
  price: 800,
  unit: 'грн / год',
};

export const videoOffers: VideoOffer[] = [
  {
    id: 'reels',
    name: 'Рілс',
    meta: '1 шт',
    summary: 'Сценарій · зйомка · монтаж · музика',
    features: [
      'ідеї та сценарій',
      'динамічний монтаж, субтитри, музика',
      'постійна співпраця: від 10 роликів — 12 000 грн',
    ],
    price: 1500,
    per: 'piece',
  },
  {
    id: 'promo',
    name: 'Промо',
    meta: 'реклама · корпоратив',
    summary: '4K · світло · монтаж · колір · звук',
    features: [
      'зйомка 4K',
      'студійне світло на локації',
      'монтаж, корекція кольору, саунд-дизайн',
    ],
    price: 12000,
    from: true,
  },
  {
    id: 'clip',
    name: 'Кліп',
    meta: 'кліп · YouTube · подкаст',
    summary: 'Сценарій · режисура · кілька камер · звук',
    features: [
      'підготовка сценарію',
      'режисура на майданчику',
      'багатокамерна зйомка + чистий звук',
      'грейдинг і стилізація',
      'бюджет — після затвердження ідеї',
    ],
    price: 15000,
    from: true,
  },
  {
    id: 'hourly',
    name: 'Погодинна',
    meta: 'бекстейдж · події',
    summary: 'Виїзд з технікою · базовий монтаж',
    features: [
      'перша година (включає виїзд з технікою та базовий монтаж) — 3 000 грн',
      'кожна наступна година — 2 000 грн',
    ],
    price: 3000,
    per: 'hour',
  },
];

export function formatUah(
  amount: number,
  opts?: { from?: boolean; per?: 'hour' | 'piece' },
) {
  const value = amount.toLocaleString('uk-UA');
  const unit =
    opts?.per === 'hour' ? ' / год' : opts?.per === 'piece' ? ' / шт' : '';
  return `${opts?.from ? 'від ' : ''}${value} грн${unit}`;
}
