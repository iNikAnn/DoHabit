import { CompletedDay } from '../model/types';
import removeIncompleteFirstDay from './removeIncompleteFirstDay';
import { countDaysBetween } from '@shared/lib';

/**
 * Calculates the number of days between consecutive completed entries.
 */
function getCompletionGaps(
	completedDays: CompletedDay[],
	frequency: number
): number[] {
	const gaps: number[] = [];
	const processedDays = removeIncompleteFirstDay(completedDays, frequency);

	if (processedDays.length < 2) return gaps;

	const dates = processedDays.map((day) => (
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