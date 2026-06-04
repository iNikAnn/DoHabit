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
	const { i18n } = useTranslation();

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
			title: 'Theme',
			description: `Current: ${settings.theme ?? 'auto'}`,
			onClick: () => {
				openDrawer({
					title: 'Select theme',
					actions: themeActions
				})
			}
		},

		// lang switcher
		{
			icon: FaLanguage,
			title: 'Language',
			description: `Current: ${languageMap[i18n.language].label}`,
			onClick: () => {
				openDrawer({
					title: 'Select language',
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