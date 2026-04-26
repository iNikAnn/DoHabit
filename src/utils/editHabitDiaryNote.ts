// types
import { EditNote, Habit } from '../types/habit';

// utils
import updateHabitById from './updateHabitById';
import editNote from './editNote';

interface Params {
	habits: Habit[];
	payload: EditNote['payload']
}

/**
 * Updates the text of a specific note within a habit's diary.
 */
function editHabitDiaryNote(params: Params): Habit[] {
	const {
		habits,
		payload
	} = params;

	return updateHabitById(habits, payload.habitId, (habit) => ({
		...habit,
		diary: editNote({
			diary: habit.diary ?? [],
			payload
		})
	}));
}

export default editHabitDiaryNote;