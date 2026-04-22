import { CompletedDay } from '../types/habit';

/**
 * Removes the first day entry if its progress is below the required frequency.
 */
function removeIncompleteFirstDay(
	completedDays: CompletedDay[],
	frequency: number
): CompletedDay[] {
	// Get the first element of the array
	const firstDay = completedDays.at(0);

	// If the first day exists and is incomplete, remove it
	if (firstDay && firstDay.progress < frequency) {
		completedDays = completedDays.slice(1);
	}

	return completedDays;
}

export default removeIncompleteFirstDay;