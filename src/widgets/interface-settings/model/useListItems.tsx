import { useTranslation } from 'react-i18next';
import { FaFont, FaLanguage } from 'react-icons/fa6';
import { FaMoon, FaSun } from 'react-icons/fa6';
import useThemeActions from './useThemeActions';
import useLangActions from './useLangActions';
import { useSettingsStore } from '@entities/settings';
import { languageMap } from '@shared/lib/i18n';
import { type ListItemProps, useDrawerStore } from '@shared/ui';

function useListItems() {
	const openDrawer = useDrawerStore((s) => s.open);
	const settings = useSettingsStore((s) => s.settings);
	const { t, i18n } = useTranslation();

	const { themeActions } = useThemeActions();
	const { langActions } = useLangActions();

	const listItems: ListItemProps[] = [
		// theme switcher
		{
			icon: settings.theme === 'light'
				? <FaSun color='#e3bb44' />
				: settings.theme === 'dark'
					? <FaMoon color='#5070b5' />
					: <FaFont />,
			title: t('settings.themeTitle'),
			description: t('settings.themeDescription', {
				theme: t(`theme.${settings.theme ?? 'auto'}`)
			}),
			onClick: () => {
				openDrawer({
					title: t('settings.themeSelectTitle'),
					actions: themeActions
				})
			}
		},

		// lang switcher
		{
			icon: FaLanguage,
			title: t('settings.langTitle'),
			description: t('settings.langDescription', {
				lang: languageMap[i18n.language].label
			}),
			onClick: () => {
				openDrawer({
					title: t('settings.langSelectTitle'),
					actions: langActions
				})
			}
		}
	];

	return {
		listItems
	};
}

export default useListItems;