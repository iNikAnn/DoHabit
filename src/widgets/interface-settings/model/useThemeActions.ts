import { useTranslation } from 'react-i18next';
import { FaFont } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { useSettingsStore } from '@entities/settings';
import { type DrawerAction } from '@shared/ui';

function useThemeActions() {
	const { t } = useTranslation();
	const settings = useSettingsStore((s) => s.settings);
	const settingsDispatch = useSettingsStore((s) => s.settingsDispatch);

	const themeActions: DrawerAction[] = [
		{
			icon: FaFont,
			label: t('common.theme.auto'),
			indicator: { type: !settings.theme ? 'checkmark' : 'none' },
			onClick: () => settingsDispatch({
				type: 'updateSettings',
				payload: { theme: undefined }
			})
		},
		{
			icon: FaSun,
			iconProps: { color: '#e3bb44' },
			label: t('common.theme.light'),
			indicator: { type: settings.theme === 'light' ? 'checkmark' : 'none' },
			onClick: () => settingsDispatch({
				type: 'updateSettings',
				payload: { theme: 'light' }
			})
		},
		{
			icon: FaMoon,
			iconProps: { color: '#5070b5' },
			label: t('common.theme.dark'),
			indicator: { type: settings.theme === 'dark' ? 'checkmark' : 'none' },
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