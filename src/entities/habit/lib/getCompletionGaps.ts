import { CompletedDay } from '../model/types';
import { countDaysBetween } from '@shared/lib';

/**
 * Calculates the number of days between consecutive completed entries.
 */
function getCompletionGaps(completedDays: CompletedDay[]): number[] {
	const gaps: number[] = [];
	if (completedDays.length < 2) return gaps;

	const dates = completedDays.map((day) => (
		new Date(day.date)
	));

	dates.forEach((date, i) => {
		const nextDate = dates[i + 1];
		if (!nextDate) return;

		const gap = countDaysBetween(date, nextDate);
		gaps.push(gap);
	});

	return gaps;
}

export default getCompletionGaps;