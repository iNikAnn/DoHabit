function getColors(scheme) {
	const colors = [];
	const colorsCount = 21;

	for (let i = 0; i < colorsCount; i++) {
		if (scheme === 'dark') {
			colors.push(`hsl(${Math.floor(360 / colorsCount * i)}, 40%, 50%)`);
		} else {
			colors.push(`hsl(${Math.floor(360 / colorsCount * i)}, 85%, 70%)`);
		};
	};

	return colors;
}
export default getColors;