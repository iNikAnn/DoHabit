import { Habit } from '../types/habit';

/**
 * Updates the text of a specific note within a habit's diary.
 */
function editNote(
	habits: Habit[],
	title: string,
	noteCreationDate: string,
	newText: string
): Habit[] {
	// TODO: Switch to ID-based search once implemented
	return habits.map(
		(habit) => {
			if (habit.title !== title) return habit;

			const nextDiary = (habit.diary ?? []).map(
				(note) => {
					if (note.date !== noteCreationDate) return note;

					return {
						...note,
						text: newText
					};
				}
			);

			return {
				...habit,
				diary: nextDiary
			};
		}
	);
}

export default editNote;