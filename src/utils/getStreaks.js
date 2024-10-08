import getFormattedDate from './getFormattedDate';

function getStreaks(completedDays, frequency) {

	// Return "zero streaks" if the input array is empty
	if (completedDays.length === 0) {
		return { currentStreak: 0, longestStreak: 0, allStreaks: [] };
	};

	// Remove the first day if it is not completed
	if (completedDays[0].progress < frequency) {
		completedDays = completedDays.slice(1);
	};

	const oneDay = 24 * 60 * 60 * 1000;

	const allStreaks = [];
	let currentSeries = 1;

	// Iterate through the array to get ALL streaks
	for (let i = 0; i < completedDays.length; i++) {
		const dayOne = new Date(completedDays[i].date);
		const dayTwo = new Date(completedDays[i + 1]?.date);

		// The streak breaks if the difference
		// between two completed days is more than one day
		if ((dayOne - dayTwo) / oneDay === 1) {
			currentSeries++;
		} else {
			allStreaks.push(currentSeries);
			currentSeries = 1;
		};
	};

	const today = new Date(getFormattedDate(new Date()));
	const lastDay = new Date(completedDays[0]?.date);

	return {
		allStreaks,
		longestStreak: Math.max(...allStreaks),
		currentStreak: (today - lastDay) / oneDay > 1 ? 0 : allStreaks[0]
	};
}

export default getStreaks;