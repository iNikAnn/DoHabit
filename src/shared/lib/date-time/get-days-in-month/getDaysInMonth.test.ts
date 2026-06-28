import { describe, expect, test } from 'vitest';
import { getDaysInMonth } from './getDaysInMonth';

describe('getDaysInMonth', () => {
	test('should return 31 for months with 31 days', () => {
		expect(getDaysInMonth(new Date('2000-01-15'))).toBe(31);
	});

	test('should return 30 for months with 30 days', () => {
		expect(getDaysInMonth(new Date('2000-04-15'))).toBe(30);
	});

	test('should return 28 for February in a non-leap year', () => {
		expect(getDaysInMonth(new Date('1999-02-15'))).toBe(28);
	});

	test('should return 29 for February in a leap year', () => {
		expect(getDaysInMonth(new Date('2000-02-15'))).toBe(29);
	});

	test('should handle century leap year rules correctly', () => {
		expect(getDaysInMonth(new Date('1900-02-15'))).toBe(28);
	});
});