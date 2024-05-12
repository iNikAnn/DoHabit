function lightDimmedColor(hsl) {
	return hsl.replace(/\d{2}%\)/, (num) => {
		return `${parseInt(num) + 10}%)`;
	});
}

export default lightDimmedColor;