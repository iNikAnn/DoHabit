// types
import { Habit, HabitFormData } from '../types/habit';

// utils
import mapHabitData from './mapHabitData';

interface Params {
	habits: Habit[];
	payload: {
		data: HabitFormData;
	};
}

/**
 * Adds a new habit to the beginning of the list.
 */
function addHabit(params: Params): Habit[] {
	const {
		habits,
		payload: { data }
	} = params;

	const newHabit = {
		...mapHabitData(data),
		creationDate: new Date(),
		completedDays: []
	};

	return [newHabit, ...habits];
}

export default addHabit;