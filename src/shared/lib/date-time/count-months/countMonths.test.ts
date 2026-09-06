import { describe, expect, test } from 'vitest';
import { countMonths } from './countMonths';

describe('countMonths', () => {
	test('counts dates in the same calendar month as one month', () => {
		expect(countMonths(new Date(2026, 4, 1, 0, 0), new Date(2026, 4, 31, 23, 59))).toBe(1);
	});

	test('includes both adjacent calendar months', () => {
		expect(countMonths(new Date(2026, 4, 31), new Date(2026, 5, 1))).toBe(2);
	});

	test('counts months across a year boundary', () => {
		expect(countMonths(new Date(2025, 11, 15), new Date(2026, 0, 15))).toBe(2);
	});

	test('counts a meaningful multi-year span', () => {
		expect(countMonths(new Date(2022, 2, 10), new Date(2025, 8, 20))).toBe(43);
	});
});
