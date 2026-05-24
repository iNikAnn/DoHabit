import useThemeActions from './useThemeActions';
import { FaFont } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { useSettingsStore } from '@entities/settings';
import { type ListItemProps, useDrawerStore } from '@shared/ui';

function useListItems() {
	const openDrawer = useDrawerStore((s) => s.open);
	const settings = useSettingsStore((s) => s.settings);
	const { themeActions } = useThemeActions();

	const listItems: ListItemProps[] = [
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
		}
	];

	return {
		listItems
	};
}

export default useListItems;