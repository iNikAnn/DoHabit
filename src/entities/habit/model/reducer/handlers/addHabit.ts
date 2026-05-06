import { AddHabit, Habit } from '../../types';
import mapHabitData from '../../../lib/mapHabitData';

interface AddHabitParams {
	habits: Habit[];
	payload: AddHabit['payload'];
}

/**
 * Adds a new habit to the beginning of the list.
 */
function addHabit(params: AddHabitParams): Habit[] {
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