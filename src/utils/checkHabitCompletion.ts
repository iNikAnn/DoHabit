// types
import { CompletedDay } from '../types/habit';

// utils
import { formatDate } from '@shared/lib';

/**
 * Checks if a habit was completed for each of the provided dates.
 */
function checkHabitCompletion(
	completedDays: CompletedDay[],
	frequency: number,
	...dates: Date[]
): boolean[] {
	return dates.map(
		(date) => {
			const formattedDate = formatDate(date);

			// Check if there is an entry for this date with sufficient progress
			return completedDays.some(
				(day) => (
					day.date === formattedDate
					&& day.progress >= frequency
				)
			);
		}
	);
}

export default checkHabitCompletion;