import type { ColorVariants } from '../types';

const COLORS_COUNT = 21;

/**
 * Generates shades referencing App.css variables configured by hue.
 */
function getAppPalette(): ColorVariants[] {
	return Array.from({ length: COLORS_COUNT }, (_, i) => {
		const hue = Math.floor(360 / COLORS_COUNT * i).toString();

		return {
			baseColor: 'var(--base-color)',
			darkenedColor: 'var(--darkened-color)',
			softenedColor: 'var(--softened-color)',
			style: { '--hue': hue }
		};
	});
}

export { getAppPalette };