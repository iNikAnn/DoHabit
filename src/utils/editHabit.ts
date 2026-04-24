// types
import { Habit } from '../types/habit';

// utils
import adjustDaysProgress from './adjustDaysProgress';
import reorderHabit from './reorderHabit';

/**
 * Updates habit data.
 */
function editHabit(
	habits: Habit[],
	title: string,
	updatedHabit: Habit,
	newIndex: number
): Habit[] {
	// TODO: Switch to ID-based search once implemented
	// Update the habit data and sync progress
	let nextHabits = habits.map(
		(habit) => {
			if (habit.title !== title) return habit;

			const wasFrequencyChanged = habit.frequency !== updatedHabit.frequency;

			const nextCompletedDays = wasFrequencyChanged
				? adjustDaysProgress(habit.completedDays, updatedHabit.frequency)
				: habit.completedDays;

			return {
				...habit,
				...updatedHabit,
				completedDays: nextCompletedDays
			};
		}
	);

	// Find current position using updated title if it changed
	const currentIndex = nextHabits.findIndex(
		(habit) => habit.title === updatedHabit.title
	);

	// Reorder if the position has changed
	if (currentIndex !== -1 && newIndex !== currentIndex) {
		nextHabits = reorderHabit({ habits: nextHabits, newIndex, currentIndex });
	}

	return nextHabits;
}

export default editHabit;