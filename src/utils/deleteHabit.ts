import { DeleteHabit, Habit } from '../types/habit';

interface Params {
	habits: Habit[];
	payload: DeleteHabit['payload'];
}

/**
 * Removes a habit from the list by its title.
 */
function deleteHabit(params: Params): Habit[] {
	const {
		habits,
		payload: { habitId }
	} = params;

	if (habitId === '') {
		throw new Error('A valid habit title must be provided to delete a habit.');
	}

	// TODO: Switch to ID-based search once implemented
	return habits.filter((habit) => habit.title !== habitId);
}

export default deleteHabit;