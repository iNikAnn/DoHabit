import { describe, expect, test } from 'vitest';
import { getWeekdayLabels } from './getWeekdayLabels';

describe('getWeekdayLabels', () => {
	test('returns an array of 7 non-empty strings', () => {
		const weekdays = getWeekdayLabels('en');

		expect(weekdays).toBeInstanceOf(Array);
		expect(weekdays).toHaveLength(7);
		weekdays.forEach((day) => {
			expect(typeof day).toBe('string');
			expect(day.length).toBeGreaterThan(0);
		});
	});

	test('formats full weekday names in English starting on Monday by default', () => {
		const expectedWeekdays = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];

		const weekdays = getWeekdayLabels('en');
		expect(weekdays).toEqual(expectedWeekdays);
	});

	test('formats full weekday names when length is explicitly set to long', () => {
		const expectedWeekdays = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];

		const weekdays = getWeekdayLabels('en', { length: 'long' });
		expect(weekdays).toEqual(expectedWeekdays);
	});

	test('formats abbreviated weekday names when length is short', () => {
		const expectedShortWeekdays = [
			'Mon',
			'Tue',
			'Wed',
			'Thu',
			'Fri',
			'Sat',
			'Sun'
		];

		const weekdays = getWeekdayLabels('en', { length: 'short' });
		expect(weekdays).toEqual(expectedShortWeekdays);
	});

	test('formats narrow weekday representations when length is narrow', () => {
		const expectedNarrowWeekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

		const weekdays = getWeekdayLabels('en', { length: 'narrow' });
		expect(weekdays).toEqual(expectedNarrowWeekdays);
	});

	test('preserves Monday as the first element and Sunday as the last', () => {
		const weekdays = getWeekdayLabels('en');

		expect(weekdays[0]).toBe('Monday');
		expect(weekdays[6]).toBe('Sunday');
	});

	test.each(['ru', 'zh', 'es', 'de'])(
		'generates localized weekday labels matching Intl.DateTimeFormat for locale %s',
		(locale) => {
			const formatterLong = new Intl.DateTimeFormat(locale, { weekday: 'long' });
			const formatterShort = new Intl.DateTimeFormat(locale, { weekday: 'short' });
			const formatterNarrow = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });

			const weekdaysLong = getWeekdayLabels(locale, { length: 'long' });
			const weekdaysShort = getWeekdayLabels(locale, { length: 'short' });
			const weekdaysNarrow = getWeekdayLabels(locale, { length: 'narrow' });

			expect(weekdaysLong).toHaveLength(7);
			expect(weekdaysShort).toHaveLength(7);
			expect(weekdaysNarrow).toHaveLength(7);

			const date = new Date('2000-05-01');
			for (let i = 0; i < 7; i++) {
				date.setDate(i + 1);
				expect(weekdaysLong[i]).toBe(formatterLong.format(date));
				expect(weekdaysShort[i]).toBe(formatterShort.format(date));
				expect(weekdaysNarrow[i]).toBe(formatterNarrow.format(date));
			}
		}
	);
});
