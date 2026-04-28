// utils
import getFromLocalStorage from './getFromLocalStorage';
import saveToLocalStorage from './saveToLocalStorage';
import removeIncompleteDays from './removeIncompleteDays';

// types
import { Habit } from '../types/habit';

/**
 * Initializes habits by cleaning up incomplete past entries and updating localStorage.
 */
function initHabits() {
	let habits = getFromLocalStorage<Habit[]>('habits', []);
	if (!habits.length) return habits;

	habits = habits.map((habit) => ({
		...habit,

		// Remove incomplete days before today with progress less than habit frequency
		completedDays: removeIncompleteDays({
			completedDays: habit.completedDays,
			frequency: habit.frequency
		})
	}));

	saveToLocalStorage('habits', habits);

	return habits;
}

export default initHabits;