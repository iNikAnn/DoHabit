// types
import { Habit } from '../types/habit';

// utils
import deleteNote from './deleteNote';

interface Params {
	habits: Habit[];
	payload: {
		habitTitle: string;
		noteCreationDate: Date | string;
	};
}

/**
 * Removes a note from a specific habit's diary.
 */
function deleteHabitDiaryNote(params: Params): Habit[] {
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
				diary: deleteNote({
					diary: habit.diary ?? [],
					payload
				})
			};
		}
	);
}

export default deleteHabitDiaryNote;