import { Habit } from '../types/habit';

/**
 * Removes a note from a specific habit's diary.
 */
function deleteNote(
	habits: Habit[],
	title: string,
	noteCreationDate: string
): Habit[] {
	// TODO: Switch to ID-based search once implemented
	return habits.map(
		(habit) => {
			if (habit.title !== title) return habit;

			const nextDiary = habit.diary.filter(
				(note) => note.date !== noteCreationDate
			);

			return {
				...habit,
				diary: nextDiary
			};
		}
	);
}

export default deleteNote;