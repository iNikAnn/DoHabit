import { ColorPalette } from '../../../../types/colorScheme';

/**
 * Generates color variations (base, darkened, softened) from an HSL string.
 */
function getColorVariants(hsl: string): ColorPalette {
	const hslRegex = /(\d+)%,?\s+(\d+)%\)/;

	const darkenedLight = hsl.replace(hslRegex, '8%, 95%)');
	const darkenedDark = hsl.replace(hslRegex, '8%, 18%)');
	const softened = hsl.replace(hslRegex, '12%, 50%)');

	return {
		baseColor: hsl,
		// darkenedColor: `color-mix(in hsl, ${hsl}, black 65%)`,
		darkenedColor: `light-dark(${darkenedLight}, ${darkenedDark})`,
		// softenedColor: `color-mix(in hsl, ${hsl}, dimgray 80%)`
		softenedColor: softened
	};
}

export { getColorVariants };