import { describe, expect, test } from 'vitest';
import { getYearBoundaries } from './getYearBoundaries';

describe('getYearBoundaries', () => {
	test('returns local start of year and start of next year timestamps', () => {
		const [start, end] = getYearBoundaries(2025);

		expect(start).toBe(new Date(2025, 0, 1).getTime());
		expect(end).toBe(new Date(2026, 0, 1).getTime());
	});
});
