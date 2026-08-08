import type { Lang } from '../i18n/config';

export type ServiceBlock = {
  id: string;
  title: Record<Lang, string>;
  lead: Record<Lang, string>;
  items: {
    title: Record<Lang, string>;
    body: Record<Lang, string>;
  }[];
};

/** Editable copy for the Services section — tweak titles/bodies freely. */
export const serviceBlocks: ServiceBlock[] = [
  {
    id: 'core',
    title: { uk: 'Основні послуги', en: 'Core services' },
    lead: {
      uk: 'Від ідеї до готового матеріалу — у нашому просторі або з виїздом.',
      en: 'From idea to finished work — in our space or on location.',
    },
    items: [
      {
        title: { uk: 'Фотосесії під ключ', en: 'Turnkey photoshoots' },
        body: {
          uk: 'Сімейні, фешн, арт, бізнес і портрети. Допомагаємо з ідеєю, образом, світлом і відбором кадрів — ви отримуєте готовий результат.',
          en: 'Family, fashion, art, business, and portraits. We help with the idea, look, light, and selects — you get a finished result.',
        },
      },
      {
        title: { uk: 'Відео будь-якого формату', en: 'Video of any format' },
        body: {
          uk: 'Reels, кліпи, рекламні ролики, інтервʼю й репортаж. Знімаємо, монтуємо й пакуємо під платформи, які вам потрібні.',
          en: 'Reels, clips, ads, interviews, and reportage. We shoot, edit, and package for the platforms you need.',
        },
      },
      {
        title: { uk: 'Супровід бізнесу', en: 'Business content support' },
        body: {
          uk: 'Контент для брендів і команд: зйомки продукту, співробітників, відкриттів і регулярний візуальний супровід.',
          en: 'Content for brands and teams: product, people, openings, and ongoing visual support.',
        },
      },
      {
        title: { uk: 'Оренда студії', en: 'Studio rental' },
        body: {
          uk: 'Простір із циклорамою, зонами, гримеркою й світлом — для вашої команди або з нашим фотографом.',
          en: 'A space with cyclorama, zones, dressing room, and lights — for your team or with our photographer.',
        },
      },
      {
        title: { uk: 'Безкоштовна оренда одягу', en: 'Free wardrobe rental' },
        body: {
          uk: 'Одяг, наявний у гримерці, можна взяти на зйомку без доплати.',
          en: 'Clothing available in the dressing room can be used on the shoot at no extra cost.',
        },
      },
    ],
  },
  {
    id: 'events',
    title: { uk: 'Івенти', en: 'Events' },
    lead: {
      uk: 'Організовуємо й знімаємо події в студії або на локації.',
      en: 'We host and shoot events in the studio or on location.',
    },
    items: [
      {
        title: { uk: 'Студійні події', en: 'Studio events' },
        body: {
          uk: 'Презентації, воркшопи, креативні зустрічі та закриті зйомки для спільнот і брендів у нашому просторі.',
          en: 'Presentations, workshops, creative meetups, and private shoots for communities and brands in our space.',
        },
      },
      {
        title: { uk: 'Фото / відео покриття', en: 'Photo / video coverage' },
        body: {
          uk: 'Повний візуальний супровід івенту: репортаж, портрети гостей, вертикальний контент для соцмереж і швидка віддача.',
          en: 'Full visual coverage: reportage, guest portraits, vertical social content, and a fast turnaround.',
        },
      },
      {
        title: { uk: 'Корпоративні формати', en: 'Corporate formats' },
        body: {
          uk: 'Тімбілдинги, день компанії, зйомки для внутрішніх і зовнішніх комунікацій — під ваш брендбук.',
          en: 'Team days, company events, and shoots for internal or external communications — aligned to your brand.',
        },
      },
    ],
  },
  {
    id: 'certificates',
    title: { uk: 'Сертифікати', en: 'Certificates' },
    lead: {
      uk: 'Будь-яку нашу послугу можна оформити як подарунковий сертифікат.',
      en: 'Any of our services can be purchased as a gift certificate.',
    },
    items: [],
  },
];
