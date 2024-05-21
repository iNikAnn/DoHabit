// utils
import getFormattedDate from './getFormattedDate';
import checkHabitCompletion from './checkHabitCompletion';

function markHabitAsCompleted(habits, title) {
	const today = new Date();

	return habits.map((habit) => {
		if (habit.title === title) {
			const isCompleted = checkHabitCompletion(habit.completedDays, today, habit.frequency);

			let updatedCompletedDays = [...habit.completedDays];

			if (isCompleted) {
				updatedCompletedDays = updatedCompletedDays.filter((day) => {
					return day.date !== getFormattedDate(today);
				});
			} else {
				const haveProgress = Boolean(updatedCompletedDays.find((day) => {
					return day.date === getFormattedDate(today);
				}));

				if (haveProgress) {
					updatedCompletedDays = updatedCompletedDays.map((day) => {
						if (day.date === getFormattedDate(today)) {
							return {
								date: day.date,
								progress: day.progress + 1
							};
						};

						return { ...day };
					});
				} else {
					updatedCompletedDays = [
						{
							date: getFormattedDate(today),
							progress: 1,
						},
						...updatedCompletedDays
					];
				};
			};

			return {
				...habit,
				completedDays: updatedCompletedDays
			};
		};

		return { ...habit };
	});
}

export default markHabitAsCompleted;