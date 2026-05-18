import { FaFont } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa6';
import useThemeActions from '../model/useThemeActions';
import { useSettingsStore } from '@entities/settings';
import { ListItemProps, List, useDrawerStore } from '@shared/ui';

function ThemeSettings() {
	const openDrawer = useDrawerStore((s) => s.open);
	const settings = useSettingsStore((s) => s.settings);
	const { themeActions } = useThemeActions();

	const menuItems: ListItemProps[] = [
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

	return (
		<List
			items={menuItems}
		/>
	);
}

export { ThemeSettings };