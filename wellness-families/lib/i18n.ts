export const LOCALES = ['sk', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'sk';

export const LANGUAGE_NAMES: Record<Locale, string> = {
  sk: 'Slovenčina',
  en: 'English',
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (!parts.length) return '/';

  if (isLocale(parts[0])) {
    const rest = parts.slice(1);
    return rest.length ? `/${rest.join('/')}` : '/';
  }

  return pathname;
}

export function toLocalizedPath(locale: Locale, pathname: string): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (cleanPath === '/') {
    return `/${locale}`;
  }
  return `/${locale}${cleanPath}`;
}

export function getBookioLang(locale: Locale): 'sk' | 'en' {
  return locale === 'en' ? 'en' : 'sk';
}
