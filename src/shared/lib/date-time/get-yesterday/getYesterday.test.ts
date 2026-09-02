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
		vi.setSystemTime(new Date('2026-06-15T14:30:00.000Z'));

		const yesterday = getYesterday();
		expect(yesterday.toISOString()).toBe('2026-06-14T14:30:00.000Z');
	});

	test('correctly rolls back across a month boundary in a non-leap year', () => {
		vi.setSystemTime(new Date('2026-03-01T10:00:00.000Z'));

		const yesterday = getYesterday();
		expect(yesterday.toISOString()).toBe('2026-02-28T10:00:00.000Z');
	});

	test('correctly rolls back across a month boundary in a leap year', () => {
		vi.setSystemTime(new Date('2024-03-01T12:00:00.000Z'));

		const yesterday = getYesterday();
		expect(yesterday.toISOString()).toBe('2024-02-29T12:00:00.000Z');
	});

	test('correctly rolls back across a year boundary', () => {
		vi.setSystemTime(new Date('2026-01-01T08:15:00.000Z'));

		const yesterday = getYesterday();
		expect(yesterday.toISOString()).toBe('2025-12-31T08:15:00.000Z');
	});

	test('preserves hours, minutes, seconds, and milliseconds from current time', () => {
		const fixedTime = new Date('2026-08-20T23:59:58.123Z');
		vi.setSystemTime(fixedTime);

		const yesterday = getYesterday();
		expect(yesterday.getUTCHours()).toBe(23);
		expect(yesterday.getUTCMinutes()).toBe(59);
		expect(yesterday.getUTCSeconds()).toBe(58);
		expect(yesterday.getUTCMilliseconds()).toBe(123);
	});
});
