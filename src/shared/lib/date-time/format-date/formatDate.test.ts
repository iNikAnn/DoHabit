import { describe, expect, test } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
	// Test default output without options
	test('formats date as YYYY-MM-DD by default', () => {
		const date = new Date('2026-08-03T14:05:00');
		expect(formatDate(date)).toBe('2026-08-03');
	});

	// Test explicit includeTime: false
	test('formats date as YYYY-MM-DD when includeTime is false', () => {
		const date = new Date('2026-01-05T09:30:00');
		expect(formatDate(date, { includeTime: false })).toBe('2026-01-05');
	});

	// Test includeTime: true
	test('formats date as YYYY-MM-DD HH:mm when includeTime is true', () => {
		const date = new Date('2026-08-03T14:05:00');
		expect(formatDate(date, { includeTime: true })).toBe('2026-08-03 14:05');
	});

	// Test zero padding for single digit values
	test('pads single-digit month, day, hour, and minute with leading zero', () => {
		const date = new Date('2026-04-02T04:08:00');
		expect(formatDate(date, { includeTime: true })).toBe('2026-04-02 04:08');
	});

	// Test midnight boundary time
	test('handles midnight correctly', () => {
		const date = new Date('2026-12-31T00:00:00');
		expect(formatDate(date, { includeTime: true })).toBe('2026-12-31 00:00');
	});
});