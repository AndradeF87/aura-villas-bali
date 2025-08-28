export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es-ES'] as const,
} as const;

export type Locale = (typeof i18n.locales)[number];

export const languages = {
  en: {
    name: 'English',
    flag: '🇬🇧',
    currency: 'USD',
    currencySymbol: '$',
  },
  'es-ES': {
    name: 'Español',
    flag: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
  },
} as const;

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  
  if (i18n.locales.includes(locale)) {
    return locale;
  }
  
  return i18n.defaultLocale;
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  
  // Remove existing locale if present
  if (i18n.locales.includes(segments[0] as Locale)) {
    segments.shift();
  }
  
  // Add new locale if not default
  if (locale !== i18n.defaultLocale) {
    segments.unshift(locale);
  }
  
  return `/${segments.join('/')}`;
}

export function formatCurrency(amount: number, locale: Locale): string {
  const { currency } = languages[locale];
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}