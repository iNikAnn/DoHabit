import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { resources } from '@shared/lib/i18n';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		supportedLngs: Object.keys(resources),
		resources,
		fallbackLng: 'en',
		returnEmptyString: false,
		detection: {
			// Extracts only the base language code (e.g., "en" from "en-US")
			// before passing it to i18next and before saving to localStorage
			convertDetectedLanguage: (lng) => lng.split('-')[0]
		}
	});

export default i18n;