import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getYesterday } from './getYesterday';

describe('getYesterday', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('returns an instance of Date', () => {
		const yesterday = getYesterday();
		expect(yesterday).toBeInstanceOf(Date);
	});

	test('returns yesterday for a standard mid-month date', () => {
		vi.setSystemTime(new Date(2026, 5, 15, 14, 30));

		const yesterday = getYesterday();
		expect(yesterday.getFullYear()).toBe(2026);
		expect(yesterday.getMonth()).toBe(5);
		expect(yesterday.getDate()).toBe(14);
	});

	test('correctly rolls back across a month boundary in a non-leap year', () => {
		vi.setSystemTime(new Date(2026, 2, 1, 10, 0));

		const yesterday = getYesterday();
		expect(yesterday.getFullYear()).toBe(2026);
		expect(yesterday.getMonth()).toBe(1);
		expect(yesterday.getDate()).toBe(28);
	});

	test('correctly rolls back across a month boundary in a leap year', () => {
		vi.setSystemTime(new Date(2024, 2, 1, 12, 0));

		const yesterday = getYesterday();
		expect(yesterday.getFullYear()).toBe(2024);
		expect(yesterday.getMonth()).toBe(1);
		expect(yesterday.getDate()).toBe(29);
	});

	test('correctly rolls back across a year boundary', () => {
		vi.setSystemTime(new Date(2026, 0, 1, 8, 15));

		const yesterday = getYesterday();
		expect(yesterday.getFullYear()).toBe(2025);
		expect(yesterday.getMonth()).toBe(11);
		expect(yesterday.getDate()).toBe(31);
	});

	test('preserves hours, minutes, seconds, and milliseconds from current time', () => {
		const fixedTime = new Date(2026, 7, 20, 23, 59, 58, 123);
		vi.setSystemTime(fixedTime);

		const yesterday = getYesterday();
		expect(yesterday.getHours()).toBe(23);
		expect(yesterday.getMinutes()).toBe(59);
		expect(yesterday.getSeconds()).toBe(58);
		expect(yesterday.getMilliseconds()).toBe(123);
	});
});
