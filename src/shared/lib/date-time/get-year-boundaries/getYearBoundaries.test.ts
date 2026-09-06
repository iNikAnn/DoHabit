import { describe, expect, test } from 'vitest';
import { getYearBoundaries } from './getYearBoundaries';

describe('getYearBoundaries', () => {
	test('returns local midnight through the exclusive start of the next year', () => {
		const [startTimestamp, endTimestamp] = getYearBoundaries(2025);
		const start = new Date(startTimestamp);
		const end = new Date(endTimestamp);

		expect([start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()]).toEqual([2025, 0, 1, 0, 0, 0, 0]);
		expect([end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), end.getSeconds(), end.getMilliseconds()]).toEqual([2026, 0, 1, 0, 0, 0, 0]);
	});

	test('uses the next January 1 after a leap year', () => {
		const [startTimestamp, endTimestamp] = getYearBoundaries(2024);
		const start = new Date(startTimestamp);
		const end = new Date(endTimestamp);

		expect([start.getFullYear(), start.getMonth(), start.getDate()]).toEqual([2024, 0, 1]);
		expect([end.getFullYear(), end.getMonth(), end.getDate()]).toEqual([2025, 0, 1]);
	});
});
