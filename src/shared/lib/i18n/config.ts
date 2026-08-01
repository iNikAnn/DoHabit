import type { LanguageMap } from './types';
import en from './locales/en.json';
import es from './locales/es.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ru from './locales/ru.json';
import { GB, ES, CN, JP, RU } from 'country-flag-icons/react/1x1';

export const resources = {
	en: { translation: en },
	es: { translation: es },
	zh: { translation: zh },
	ja: { translation: ja },
	ru: { translation: ru }
};

/* eslint-disable i18next/no-literal-string */
export const languageMap: LanguageMap = {
	en: { code: 'en', label: 'English', icon: GB },
	es: { code: 'es', label: 'Español', icon: ES },
	zh: { code: 'zh', label: '中文简体', icon: CN },
	ja: { code: 'ja', label: '日本語', icon: JP },
	ru: { code: 'ru', label: 'Русский', icon: RU }
}

export const SUPPORTED_LANGUAGES = Object.values(languageMap);