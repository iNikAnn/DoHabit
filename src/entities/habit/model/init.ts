import { Habit } from './types';
import removeIncompleteDays from '../lib/removeIncompleteDays';
import { readLocalStorage, writeLocalStorage } from '@shared/lib';

/**
 * Initializes habits by cleaning up incomplete past entries and updating localStorage.
 */
function initHabits() {
	let habits = readLocalStorage<Habit[]>('habits', []);
	if (!habits.length) return habits;

	habits = habits.map((habit) => ({
		...habit,

		// Remove incomplete days before today with progress less than habit frequency
		completedDays: removeIncompleteDays({
			completedDays: habit.completedDays,
			frequency: habit.frequency
		})
	}));

	writeLocalStorage('habits', habits);

	return habits;
}

export default initHabits;