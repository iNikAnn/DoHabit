import { CompletedDay } from '../model/types';

/**
 * Calculates total completions for each day of the week (0-6).
 */
function getCompletionCountPerDay(completedDays: CompletedDay[]): number[] {
	// Initialize array with 7 zeros for each day of the week (0-6)
	const counts = new Array(7).fill(0);

	for (const day of completedDays) {
		const dayOfWeek = new Date(day.date).getDay();
		counts[dayOfWeek] += 1;
	}

	return counts;
}

export { getCompletionCountPerDay };