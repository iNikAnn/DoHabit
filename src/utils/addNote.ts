import { Habit, Note } from '../types/habit';

interface Params {
	habits: Habit[];
	habitTitle: string;
	note: Note;
}

/**
 * Adds a new note to a specific habit's diary.
 */
function addNote(params: Params): Habit[] {
	const {
		habits,
		habitTitle,
		note
	} = params;

	return habits.map(
		(habit) => {
			// TODO: Switch to ID-based search once implemented
			if (habit.title !== habitTitle) return habit;

			return {
				...habit,
				diary: [...(habit.diary ?? []), note]
			};
		}
	);
}

export default addNote;