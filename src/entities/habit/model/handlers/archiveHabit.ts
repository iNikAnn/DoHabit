import { ArchiveHabit, Habit } from '../../types';
import updateHabitById from '../../../lib/updateHabitById';

interface Params {
	habits: Habit[];
	payload: ArchiveHabit['payload'];
}

/**
 * Toggles the archived status of a habit and pushes archived items to the end.
 */
function archiveHabit(params: Params): Habit[] {
	const {
		habits,
		payload: { habitId }
	} = params;

	const nextHabits = updateHabitById(habits, habitId, (habit) => ({
		...habit,
		isArchived: !habit.isArchived
	}));

	// Sort archived habits to the end of the list
	return nextHabits.sort(
		(a, b) => Number(a.isArchived) - Number(b.isArchived)
	);
}

export default archiveHabit;