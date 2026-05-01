import { ColorScheme } from '../../../../types/colorScheme';

/**
 * Generates an array of HSL colors based on the specified theme.
 */
function generateBaseColors(theme: ColorScheme): string[] {
	const COLORS_COUNT = 21;
	const saturation = theme === 'dark' ? 40 : 85;
	const lightness = theme === 'dark' ? 50 : 70;

	return Array.from({ length: COLORS_COUNT }, (_, i) => {
		const hue = Math.floor(360 / COLORS_COUNT * i);
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	});
}

export { generateBaseColors };