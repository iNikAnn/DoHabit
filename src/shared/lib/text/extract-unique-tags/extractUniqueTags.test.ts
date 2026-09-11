import { describe, expect, test } from 'vitest';
import { extractUniqueTags } from './extractUniqueTags';

describe('extractUniqueTags', () => {
	test('extracts hashtags from a string', () => {
		const input = 'Build habits with #focus and #consistency';

		expect(extractUniqueTags(input)).toEqual(['#focus', '#consistency']);
	});

	test('normalizes hashtags to lowercase and removes duplicates', () => {
		const input = '#Focus #focus #FOCUS #Health';

		expect(extractUniqueTags(input)).toEqual(['#focus', '#health']);
	});

	test('extracts hashtags from an array of strings', () => {
		const input = ['Morning #exercise', 'Evening #reading', 'More #exercise'];

		expect(extractUniqueTags(input)).toEqual(['#exercise', '#reading']);
	});

	test('extracts hashtags from objects containing text', () => {
		const input = [
			{ text: 'Work on #typescript' },
			{ text: 'Learn #react and #typescript' }
		];

		expect(extractUniqueTags(input)).toEqual(['#typescript', '#react']);
	});

	test('returns an empty array when no hashtags exist', () => {
		expect(extractUniqueTags('There are no tags here')).toEqual([]);
	});

	test('returns an empty array for empty inputs', () => {
		expect(extractUniqueTags([])).toEqual([]);
	});

	test('sorts hashtags in asc and desc order', () => {
		const input = '#zebra #apple #banana';

		expect(extractUniqueTags(input, { order: 'asc' })).toEqual(['#apple', '#banana', '#zebra']);
		expect(extractUniqueTags(input, { order: 'desc' })).toEqual(['#zebra', '#banana', '#apple']);
	});

	test('handles objects with missing or invalid text property', () => {
		const input = [
			{ text: 'Valid #tag' },
			{ wrongField: '#ignored' },
			null
		];

		// @ts-expect-error testing invalid structure
		expect(extractUniqueTags(input)).toEqual(['#tag']);
	});
});
