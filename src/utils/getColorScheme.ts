import { ColorScheme } from '../types/colorScheme';

/**
 * Determines the current color scheme based on user preference and system settings.
 */
function getColorScheme(isDarkSchemeForced: boolean): ColorScheme {
	return isDarkSchemeForced
		? 'dark'
		: matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
}

export default getColorScheme;