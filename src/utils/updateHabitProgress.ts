// types
import { CompletedDay, Habit, UpdateProgress } from '../types/habit';

// utils
import getFormattedDate from './getFormattedDate';
import updateHabitById from './updateHabitById';
import checkHabitCompletion from './checkHabitCompletion';

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

	const today = getFormattedDate(new Date());

	return updateHabitById(habits, habitId, (habit) => {
		const [isCompleted] = checkHabitCompletion(
			habit.completedDays,
			habit.frequency,
			new Date()
		);

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
					progress: currentDay.progress + 1
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