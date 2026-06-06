import { useTranslation } from 'react-i18next';
import { FaFont, FaLanguage } from 'react-icons/fa6';
import { FaMoon, FaSun } from 'react-icons/fa6';
import useThemeActions from './useThemeActions';
import useLangActions from './useLangActions';
import { useSettingsStore } from '@entities/settings';
import { languageMap } from '@shared/lib/i18n';
import { type ListItemProps, useDrawerStore } from '@shared/ui';

function useListItems() {
	// UI localization
	const { t, i18n } = useTranslation();

	const openDrawer = useDrawerStore((s) => s.open);
	const settings = useSettingsStore((s) => s.settings);

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
			title: t('menu.appearance.theme.title'),
			description: t('menu.appearance.theme.desc', {
				theme: t(`common.theme.${settings.theme ?? 'auto'}`)
			}),
			onClick: () => {
				openDrawer({
					title: t('menu.appearance.theme.dialogs.selectThemeTitle'),
					actions: themeActions
				})
			}
		},

		// lang switcher
		{
			icon: FaLanguage,
			title: t('menu.appearance.language.title'),
			description: t('menu.appearance.language.desc', {
				lang: languageMap[i18n.language]?.label ?? 'Unknown'
			}),
			onClick: () => {
				openDrawer({
					title: t('menu.appearance.language.dialogs.selectTitle'),
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