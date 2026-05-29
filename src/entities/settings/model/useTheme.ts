import { useLayoutEffect } from 'react';
import { useSettingsStore } from '@entities/settings';

/**
 * Sync root color scheme with settings.
 */
function useTheme() {
	const settings = useSettingsStore((s) => s.settings);

	useLayoutEffect(() => {
		document.documentElement.style.colorScheme = settings.theme ?? '';
	}, [settings]);

	return settings.theme;
}

export { useTheme };