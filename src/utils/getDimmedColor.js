function getDimmedColor(hsl) {
	return hsl.replace(/(\d{2,3}%), (\d{2,3}%\))/g, '10%, 20%)');
}

export default getDimmedColor;