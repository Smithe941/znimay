import type { Lang } from './config';

const uk = {
  meta: {
    siteTitle: 'ЗНІМАЙ',
    siteDescription: 'ЗНІМАЙ — продакшн-студія з власним простором: фото, відео, подкасти.',
  },
  nav: {
    team: 'Портфоліо',
    studio: 'Простір',
    pricing: 'Прайс',
    contact: 'Контакти',
    home: 'Головна',
  },
  hero: {
    brand: 'ЗНІМАЙ',
    tagline: 'Продакшн-студія з власним простором для фото, відео та подкастів.',
    ctaTeam: 'Команда',
    ctaContact: 'Звʼязатися',
  },
  team: {
    title: 'Команда',
    subtitle: 'Люди, з якими знімаємо й записуємо у нашому просторі.',
    viewPortfolio: 'Портфоліо',
  },
  studio: {
    title: 'Простір',
    subtitle:
      'Простір із характером: біла циклорама, кілька постійних зон, а також можливість зібрати декорації під вашу історію.',
    tabTour: '3D Тур',
    tabLocations: 'Локації',
    roomsNav: 'Кімнати',
    panoHint: 'Клікайте стрілки на панорамі · на телефоні — двома пальцями',
    panoLoading: 'Завантаження простору…',
    locationsIntro:
      'Частина простору вже живе своїм життям. Іншу — намалюємо разом з вами.',
    locationsPrev: 'Попередня локація',
    locationsNext: 'Наступна локація',
  },
  pricing: {
    title: 'Прайс',
    subtitle: 'Зйомка з фотографом, оренда студії або відео.',
    tabShoot: 'Фото',
    tabRent: 'Оренда',
    tabVideo: 'Відео',
    shootLead: 'Пакетні пропозиції. Ми про все потурбуємося.',
    details: 'Деталі',
    ctaDiscuss: 'Обговорити',
  },
  contact: {
    title: 'Контакти',
    subtitle: 'Напишіть, щоб обговорити проєкт або оренду простору.',
    telegramLabel: 'Telegram',
    instagramLabel: 'Instagram',
  },
  portfolio: {
    back: 'Повернутися до студії',
    gallery: 'Роботи',
    galleriesNav: 'Галереї',
    nextGallery: 'Далі',
    empty: 'Галерея скоро зʼявиться.',
    emptyTitle: 'Роботи ще в дорозі',
    emptyBody:
      'Портфоліо цього автора скоро зʼявиться тут. Тим часом дивіться свіжі зйомки в Instagram студії.',
    emptyCta: 'Instagram студії',
    otherMembers: 'Інші автори',
    lightboxPrev: 'Попереднє',
    lightboxNext: 'Наступне',
    lightboxClose: 'Закрити',
  },
  footer: {
    rights: 'ЗНІМАЙ. Усі права захищено.',
  },
  lang: {
    uk: 'UA',
    en: 'EN',
    switchTo: 'Мова',
  },
} as const;

const en: typeof uk = {
  meta: {
    siteTitle: 'ЗНІМАЙ',
    siteDescription: 'ЗНІМАЙ — a production studio with its own space for photo, video, and podcasts.',
  },
  nav: {
    team: 'Portfolio',
    studio: 'Space',
    pricing: 'Pricing',
    contact: 'Contact',
    home: 'Home',
  },
  hero: {
    brand: 'ЗНІМАЙ',
    tagline: 'A production studio with its own space for photo, video, and podcasts.',
    ctaTeam: 'Team',
    ctaContact: 'Get in touch',
  },
  team: {
    title: 'Team',
    subtitle: 'The people we shoot and record with in our space.',
    viewPortfolio: 'Portfolio',
  },
  studio: {
    title: 'Space',
    subtitle:
      'A basement with character: a white cyclorama, several standing zones — and room to shape a set around your story.',
    tabTour: '3D Tour',
    tabLocations: 'Locations',
    roomsNav: 'Rooms',
    panoHint: 'Click the arrows on the panorama · on mobile use two fingers',
    panoLoading: 'Loading the space…',
    locationsIntro:
      'Some of the space already has a life of its own. The rest — we can invent with you.',
    locationsPrev: 'Previous location',
    locationsNext: 'Next location',
  },
  pricing: {
    title: 'Pricing',
    subtitle: 'A shoot with a photographer, studio rental, or video.',
    tabShoot: 'Shoot',
    tabRent: 'Rental',
    tabVideo: 'Video',
    shootLead: 'Package deals. We take care of everything.',
    details: 'Details',
    ctaDiscuss: 'Discuss',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Write to discuss a project or booking the space.',
    telegramLabel: 'Telegram',
    instagramLabel: 'Instagram',
  },
  portfolio: {
    back: 'Back to studio',
    gallery: 'Work',
    galleriesNav: 'Galleries',
    nextGallery: 'Next',
    empty: 'Gallery coming soon.',
    emptyTitle: 'Work on the way',
    emptyBody:
      'This photographer’s portfolio will appear here soon. Meanwhile, see recent shoots on the studio Instagram.',
    emptyCta: 'Studio Instagram',
    otherMembers: 'Other photographers',
    lightboxPrev: 'Previous',
    lightboxNext: 'Next',
    lightboxClose: 'Close',
  },
  footer: {
    rights: 'ЗНІМАЙ. All rights reserved.',
  },
  lang: {
    uk: 'UA',
    en: 'EN',
    switchTo: 'Language',
  },
};

export const ui = { uk, en } as const;

export function t(lang: Lang) {
  return ui[lang];
}
