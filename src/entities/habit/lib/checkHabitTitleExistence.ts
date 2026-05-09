import { Habit } from '../model/types';

/**
 * Checks if a habit title already exists,
 * excluding the current habit during editing.
 */
function checkHabitTitleExistence(
	habits: Habit[],
	input: string,
	currentHabit?: Habit
): boolean {
	return habits.some((habit) => (
		habit.title === input &&
		habit.title !== currentHabit?.title
	));
}

export { checkHabitTitleExistence };