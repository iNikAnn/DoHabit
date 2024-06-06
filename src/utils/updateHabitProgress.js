// utils
import getFormattedDate from './getFormattedDate';
import checkHabitCompletion from './checkHabitCompletion';

function updateHabitProgress(habits, title) {
	const today = getFormattedDate(new Date());

	return habits.map((habit) => {
		habit = { ...habit };

		if (habit.title === title) {
			const isCompleted = checkHabitCompletion(habit.completedDays, new Date(), habit.frequency);
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
			};

			habit = {
				...habit,
				completedDays: completedDays
			};
		};

		return habit;
	});
}

export default updateHabitProgress;