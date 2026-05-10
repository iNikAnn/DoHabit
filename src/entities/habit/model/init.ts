import { Habit } from './types';
import removeIncompleteDays from '../lib/removeIncompleteDays';

/**
 * Initializes habits by cleaning up incomplete past entries.
 */
function initHabits(habits: Habit[]): Habit[] {
	if (!habits.length) return [];

	return habits.map((habit) => ({
		...habit,

		// Remove incomplete days before today with progress less than habit frequency
		completedDays: removeIncompleteDays({
			completedDays: habit.completedDays,
			frequency: habit.frequency
		})
	}));
}

export { initHabits };