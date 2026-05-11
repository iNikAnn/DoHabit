import { CompletedDay, Habit, UpdateProgress } from '../types';
import { getTodayProgress } from '../../lib/getTodayProgress';
import updateHabitById from '../../lib/updateHabitById';
import { formatDate } from '@shared/lib';

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

	const today = formatDate(new Date());

	return updateHabitById(habits, habitId, (habit) => {
		const { isCompleted } = getTodayProgress({
			completedDays: habit.completedDays,
			frequency: habit.frequency
		});

		let nextCompletedDays: CompletedDay[] = [];

		if (isCompleted) {
			// Remove entry if it was already completed (toggle logic)
			nextCompletedDays = habit.completedDays.filter(
				(day) => day.date !== today
			);
		} else {
			const todayIndex = habit.completedDays.findIndex(
				(day) => day.date === today
			);
			const currentDay = habit.completedDays[todayIndex];

			if (currentDay) {
				// Increment progress for the existing entry
				nextCompletedDays = [...habit.completedDays];

				nextCompletedDays[todayIndex] = {
					...currentDay,
					progress: (currentDay.progress ?? 0) + 1
				};
			} else {
				// Add new entry for today if it doesn't exist
				nextCompletedDays = [
					{ date: today, progress: 1 },
					...habit.completedDays
				];
			}
		}

		return {
			...habit,
			completedDays: nextCompletedDays
		};
	});
}

export default updateHabitProgress;