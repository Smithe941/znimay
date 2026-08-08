export const languages = ['uk', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'uk';

export const LANG_STORAGE_KEY = 'znimay-lang';
export const LANG_COOKIE_NAME = 'znimay_lang';

export function isLang(value: string): value is Lang {
  return languages.includes(value as Lang);
}
