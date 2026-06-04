import type { LanguageMap } from './types';
import { en } from './locales/en';
import { ru } from './locales/ru';

export const resources = {
	en: { translation: en },
	ru: { translation: ru },
};

export const languageMap: LanguageMap = {
	en: { code: 'en', label: 'English' },
	ru: { code: 'ru', label: 'Русский' }
}

export const SUPPORTED_LANGUAGES = Object.values(languageMap);