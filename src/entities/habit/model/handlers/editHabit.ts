import { EditHabit, Habit } from '../types';
import mapHabitData from '../../lib/mapHabitData';
import updateHabitById from '../../lib/updateHabitById';
import reorderHabit from '../../lib/reorderHabit';

interface Params {
	habits: Habit[];
	payload: EditHabit['payload'];
}

/**
 * Updates habit data.
 */
function editHabit(params: Params): Habit[] {
	const {
		habits,
		payload
	} = params;

	const fields = mapHabitData(payload.data);

	// Update the habit data and sync progress
	let nextHabits = updateHabitById(habits, payload.habitId, (habit) => ({
		...habit,
		...fields
	}));

	// Find current position using updated title if it changed
	const currentIndex = nextHabits.findIndex(
		(habit) => habit.id === payload.habitId
	);

	const newIndex = Number(payload.data.order ?? 1) - 1;

	// Reorder if the position has changed
	if (currentIndex !== -1 && newIndex !== currentIndex) {
		nextHabits = reorderHabit({ habits: nextHabits, newIndex, currentIndex });
	}

	return nextHabits;
}

export default editHabit;