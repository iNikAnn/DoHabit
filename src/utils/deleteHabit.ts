import { Habit } from '../types/habit';

interface Params {
	habits: Habit[];
	title: string;
}

/**
 * Removes a habit from the list by its title.
 */
function deleteHabit({ habits, title }: Params) {
	if (title === '' || typeof title !== 'string') {
		throw new Error('A valid habit title must be provided to delete a habit.');
	}

	return habits.filter((habit) => habit.title !== title);
}

export default deleteHabit;