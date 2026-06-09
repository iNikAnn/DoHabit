interface GetWeekdayLabelsOptions {
	length: 'long' | 'short' | 'narrow';
}

/**
 * Generate localized weekday labels.
 */
function getWeekdayLabels(locale: string, options?: GetWeekdayLabelsOptions) {
	const {
		length = 'long'
	} = options ?? {};

	const formatter = new Intl.DateTimeFormat(locale, { weekday: length });
	const date = new Date('2000-05-01');

	const weekdays = Array.from({ length: 7 }, (_, i) => {
		date.setDate(i + 1);
		return formatter.format(date);
	});

	return weekdays;
}

export { getWeekdayLabels };