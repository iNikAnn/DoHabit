import { SetHabitArchiveStatus, Habit } from '../types';
import updateHabitById from '../../lib/updateHabitById';

interface Params {
	habits: Habit[];
	payload: SetHabitArchiveStatus['payload'];
}

/**
 * Set the archived status of a habit and pushes archived items to the end.
 */
function setHabitArchiveStatus(params: Params): Habit[] {
	const {
		habits,
		payload: {
			habitId,
			isArchived
		}
	} = params;

	const nextHabits = updateHabitById(habits, habitId, (habit) => ({
		...habit,
		isArchived
	}));

	// Sort archived habits to the end of the list
	return nextHabits.sort(
		(a, b) => Number(a.isArchived) - Number(b.isArchived)
	);
}

export default setHabitArchiveStatus;