import { Habit, UpdateProgress } from '../types';
import { getTodayProgress } from '../../lib/getTodayProgress';
import updateHabitById from '../../lib/updateHabitById';

interface Params {
	habits: Habit[];
	payload: UpdateProgress['payload'];
}

/**
 * Updates or toggles the progress for a specific habit for the current day.
 */
function updateHabitProgress(params: Params): Habit[] {
	const {
		habits,
		payload: { habitId }
	} = params;

	return updateHabitById(habits, habitId, (habit) => {
		const { today, progress, isCompleted } = getTodayProgress(habit);

		if (isCompleted) {
			// Remove from history and reset progress (toggle logic)
			return {
				...habit,
				currentProgress: 0,
				lastActivityDate: today,
				completedDays: habit.completedDays.slice(1)
			};
		}

		// Increment progress
		const nextProgress = progress + 1;
		const isNowCompleted = nextProgress >= habit.frequency;

		return {
			...habit,
			currentProgress: nextProgress,
			lastActivityDate: today,
			completedDays: isNowCompleted
				? [{ date: today }, ...habit.completedDays]
				: habit.completedDays
		};
	});
}

export default updateHabitProgress;