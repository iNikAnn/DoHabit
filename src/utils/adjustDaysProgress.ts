// types
import { CompletedDay } from '../types/habit';

// utils
import getFormattedDate from './getFormattedDate';

/**
 * Synchronizes the progress of past days with the new habit frequency.
 * Today's progress is kept as is if the goal hasn't been met yet.
 */
function adjustDaysProgress(
	completedDays: CompletedDay[],
	newFrequency: number
): CompletedDay[] {
	const today = getFormattedDate(new Date());

	return completedDays.map(
		(day) => {
			const isToday = day.date === today;
			const isUncompleted = day.progress < newFrequency;

			// Skip updating today if it's still in progress
			if (isToday && isUncompleted) {
				return day;
			}

			// Update to new frequency for past days or already completed today
			return {
				...day,
				progress: newFrequency
			};
		}
	);
}

export default adjustDaysProgress;