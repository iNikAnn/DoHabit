import type { LanguageMap } from './types';
import en from './locales/en.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';

export const resources = {
	en: { translation: en },
	ru: { translation: ru },
	zh: { translation: zh }
};

/* eslint-disable i18next/no-literal-string */
export const languageMap: LanguageMap = {
	en: { code: 'en', label: 'English' },
	ru: { code: 'ru', label: 'Русский' },
	zh: { code: 'zh', label: '中文简体' }
}

export const SUPPORTED_LANGUAGES = Object.values(languageMap);