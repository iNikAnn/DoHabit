import { CompletedDay } from '../model/types';

/**
 * Removes the latest entry if it's not fully completed.
 */
function removeIncompleteLatestDay(
	completedDays: CompletedDay[],
	frequency: number
): CompletedDay[] {
	const latestDay = completedDays.at(0);

	// If latest day exists and is incomplete, remove it
	if (latestDay && latestDay.progress !== undefined && latestDay.progress < frequency) {
		completedDays = completedDays.slice(1);
	}

	return completedDays;
}

export { removeIncompleteLatestDay };