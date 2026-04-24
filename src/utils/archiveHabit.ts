import { Habit } from '../types/habit';

/**
 * Toggles the archived status of a habit and pushes archived items to the end.
 */
function archiveHabit(
	habits: Habit[],
	title: string
): Habit[] {
	// TODO: Switch to ID-based search once implemented
	return habits
		.map((habit) => {
			if (habit.title !== title) return habit;

			return {
				...habit,
				isArchived: !habit.isArchived
			};
		})
		// Sort archived habits to the end of the list
		.sort((a, b) => Number(a.isArchived) - Number(b.isArchived));
}

export default archiveHabit;