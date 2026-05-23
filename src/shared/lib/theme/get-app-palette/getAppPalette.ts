import type { ColorVariants } from '../types';

const COLORS_COUNT = 21;

/**
 * Generates an array of color variants using OKLCH.
 */
function getAppPalette(): ColorVariants[] {
	return Array.from({ length: COLORS_COUNT }, (_, i) => {
		const hue = Math.floor(360 / COLORS_COUNT * i);

		return {
			baseColor: `light-dark(oklch(0.8 0.2 ${hue}), oklch(0.55 0.13 ${hue}))`,

			darkenedColor: `light-dark(oklch(0.96 0.02 ${hue}), oklch(0.3 0.01 ${hue}))`,

			softenedColor: `light-dark(oklch(0.7 0.04 ${hue}), oklch(0.58 0.03 ${hue}))`
		};
	});
}

export { getAppPalette };