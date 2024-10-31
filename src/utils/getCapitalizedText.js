function getCapitalizedText(text) {
	return text.replace(/\b\w/g, (l) => l.toUpperCase());
}

export default getCapitalizedText;