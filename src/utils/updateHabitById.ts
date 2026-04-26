import { Habit } from '../types/habit';

/**
 * Generic helper to update a specific habit in the list.
 */
function updateHabitById(
	habits: Habit[],
	habitId: string,
	updateFn: (habit: Habit) => Habit
): Habit[] {
	return habits.map((habit) => (
		// TODO: Switch to ID-based search once implemented
		habit.title === habitId
			? updateFn(habit)
			: habit
	));
}

export default updateHabitById;