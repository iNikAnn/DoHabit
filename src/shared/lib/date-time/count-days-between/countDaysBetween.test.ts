import { describe, expect, test } from 'vitest';
import { countDaysBetween } from './countDaysBetween';

describe('countDaysBetween', () => {
	describe('Basic functionality', () => {
		test('should return 0 for the exact same date', () => {
			const date1 = new Date('2000-01-01');
			const date2 = new Date('2000-01-01');
			expect(countDaysBetween(date1, date2)).toBe(0);
		});

		test('should return 0 for consecutive dates', () => {
			const date1 = new Date('2000-01-01');
			const date2 = new Date('2000-01-02');
			expect(countDaysBetween(date1, date2)).toBe(0);
		});

		test('should return 1 when there is exactly one day in between', () => {
			const date1 = new Date('2000-01-01');
			const date2 = new Date('2000-01-03');
			expect(countDaysBetween(date1, date2)).toBe(1);
		});
	});

	describe('Argument order independence', () => {
		test('should return the same positive number regardless of date order', () => {
			const date1 = new Date('2000-01-03');
			const date2 = new Date('2000-01-01');
			expect(countDaysBetween(date1, date2)).toBe(1);
		});
	});

	describe('Calendar edge cases', () => {
		test('should handle non-leap year February transition', () => {
			const date1 = new Date('1999-02-28');
			const date2 = new Date('1999-03-01');
			expect(countDaysBetween(date1, date2)).toBe(0);
		});

		test('should handle leap year February transition', () => {
			const date1 = new Date('2000-02-28');
			const date2 = new Date('2000-03-01');
			expect(countDaysBetween(date1, date2)).toBe(1);
		});
	});

	describe('Time of day independence', () => {
		test('should ignore hours, minutes and seconds within calculation', () => {
			// Late night to early morning check
			const date1 = new Date('2000-01-01T23:59:59');
			const date2 = new Date('2000-01-03T00:00:01');
			expect(countDaysBetween(date1, date2)).toBe(1);
		});
	});
});