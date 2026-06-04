import 'i18next';
import en from './locales/en.json';
import { AppLanguageCode } from './types';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation',

		resources: {
			translation: typeof en;
		}
	}

	interface i18n {
		language: AppLanguageCode;
	}
}