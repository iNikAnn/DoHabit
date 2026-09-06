import { describe, expect, test } from 'vitest';
import { extractUniqueTags } from './extractUniqueTags';

describe('extractUniqueTags', () => {
	test('extracts hashtags from a string', () => {
		expect(extractUniqueTags('Build habits with #focus and #consistency')).toEqual([
			'#focus',
			'#consistency'
		]);
	});

	test('normalizes hashtags to lowercase and removes duplicates', () => {
		expect(extractUniqueTags('#Focus #focus #FOCUS #Health')).toEqual([
			'#focus',
			'#health'
		]);
	});

	test('extracts hashtags from an array of strings', () => {
		expect(extractUniqueTags([
			'Morning #exercise',
			'Evening #reading',
			'More #exercise'
		])).toEqual(['#exercise', '#reading']);
	});

	test('extracts hashtags from objects containing text', () => {
		expect(extractUniqueTags([
			{ text: 'Work on #typescript' },
			{ text: 'Learn #react and #typescript' }
		])).toEqual(['#typescript', '#react']);
	});

	test('returns an empty array when no hashtags exist', () => {
		expect(extractUniqueTags('There are no tags here')).toEqual([]);
	});

	test('sorts hashtags in ascending order', () => {
		expect(extractUniqueTags('#zebra #apple #banana', { order: 'asc' })).toEqual([
			'#apple',
			'#banana',
			'#zebra'
		]);
	});

	test('sorts hashtags in descending order', () => {
		expect(extractUniqueTags('#apple #zebra #banana', { order: 'desc' })).toEqual([
			'#zebra',
			'#banana',
			'#apple'
		]);
	});
});
