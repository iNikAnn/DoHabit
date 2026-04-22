// types
import { Habit } from '../types/habit';

// utils
import getFormattedDate from './getFormattedDate';
import checkHabitCompletion from './checkHabitCompletion';

interface Params {
	habits: Habit[];
	title: string;
}

function updateHabitProgress({ habits, title }: Params): Habit[] {
	const today = getFormattedDate(new Date());

	return habits.map((habit) => {
		habit = { ...habit };

		if (habit.title !== title) return habit;

		const [isCompleted] = checkHabitCompletion(habit.completedDays, habit.frequency, new Date());
		let completedDays = [...habit.completedDays];

		if (isCompleted) {
			completedDays = completedDays.filter(
				(day) => day.date !== today
			);
		} else {
			const todayIndex = completedDays.findIndex(
				(day) => day.date === today
			);

			todayIndex !== -1
				? completedDays[todayIndex] = {
					...completedDays[todayIndex],
					progress: completedDays[todayIndex].progress + 1
				}
				: completedDays.unshift({ date: today, progress: 1, });
		}

		habit = {
			...habit,
			completedDays
		};

		return habit;
	});
}

export default updateHabitProgress;