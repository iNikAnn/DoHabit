import { CompletedDay } from '../types/habit';
import { formatDate } from '@shared/lib';

/**
 * Checks if a habit was completed for each of the provided dates.
 */
function checkHabitCompletion<T extends Date[]>(
	completedDays: CompletedDay[],
	frequency: number,
	...dates: T
): { [K in keyof T]: boolean } {
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
	) as any;
}

export default checkHabitCompletion;