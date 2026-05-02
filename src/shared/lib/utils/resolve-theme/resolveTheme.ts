import { ColorScheme } from '../../../../types/colorScheme';

/**
 * Resolves the theme based on forced settings or system preference.
 */
function resolveTheme(isDarkForced: boolean): ColorScheme {
	if (isDarkForced) return 'dark';

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

export { resolveTheme };