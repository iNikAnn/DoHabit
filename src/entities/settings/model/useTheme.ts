import { useLayoutEffect } from 'react';
import { useSettingsStore } from '@entities/settings';

/**
 * Sync root color scheme with settings.
 */
function useTheme(): void {
	const settings = useSettingsStore((s) => s.settings);

	useLayoutEffect(() => {
		document.documentElement.style.colorScheme = settings.theme ?? '';
	}, [settings]);
}

export { useTheme };