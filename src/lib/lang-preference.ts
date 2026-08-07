/**
 * Persist language preference in localStorage + cookie.
 * Used by root redirect and language switcher.
 */
import {
  LANG_COOKIE_NAME,
  LANG_STORAGE_KEY,
  defaultLang,
  isLang,
  type Lang,
} from '../i18n/config';

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function readStoredLang(): Lang | null {
  try {
    const fromStorage = localStorage.getItem(LANG_STORAGE_KEY);
    if (fromStorage && isLang(fromStorage)) return fromStorage;
  } catch {
    // ignore private mode / blocked storage
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LANG_COOKIE_NAME}=([^;]*)`),
  );
  const fromCookie = match?.[1] ? decodeURIComponent(match[1]) : null;
  if (fromCookie && isLang(fromCookie)) return fromCookie;

  return null;
}

export function persistLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // ignore
  }

  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${LANG_COOKIE_NAME}=${encodeURIComponent(lang)}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
}

export function resolvePreferredLang(): Lang {
  return readStoredLang() ?? defaultLang;
}
