import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getDatesRange } from './getDatesRange';

describe('getDatesRange', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe('forward range with "from"', () => {
		test('generates chronological range from a string date', () => {
			const result = getDatesRange(3, { from: '2026-05-10' });
			expect(result).toEqual(['2026-05-10', '2026-05-11', '2026-05-12']);
		});

		test('generates chronological range from a Date instance', () => {
			const result = getDatesRange(3, { from: new Date(2026, 4, 10) });
			expect(result).toEqual(['2026-05-10', '2026-05-11', '2026-05-12']);
		});

		test('handles month boundary transitions forward', () => {
			const result = getDatesRange(4, { from: '2026-01-30' });
			expect(result).toEqual(['2026-01-30', '2026-01-31', '2026-02-01', '2026-02-02']);
		});

		test('handles year boundary transitions forward', () => {
			const result = getDatesRange(3, { from: '2025-12-30' });
			expect(result).toEqual(['2025-12-30', '2025-12-31', '2026-01-01']);
		});

		test('handles leap years correctly', () => {
			const result = getDatesRange(3, { from: '2024-02-28' });
			expect(result).toEqual(['2024-02-28', '2024-02-29', '2024-03-01']);
		});
	});

	describe('backward range with "to"', () => {
		test('generates chronological range ending at "to" from a string date', () => {
			const result = getDatesRange(4, { to: '2026-05-15' });
			expect(result).toEqual(['2026-05-12', '2026-05-13', '2026-05-14', '2026-05-15']);
		});

		test('generates chronological range ending at "to" from a Date instance', () => {
			const result = getDatesRange(3, { to: new Date(2026, 4, 15) });
			expect(result).toEqual(['2026-05-13', '2026-05-14', '2026-05-15']);
		});

		test('handles month boundary transitions backward in a non-leap year', () => {
			const result = getDatesRange(3, { to: '2026-03-02' });
			expect(result).toEqual(['2026-02-28', '2026-03-01', '2026-03-02']);
		});

		test('handles year boundary transitions backward', () => {
			const result = getDatesRange(3, { to: '2026-01-02' });
			expect(result).toEqual(['2025-12-31', '2026-01-01', '2026-01-02']);
		});
	});

	describe('fallback and edge cases', () => {
		test('defaults to Date.now() when neither "from" nor "to" is provided', () => {
			vi.setSystemTime(new Date(2026, 6, 20)); // July 20, 2026

			const result = getDatesRange(3, {});
			expect(result).toEqual(['2026-07-18', '2026-07-19', '2026-07-20']);
		});

		test('prioritizes "from" when both "from" and "to" are provided', () => {
			const result = getDatesRange(3, { from: '2026-05-01', to: '2026-05-10' });
			expect(result).toEqual(['2026-05-01', '2026-05-02', '2026-05-03']);
		});

		test('returns empty array when count is 0', () => {
			const result = getDatesRange(0, { from: '2026-05-10' });
			expect(result).toEqual([]);
		});

		test('returns single date array when count is 1', () => {
			const result = getDatesRange(1, { from: '2026-05-10' });
			expect(result).toEqual(['2026-05-10']);
		});
	});
});
