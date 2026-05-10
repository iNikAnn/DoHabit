import { useLayoutEffect } from 'react';
import { useSettingsStore } from '@entities/settings';

/**
 * Sync root color scheme with settings.
 */
function useColorScheme(): void {
	const settings = useSettingsStore((s) => s.settings);

	useLayoutEffect(
		() => {
			document.documentElement.style.colorScheme = settings.isDarkSchemeForced
				? 'dark'
				: 'light dark';
		},
		[settings]
	);
}

export default useColorScheme;