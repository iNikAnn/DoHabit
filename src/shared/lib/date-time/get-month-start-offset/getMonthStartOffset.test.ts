import { describe, expect, test } from 'vitest';
import { getMonthStartOffset } from './getMonthStartOffset';

describe('getMonthStartOffset', () => {
	test('should return 0 when the month starts on Monday', () => {
		// 2000: May
		expect(getMonthStartOffset(new Date('2000-05-15'))).toBe(0);
	});

	test('should return 1 when the month starts on Tuesday', () => {
		// 2000: February, August
		expect(getMonthStartOffset(new Date('2000-02-15'))).toBe(1);
		expect(getMonthStartOffset(new Date('2000-08-20'))).toBe(1);
	});

	test('should return 2 when the month starts on Wednesday', () => {
		// 2000: March, November
		expect(getMonthStartOffset(new Date('2000-03-10'))).toBe(2);
		expect(getMonthStartOffset(new Date('2000-11-25'))).toBe(2);
	});

	test('should return 3 when the month starts on Thursday', () => {
		// 2000: June
		expect(getMonthStartOffset(new Date('2000-06-05'))).toBe(3);
	});

	test('should return 4 when the month starts on Friday', () => {
		// 2000: September, December
		expect(getMonthStartOffset(new Date('2000-09-12'))).toBe(4);
		expect(getMonthStartOffset(new Date('2000-12-18'))).toBe(4);
	});

	test('should return 5 when the month starts on Saturday', () => {
		// 2000: January, April, July
		expect(getMonthStartOffset(new Date('2000-01-01'))).toBe(5);
		expect(getMonthStartOffset(new Date('2000-04-15'))).toBe(5);
		expect(getMonthStartOffset(new Date('2000-07-22'))).toBe(5);
	});

	test('should return 6 when the month starts on Sunday', () => {
		// 2000: October
		expect(getMonthStartOffset(new Date('2000-10-14'))).toBe(6);
	});
});