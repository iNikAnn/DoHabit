import hashtagRegex from 'hashtag-regex';
import { uniq } from 'es-toolkit';

type TargetData = string | string[] | { text: string }[];

interface ExtractTagsOptions {
	order?: 'asc' | 'desc';
}

/**
 * Parses data, extracts all unique hashtags.
 */
function extractUniqueTags(data: TargetData, options?: ExtractTagsOptions): string[] {
	const {
		order
	} = options ?? {};

	const regex = hashtagRegex();

	// Normalize any input variant into a plain array of strings
	let textArray: string[] = [];

	if (typeof data === 'string') {
		textArray = [data];
	} else if (Array.isArray(data)) {
		textArray = data.map((item) => {
			if (typeof item === 'string') {
				return item;
			}

			return item && typeof item === 'object' && 'text' in item ? item.text : '';
		});
	}

	// Extract, lowercase, and flatten all hashtag matches
	const allTags = textArray.flatMap((text) => {
		const matches = text.match(regex);
		return matches ? matches.map((tag) => tag.toLowerCase()) : [];
	});

	// Get unique tags
	const uniqueTags = uniq(allTags);

	// In-place sorting
	if (order) {
		uniqueTags.sort();

		if (order === 'desc') {
			uniqueTags.reverse();
		}
	}

	return uniqueTags;
}

export { extractUniqueTags };