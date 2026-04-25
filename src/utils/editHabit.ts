// types
import { EditHabitFormData, Habit } from '../types/habit';

// utils
import adjustDaysProgress from './adjustDaysProgress';
import mapHabitData from './mapHabitData';
import reorderHabit from './reorderHabit';

interface Params {
	habits: Habit[],
	title: string,
	data: EditHabitFormData,
}

/**
 * Updates habit data.
 */
// TODO: Switch to ID-based search once implemented
function editHabit(params: Params): Habit[] {
	const {
		habits,
		title,
		data
	} = params;

	const fields = mapHabitData(data);

	// Update the habit data and sync progress
	let nextHabits = habits.map(
		(habit) => {
			if (habit.title !== title) return habit;

			const wasFrequencyChanged = habit.frequency !== fields.frequency;

			const nextCompletedDays = wasFrequencyChanged
				? adjustDaysProgress(habit.completedDays, fields.frequency)
				: habit.completedDays;

			return {
				...habit,
				...fields,
				completedDays: nextCompletedDays
			};
		}
	);

	// Find current position using updated title if it changed
	const currentIndex = nextHabits.findIndex(
		(habit) => habit.title === fields.title
	);

	const newIndex = Number(data.order.value) - 1;

	// Reorder if the position has changed
	if (currentIndex !== -1 && newIndex !== currentIndex) {
		nextHabits = reorderHabit({ habits: nextHabits, newIndex, currentIndex });
	}

	return nextHabits;
}

export default editHabit;