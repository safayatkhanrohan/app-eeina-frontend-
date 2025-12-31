import { en } from './locales/en';
import { ar } from './locales/ar';
import { Translation } from './translaion.types';

export type { Translation } from './translaion.types';

export const translations: Record<'en' | 'ar', Translation> = {
  en,
  ar,
};

export const getTranslation = (language: 'en' | 'ar'): Translation => {
  return translations[language];
};

// Re-export for backward compatibility
export { en, ar };
