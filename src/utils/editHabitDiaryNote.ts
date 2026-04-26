// types
import { Habit } from '../types/habit';

// utils
import editNote from './editNote';

interface Params {
	habits: Habit[];
	payload: {
		habitTitle: string;
		noteCreationDate: Date | string;
		newText: string;
	};
}

/**
 * Updates the text of a specific note within a habit's diary.
 */
function editHabitDiaryNote(params: Params): Habit[] {
	const {
		habits,
		payload
	} = params;

	// TODO: Switch to ID-based search once implemented
	return habits.map(
		(habit) => {
			if (habit.title !== payload.habitTitle) return habit;

			return {
				...habit,
				diary: editNote({
					diary: habit.diary ?? [],
					payload
				})
			};
		}
	);
}

export default editHabitDiaryNote;