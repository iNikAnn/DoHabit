// types
import { EditHabit, Habit } from '../types/habit';

// utils
import mapHabitData from './mapHabitData';
import updateHabitById from './updateHabitById';
import adjustDaysProgress from './adjustDaysProgress';
import reorderHabit from './reorderHabit';

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
	let nextHabits = updateHabitById(habits, payload.habitId, (habit) => {
		const wasFrequencyChanged = habit.frequency !== fields.frequency;

		const nextCompletedDays = wasFrequencyChanged
			? adjustDaysProgress(habit.completedDays, fields.frequency)
			: habit.completedDays;

		return {
			...habit,
			...fields,
			completedDays: nextCompletedDays
		};
	});

	// Find current position using updated title if it changed
	const currentIndex = nextHabits.findIndex(
		(habit) => habit.title === fields.title
	);

	const newIndex = Number(payload.data.order.value) - 1;

	// Reorder if the position has changed
	if (currentIndex !== -1 && newIndex !== currentIndex) {
		nextHabits = reorderHabit({ habits: nextHabits, newIndex, currentIndex });
	}

	return nextHabits;
}

export default editHabit;