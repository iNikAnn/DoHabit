function getDimmedColor(hsl) {
	return hsl.replace(/(\d{2,3}%), (\d{2,3}%\))/g, '8%, 18%)');
}

export default getDimmedColor;