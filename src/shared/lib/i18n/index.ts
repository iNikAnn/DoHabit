import type { AppLanguageCode } from './types';

export { resources, languageMap, SUPPORTED_LANGUAGES } from './config';

declare module 'i18next' {
	interface i18n {
		language: AppLanguageCode;
	}
}