import { CompletedDay } from '../model/types';
import { formatDate } from '@shared/lib';

/**
 * Resolves completed dates into a Set.
 */
function getCompletedDatesSet(
	completedDays: CompletedDay[],
	frequency: number,
	...dates: Date[]
): Set<string> {
	// Create index of all valid completions
	const completedSet = new Set(
		completedDays
			.filter((d) => d.progress === undefined || d.progress >= frequency)
			.map((d) => d.date)
	);

	const result = new Set<string>();

	dates.forEach((date) => {
		const formattedDate = formatDate(date);

		if (completedSet.has(formattedDate)) {
			result.add(formattedDate);
		}
	});

	return result;
}

export { getCompletedDatesSet };