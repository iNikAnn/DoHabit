import { type DrawerAction } from '@shared/ui';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@shared/lib/i18n';

function useLangActions() {
	const { i18n } = useTranslation();

	const langActions: DrawerAction[] = SUPPORTED_LANGUAGES.map((lang) => ({
		label: lang.label,
		indicator: { type: i18n.language === lang.code ? 'checkmark' : 'none' },
		onClick: () => i18n.changeLanguage(lang.code)
	}));

	return {
		langActions
	};
}

export default useLangActions;