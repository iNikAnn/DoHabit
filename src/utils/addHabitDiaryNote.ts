import { Note } from '../types/diary';
import { Habit, } from '../types/habit';

interface Params {
	habits: Habit[];
	payload: {
		habitTitle: string;
		note: Note;
	};
}

/**
 * Adds a new note to a specific habit's diary.
 */
function addHabitDiaryNote(params: Params): Habit[] {
	const {
		habits,
		payload: {
			habitTitle,
			note
		}
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

export default addHabitDiaryNote;