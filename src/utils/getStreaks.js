// utils
import getFormattedDate from './getFormattedDate';
import removeIncompleteFirstDay from './removeIncompleteFirstDay';

/**
 * Calculates the current streak, longest streak, and all streaks
 * based on completed days.
 *
 * @param {Array<{ date: string, progress: number }>} completedDays - An array of objects
 * containing completed days, where each object must have a 'date' property
 * in string format (e.g., 'YYYY-MM-DD') and a 'progress' property
 * (e.g., a number representing the completion status).
 * @param {number} frequency - A number representing the frequency of
 * completed days.
 * @returns {{ currentStreak: number, longestStreak: number, allStreaks: Array<{ length: number, start: string, end: string }> }}
 * An object containing the current streak, longest streak, and an array
 * of all streaks.
 * @throws {TypeError} - If completedDays is not an array or if frequency is not a number.
 */

function getStreaks(completedDays, frequency) {
	if (!Array.isArray(completedDays)) {
		throw new TypeError('The first argument must be an array of completed days.');
	};

	if (typeof frequency !== 'number') {
		throw new TypeError('The second argument must be a number representing the frequency.');
	};

	completedDays = removeIncompleteFirstDay(completedDays, frequency);

	// Return "zero streaks" if the input array is empty
	if (completedDays.length === 0) {
		return { currentStreak: 0, longestStreak: 0, allStreaks: [] };
	};

	const oneDay = 24 * 60 * 60 * 1000;
	const allStreaks = [];
	let currentSeries = 1;
	let streakEnd = completedDays[0].date;

	// Iterate through the array to get ALL streaks
	for (let i = 0; i < completedDays.length; i++) {
		const dayOne = new Date(completedDays[i].date);
		const dayTwo = new Date(completedDays[i + 1]?.date);

		// The streak breaks if the difference
		// between two completed days is more than one day
		if ((dayOne - dayTwo) / oneDay === 1) {
			currentSeries++;
		} else {
			allStreaks.push({
				length: currentSeries,
				start: completedDays[i].date,
				end: streakEnd
			});

			currentSeries = 1;
			streakEnd = completedDays[i + 1]?.date;
		};
	};

	const today = new Date(getFormattedDate(new Date()));
	const lastDay = new Date(completedDays[0]?.date);

	return {
		allStreaks,
		longestStreak: Math.max(...allStreaks.map((s) => s.length)),
		currentStreak: (today - lastDay) / oneDay > 1 ? 0 : allStreaks[0].length
	};
}

export default getStreaks;