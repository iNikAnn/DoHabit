function getColorPalette(hsl) {
	return {
		baseColor: String(hsl),
		darkenedColor: `color-mix(in hsl, ${hsl}, black 65%)`,
		softenedColor: `color-mix(in hsl, ${hsl}, dimgray 80%)`
	};
}

export default getColorPalette;