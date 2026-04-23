import { Habit, Note } from '../types/habit';

/**
 * Adds a new note to a specific habit's diary.
 */
function addNote(
	habits: Habit[],
	title: string,
	newNote: Note
): Habit[] {
	return habits.map(
		(habit) => {
			// TODO: Switch to ID-based search once implemented
			if (habit.title !== title) return habit;

			return {
				...habit,
				diary: [...(habit.diary ?? []), newNote]
			};
		}
	);
}

export default addNote;