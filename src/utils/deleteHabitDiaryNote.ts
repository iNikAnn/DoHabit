// types
import { DeleteNote, Habit } from '../types/habit';

// utils
import updateHabitById from './updateHabitById';
import deleteNote from './deleteNote';

interface Params {
	habits: Habit[];
	payload: DeleteNote['payload'];
}

/**
 * Removes a note from a specific habit's diary.
 */
function deleteHabitDiaryNote(params: Params): Habit[] {
	const {
		habits,
		payload
	} = params;

	return updateHabitById(habits, payload.habitId, (habit) => ({
		...habit,
		diary: deleteNote({
			diary: habit.diary ?? [],
			payload
		})
	}));
}

export default deleteHabitDiaryNote;