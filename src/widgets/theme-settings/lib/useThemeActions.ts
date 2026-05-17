import { FaFont } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { useSettingsStore } from '@entities/settings';
import { DrawerAction } from '@shared/ui';

function useThemeActions() {
	const settingsDispatch = useSettingsStore((s) => s.settingsDispatch);

	const themeActions: DrawerAction[] = [
		{
			icon: FaFont,
			label: 'Auto',
			onClick: () => settingsDispatch({
				type: 'updateSettings',
				payload: { theme: undefined }
			})
		},
		{
			icon: FaSun,
			iconProps: { color: '#e3bb44' },
			label: 'Light',
			onClick: () => settingsDispatch({
				type: 'updateSettings',
				payload: { theme: 'light' }
			})
		},
		{
			icon: FaMoon,
			iconProps: { color: '#5070b5' },
			label: 'Dark',
			onClick: () => settingsDispatch({
				type: 'updateSettings',
				payload: { theme: 'dark' }
			})
		}
	];

	return {
		themeActions
	};
}

export default useThemeActions;