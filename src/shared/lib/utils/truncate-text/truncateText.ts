/**
 * Truncates text to fit within a specified number of lines.
 * Use with caution as it causes multiple reflows.
 */
// TODO: Consider using CSS line-clamp
function truncateText(
	el: HTMLElement,
	text: string,
	maxLines: number = 3
): string {
	if (!el) return text;

	const elLineHeight = parseFloat(getComputedStyle(el).lineHeight);
	const maxHeight = elLineHeight * maxLines;

	el.textContent = text;

	let isFirst = true;
	while (el.offsetHeight > maxHeight && text.length > 0) {
		text = text.slice(0, isFirst ? -1 : -4) + '...';
		el.textContent = text;
		if (isFirst) isFirst = false;
	}

	return text;
}

export { truncateText };