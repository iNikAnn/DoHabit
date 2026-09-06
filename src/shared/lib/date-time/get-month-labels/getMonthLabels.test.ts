import { describe, expect, test } from 'vitest';
import { getMonthLabels } from './getMonthLabels';

describe('getMonthLabels', () => {
	test('returns an array of 12 non-empty strings', () => {
		const months = getMonthLabels('en');

		expect(months).toBeInstanceOf(Array);
		expect(months).toHaveLength(12);
		months.forEach((month) => {
			expect(typeof month).toBe('string');
			expect(month.length).toBeGreaterThan(0);
		});
	});

	test('formats full month names in English by default', () => {
		const expectedMonths = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		const months = getMonthLabels('en');
		expect(months).toEqual(expectedMonths);
	});

	test('formats full month names when length is explicitly set to long', () => {
		const expectedMonths = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		const months = getMonthLabels('en', { length: 'long' });
		expect(months).toEqual(expectedMonths);
	});

	test('formats abbreviated month names when length is short', () => {
		const expectedShortMonths = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];

		const months = getMonthLabels('en', { length: 'short' });
		expect(months).toEqual(expectedShortMonths);
	});

	test('preserves correct chronological order from index 0 (January) to index 11 (December)', () => {
		const months = getMonthLabels('en');

		expect(months[0]).toBe('January');
		expect(months[11]).toBe('December');
	});

	test.each(['ru', 'zh', 'es', 'de'])(
		'generates localized month labels matching Intl.DateTimeFormat for locale %s',
		(locale) => {
			const formatterLong = new Intl.DateTimeFormat(locale, { month: 'long' });
			const formatterShort = new Intl.DateTimeFormat(locale, { month: 'short' });

			const monthsLong = getMonthLabels(locale, { length: 'long' });
			const monthsShort = getMonthLabels(locale, { length: 'short' });

			expect(monthsLong).toHaveLength(12);
			expect(monthsShort).toHaveLength(12);

			const date = new Date('2000-01-01');
			for (let i = 0; i < 12; i++) {
				date.setMonth(i);
				expect(monthsLong[i]).toBe(formatterLong.format(date));
				expect(monthsShort[i]).toBe(formatterShort.format(date));
			}
		}
	);
});
