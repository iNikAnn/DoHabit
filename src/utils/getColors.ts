import { ColorScheme } from '../types/common';

/**
 * Generates an array of colors based on the specified color scheme.
 */
function getColors(colorScheme: ColorScheme): string[] {
	const colors = [];
	const colorsCount = 21;

	for (let i = 0; i < colorsCount; i++) {
		if (colorScheme === 'dark') {
			colors.push(`hsl(${Math.floor(360 / colorsCount * i)}, 40%, 50%)`);
		} else {
			colors.push(`hsl(${Math.floor(360 / colorsCount * i)}, 85%, 70%)`);
		}
	}

	return colors;
}

export default getColors;