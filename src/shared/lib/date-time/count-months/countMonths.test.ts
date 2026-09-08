import { describe, expect, test } from 'vitest';
import { countMonths } from './countMonths';

describe('countMonths', () => {
	test('counts dates in the same calendar month as one month', () => {
		const start = new Date(2026, 4, 1, 0, 0);
		const end = new Date(2026, 4, 31, 23, 59);

		expect(countMonths(start, end)).toBe(1);
	});

	test('includes both adjacent calendar months', () => {
		const start = new Date(2026, 4, 31);
		const end = new Date(2026, 5, 1);

		expect(countMonths(start, end)).toBe(2);
	});

	test('counts months across a year boundary', () => {
		const start = new Date(2025, 11, 15);
		const end = new Date(2026, 0, 15);

		expect(countMonths(start, end)).toBe(2);
	});

	test('counts a meaningful multi-year span', () => {
		const start = new Date(2022, 2, 10);
		const end = new Date(2025, 8, 20);

		expect(countMonths(start, end)).toBe(43);
	});

	test('fallback to 1 if start date is after end date', () => {
		const start = new Date(2026, 5, 15);
		const end = new Date(2026, 4, 10);

		expect(countMonths(start, end)).toBe(1);
	});
});
