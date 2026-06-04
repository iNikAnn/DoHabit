import type { resources } from './config';
import type { en } from './locales/en';

export type TranslationSchema = typeof en;

export type AppLanguageCode = keyof typeof resources;

export interface LanguageOption {
	code: AppLanguageCode;
	label: string;
}

export type LanguageMap = Record<AppLanguageCode, LanguageOption>;