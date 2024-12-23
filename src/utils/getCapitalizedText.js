/**
 * Capitalizes the first letter of each word in the given text.
 *
 * @param {string} text - The input text to be capitalized.
 * @returns {string} - The text with the first letter of each word capitalized.
 * @throws {TypeError} - If the input is not a string.
 */

function getCapitalizedText(text) {
	if (typeof text !== 'string') {
		throw new TypeError('Input must be a string.');
	};

	return text.replace(/\b\w/g, (l) => l.toUpperCase());
}

export default getCapitalizedText;