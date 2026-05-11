import { CompletedDay } from '../model/types';
import { formatDate } from '@shared/lib';

/**
 * Checks if a habit was completed for each of the provided dates.
 */
function checkHabitCompletion<T extends Date[]>(
	completedDays: CompletedDay[],
	frequency: number,
	...dates: T
): { [K in keyof T]: boolean } {
	const completedSet = new Set(
		completedDays
			.filter((day) => day.progress >= frequency)
			.map((day) => day.date)
	);

	return dates.map((date) => completedSet.has(formatDate(date))) as any;
}

export { checkHabitCompletion };