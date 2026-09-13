import { describe, expect, test } from 'vitest';
import { getWeekdayLabels } from './getWeekdayLabels';

const WEEKDAYS_LONG = [
	'Monday', 'Tuesday', 'Wednesday', 'Thursday',
	'Friday', 'Saturday', 'Sunday'
];

const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKDAYS_NARROW = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

describe('getWeekdayLabels', () => {
	test('formats full weekday names in English by default', () => {
		const weekdays = getWeekdayLabels('en');
		expect(weekdays).toEqual(WEEKDAYS_LONG);
	});

	test('formats full weekday names when length is long', () => {
		const weekdays = getWeekdayLabels('en', { length: 'long' });
		expect(weekdays).toEqual(WEEKDAYS_LONG);
	});

	test('formats abbreviated weekday names when length is short', () => {
		const weekdays = getWeekdayLabels('en', { length: 'short' });
		expect(weekdays).toEqual(WEEKDAYS_SHORT);
	});

	test('formats narrow weekday representations when length is narrow', () => {
		const weekdays = getWeekdayLabels('en', { length: 'narrow' });
		expect(weekdays).toEqual(WEEKDAYS_NARROW);
	});

	test('supports localization', () => {
		const ruWeekdays = getWeekdayLabels('ru', { length: 'long' });

		expect(ruWeekdays).toHaveLength(7);
		expect(ruWeekdays[0]).toMatch(/понедельник/i);
		expect(ruWeekdays[6]).toMatch(/воскресенье/i);
	});
});
