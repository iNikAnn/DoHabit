// types
import { AddNote, Habit, } from '../types/habit';

// utils
import updateHabitById from './updateHabitById';

interface Params {
	habits: Habit[];
	payload: AddNote['payload'];
}

/**
 * Adds a new note to a specific habit's diary.
 */
function addHabitDiaryNote(params: Params): Habit[] {
	const {
		habits,
		payload: {
			habitId,
			note
		}
	} = params;

	return updateHabitById(habits, habitId, (habit) => ({
		...habit,
		diary: [...(habit.diary ?? []), note]
	}));
}

export default addHabitDiaryNote;