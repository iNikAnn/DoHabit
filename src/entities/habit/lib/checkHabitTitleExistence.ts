import type { Habit } from '../model/types';

/**
 * Checks if a habit title already exists,
 * excluding the current habit during editing.
 */
function checkHabitTitleExistence(
	habits: Habit[],
	input: string,
	initialHabit?: Habit
): boolean {
	return habits.some((habit) => (
		habit.title.toLowerCase() === input.trim().toLowerCase() &&
		habit.id !== initialHabit?.id
	));
}

export { checkHabitTitleExistence };