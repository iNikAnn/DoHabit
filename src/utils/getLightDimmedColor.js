function softenedColor(hsl) {
	return hsl.replace(
		/\d{2}%\)/,
		(num) => `${parseInt(num) + 10}%)`
	);
}

export default softenedColor;