import type { Locale } from './config';

const dictionaries = {
  en: () => import('@/translations/en.json').then((module) => module.default),
  'es-ES': () => import('@/translations/es-ES.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};