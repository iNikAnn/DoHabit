import { describe, expect, test } from 'vitest';
import { extractYearsFromTimeline } from './extractYearsFromTimeline';

describe('extractYearsFromTimeline', () => {
	test('returns an empty array for an empty timeline', () => {
		expect(extractYearsFromTimeline([])).toEqual([]);
	});

	test('extracts unique years while preserving first-seen order by default', () => {
		const items = [
			{ createdAt: new Date(2024, 6, 10).getTime() },
			{ createdAt: new Date(2022, 1, 5).getTime() },
			{ createdAt: new Date(2024, 11, 20).getTime() },
			{ createdAt: new Date(2023, 3, 15).getTime() }
		];

		expect(extractYearsFromTimeline(items)).toEqual([2024, 2022, 2023]);
	});

	test('sorts unique years in ascending order', () => {
		const items = [
			{ createdAt: new Date(2024, 6, 10).getTime() },
			{ createdAt: new Date(2022, 1, 5).getTime() },
			{ createdAt: new Date(2023, 3, 15).getTime() }
		];

		expect(extractYearsFromTimeline(items, { order: 'asc' })).toEqual([2022, 2023, 2024]);
	});

	test('sorts unique years in descending order', () => {
		const items = [
			{ createdAt: new Date(2022, 1, 5).getTime() },
			{ createdAt: new Date(2024, 6, 10).getTime() },
			{ createdAt: new Date(2023, 3, 15).getTime() }
		];

		expect(extractYearsFromTimeline(items, { order: 'desc' })).toEqual([2024, 2023, 2022]);
	});
});
