import { describe, expect, test } from 'vitest';
import { getMonthLabels } from './getMonthLabels';

const ENGLISH_MONTHS_LONG = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

const ENGLISH_MONTHS_SHORT = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

describe('getMonthLabels', () => {
	test('formats full month names in English by default', () => {
		const months = getMonthLabels('en');
		expect(months).toEqual(ENGLISH_MONTHS_LONG);
	});

	test('formats full month names when length is long', () => {
		const months = getMonthLabels('en', { length: 'long' });
		expect(months).toEqual(ENGLISH_MONTHS_LONG);
	});

	test('formats abbreviated month names when length is short', () => {
		const months = getMonthLabels('en', { length: 'short' });
		expect(months).toEqual(ENGLISH_MONTHS_SHORT);
	});

	test('supports localization', () => {
		const ruMonths = getMonthLabels('ru', { length: 'long' });

		expect(ruMonths).toHaveLength(12);
		expect(ruMonths[0]).toMatch(/январь/i);
		expect(ruMonths[11]).toMatch(/декабрь/i);
	});
});
