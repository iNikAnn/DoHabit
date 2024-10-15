function getTruncatedText(el, text) {
	if (!el) return text;

	const elLineHeight = parseFloat(getComputedStyle(el).lineHeight);
	const maxHeight = elLineHeight * 3;

	el.textContent = text;

	let isFirst = true;
	while (el.offsetHeight > maxHeight && text.length > 0) {
		text = text.slice(0, isFirst ? -1 : -4) + '...';
		el.textContent = text;
		if (isFirst) isFirst = false;
	};

	return text;
}

export default getTruncatedText;