import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@shared/lib/i18n';

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: 'en',
		fallbackLng: 'en'
	});


export default i18n;