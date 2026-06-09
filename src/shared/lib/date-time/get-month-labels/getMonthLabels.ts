interface GetMonthLabelsOptions {
	length: 'long' | 'short';
}

/**
 * Generate localized month labels.
 */
function getMonthLabels(locale: string, options?: GetMonthLabelsOptions) {
	const {
		length = 'long'
	} = options ?? {};

	const formatter = new Intl.DateTimeFormat(locale, { month: length });
	const date = new Date('2000-01-01');

	const months = Array.from({ length: 12 }, (_, i) => {
		date.setMonth(i);
		return formatter.format(date);
	});

	return months;
}

export { getMonthLabels };