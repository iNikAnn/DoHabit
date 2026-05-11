import { CompletedDay } from '../model/types';

/**
 * Calculates the total number of fully completed days for each month.
 */
function getCompletionCountPerMonth(
	completedDays: CompletedDay[],
	frequency: number
): number[] {
	// Initialize array for all 12 months with zeros (0-11)
	const counts = new Array(12).fill(0);

	for (const day of completedDays) {
		// Skip if the habit goal wasn't reached
		if (day.progress !== undefined && day.progress < frequency) continue;

		const month = new Date(day.date).getMonth();
		counts[month] += 1;
	}

	return counts;
}

export { getCompletionCountPerMonth };