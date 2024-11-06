import getDayGap from './getDayGap';

function getCompletionGaps(completedDays, frequency) {
	const gaps = [];

	if (completedDays.length < 2) return gaps;

	// Remove the first day if it is not completed
	if (completedDays[0]?.progress < frequency) {
		completedDays = completedDays.slice(1);
	};

	for (let i = 0; i < completedDays.length - 1; i++) {
		const dayOne = new Date(completedDays[i].date);
		const dayTwo = new Date(completedDays[i + 1].date);

		const gap = getDayGap(dayOne, dayTwo);

		if (gap) gaps.push(gap);
	};

	return gaps;
}

export default getCompletionGaps;