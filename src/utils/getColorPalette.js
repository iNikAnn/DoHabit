function getColorPalette(hsl) {
	return {
		baseColor: String(hsl),
		// darkenedColor: `color-mix(in hsl, ${hsl}, black 65%)`,
		darkenedColor: `light-dark(${hsl.replace(/(\d{2,3}%), (\d{2,3}%\))/g, '8%, 95%)')}, ${hsl.replace(/(\d{2,3}%), (\d{2,3}%\))/g, '8%, 18%)')})`,
		// softenedColor: `color-mix(in hsl, ${hsl}, dimgray 80%)`
		softenedColor: hsl.replace(/(\d{2,3}%), (\d{2,3}%\))/g, '12%, 50%)')
	};
}

export default getColorPalette;