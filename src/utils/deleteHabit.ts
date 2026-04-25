import { Habit } from '../types/habit';

interface Params {
	habits: Habit[];
	payload: {
		habitTitle: string;
	};
}

/**
 * Removes a habit from the list by its title.
 */
function deleteHabit(params: Params): Habit[] {
	const {
		habits,
		payload: { habitTitle }
	} = params;

	if (habitTitle === '') {
		throw new Error('A valid habit title must be provided to delete a habit.');
	}

	return habits.filter((habit) => habit.title !== habitTitle);
}

export default deleteHabit;