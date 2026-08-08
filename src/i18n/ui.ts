import type { Lang } from './config';

const uk = {
  meta: {
    siteTitle: 'ЗНІМАЙ — фотостудія в Черкасах',
    siteDescription:
      'Простора фотостудія в Черкасах. Фотосесії під ключ: сімейні, фешн, арт, бізнес. Зйомка відео будь-якого формату та супровід бізнесу.',
    keywords:
      'фотостудія Черкаси, фотосесія Черкаси, Надпільна, фотостудія Надпільна, сімейна фотосесія, фешн зйомка, арт фото, бізнес фото, відеозйомка Черкаси, оренда студії, ЗНІМАЙ',
    ogTitle: 'ЗНІМАЙ — простора фотостудія в Черкасах',
    locale: 'uk_UA',
  },
  nav: {
    team: 'Портфоліо',
    studio: 'Простір',
    services: 'Послуги',
    servicesAndPricing: 'Послуги та прайс',
    pricing: 'Прайс',
    contact: 'Контакти',
    home: 'Меню',
  },
  hero: {
    brand: 'ЗНІМАЙ',
    tagline:
      'Простора фотостудія в Черкасах. Фотосесії під ключ — сімейні, фешн, арт, бізнес. Відео будь-якого формату.',
    menuTagline: 'Фотостудія в Черкасах',
    ctaTeam: 'Портфоліо',
    ctaContact: 'Звʼязатися',
  },
  team: {
    title: 'Портфоліо',
    subtitle: 'Стиль кожного артиста — оберіть, чий погляд близький саме вам.',
    viewPortfolio: 'Дивитись роботи',
  },
  studio: {
    title: 'Простір',
    subtitle:
      'Студія з характером: циклорама, постійні зони й можливість зібрати декорації під вашу історію.',
    tabInfo: 'Інфо',
    tabLocations: 'Локації',
    tabTour: '3D Тур',
    tabTourHint: 'Заглянути всередину',
    roomsNav: 'Кімнати',
    panoHint: 'Тягни, щоб оглянути · стрілки ведуть далі',
    panoLoading: 'Завантаження простору…',
    locationsPrev: 'Попередня локація',
    locationsNext: 'Наступна локація',
    tourClose: 'Закрити тур',
    advantages: [
      'Окрема комфортна гримерка — місце не лише підготуватися до зйомки, а й зняти естетичний бʼюті-контент.',
      'Великий майданчик, де за одну сесію можна змінити кілька образів і втілити різні ідеї.',
      'Біла циклорама в центрі студії дає чисте поле без горизонту — простір для будь-якого кадру.',
      'Зони від циклорами до пілону для танцю: різні настрої в одному просторі.',
      'Команда допоможе продумати ідею й зібрати потрібну декорацію заздалегідь.',
      'Повний світловий парк — імпульс, постійне й RGB, з модифікаторами та насадками під будь-яку задачу.',
    ],
  },
  services: {
    title: 'Послуги',
    subtitle:
      'Фото, відео, івенти та сертифікати — усе, що потрібно для вашої історії в кадрі.',
    cta: 'Обговорити проєкт',
  },
  pricing: {
    title: 'Прайс',
    subtitle: 'Зйомка з фотографом, відео або оренда студії.',
    tabShoot: 'Фото',
    tabRent: 'Оренда',
    tabVideo: 'Відео',
    shootLead: 'Пакетні пропозиції. Ми про все потурбуємося.',
    videoLead: 'Рілси, реклама, кліпи — під ваш формат.',
    details: 'Деталі',
    giftNote: 'Будь-яку нашу послугу можна оформити як подарунковий сертифікат.',
    ctaDiscuss: 'Звʼяжіться з нами',
  },
  contact: {
    title: 'Контакти',
    subtitle:
      'Напишіть, щоб обговорити фотосесію, відеозйомку чи оренду студії в Черкасах.',
    telegramLabel: 'Telegram',
    instagramLabel: 'Instagram',
    addressLabel: 'Адреса',
    openMap: 'Відкрити в Google Maps',
    mapTitle: 'Студія на мапі',
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
    siteTitle: 'ZNIMAY — photo studio in Cherkasy',
    siteDescription:
      'A spacious photo studio in Cherkasy. Turnkey photoshoots: family, fashion, art, business. Video of any format and business content support.',
    keywords:
      'photo studio Cherkasy, photoshoot Cherkasy, Nadpilna, photo studio Nadpilna, family photoshoot, fashion shoot, art photography, business photography, video production Cherkasy, studio rental, ZNIMAY',
    ogTitle: 'ZNIMAY — a spacious photo studio in Cherkasy',
    locale: 'en_US',
  },
  nav: {
    team: 'Portfolio',
    studio: 'Space',
    services: 'Services',
    servicesAndPricing: 'Services & pricing',
    pricing: 'Pricing',
    contact: 'Contact',
    home: 'Menu',
  },
  hero: {
    brand: 'ЗНІМАЙ',
    tagline:
      'A spacious photo studio in Cherkasy. Turnkey photoshoots — family, fashion, art, business. Video of any format.',
    menuTagline: 'Photo studio in Cherkasy',
    ctaTeam: 'Portfolio',
    ctaContact: 'Get in touch',
  },
  team: {
    title: 'Portfolio',
    subtitle: 'Each artist’s style — pick the eye that feels right for your story.',
    viewPortfolio: 'View work',
  },
  studio: {
    title: 'Space',
    subtitle:
      'A studio with character: a cyclorama, standing zones — and room to build a set around your story.',
    tabInfo: 'Info',
    tabLocations: 'Locations',
    tabTour: '3D Tour',
    tabTourHint: 'Look inside',
    roomsNav: 'Rooms',
    panoHint: 'Drag to look around · arrows move you',
    panoLoading: 'Loading the space…',
    locationsPrev: 'Previous location',
    locationsNext: 'Next location',
    tourClose: 'Close tour',
    advantages: [
      'A private makeup room — not only for getting ready, but for clean beauty content of your own.',
      'A large floor plan where several looks and ideas can live in a single session.',
      'A white cyclorama at the heart of the studio: a seamless field for any frame.',
      'Zones from cyclorama to a dance pole — different moods under one roof.',
      'Our team will talk through your idea and build the set you need in advance.',
      'A full light kit — strobe, continuous, and RGB — with modifiers and attachments for any brief.',
    ],
  },
  services: {
    title: 'Services',
    subtitle: 'Photo, video, events, and certificates — everything for your story in frame.',
    cta: 'Discuss a project',
  },
  pricing: {
    title: 'Pricing',
    subtitle: 'A shoot with a photographer, video, or studio rental.',
    tabShoot: 'Shoot',
    tabRent: 'Rental',
    tabVideo: 'Video',
    shootLead: 'Package deals. We take care of everything.',
    videoLead: 'Reels, ads, clips — shaped to your brief.',
    details: 'Details',
    giftNote: 'Any of our services can be issued as a gift certificate.',
    ctaDiscuss: 'Get in touch',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Write to discuss a photoshoot, video shoot, or studio rental in Cherkasy.',
    telegramLabel: 'Telegram',
    instagramLabel: 'Instagram',
    addressLabel: 'Address',
    openMap: 'Open in Google Maps',
    mapTitle: 'Studio on the map',
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
