import { Habit } from '../types/habit';

/**
 * Checks if a habit title already exists,
 * excluding the current habit during editing.
 */
function checkHabitTitleExistence(
	habits: Habit[],
	input: string,
	currentHabit?: Habit
): boolean {
	// TODO: Switch to ID-based comparison once unique identifiers are implemented
	return habits.some(
		(habit) => (
			habit.title === input &&
			habit.title !== currentHabit?.title
		)
	);
}

export default checkHabitTitleExistence;