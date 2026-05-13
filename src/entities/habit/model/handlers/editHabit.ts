import { EditHabit, Habit } from '../types';
import mapHabitData from '../../lib/mapHabitData';
import updateHabitById from '../../lib/updateHabitById';
import reorderHabit from '../../lib/reorderHabit';
import { getTodayProgress } from '../../lib/getTodayProgress';

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
		const { isCompleted } = getTodayProgress(habit);
		const isFrequencyChanged = fields.frequency !== habit.frequency;

		/**
		 * Keep progress in sync with frequency.
		 * Reset to 0 if not finished to avoid accidental completion.
		 */
		const nextProgress = isCompleted
			? fields.frequency
			: isFrequencyChanged ? 0 : habit.currentProgress;

		return {
			...habit,
			...fields,
			currentProgress: nextProgress
		};
	});

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