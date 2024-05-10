// utils
import getFormattedDate from './getFormattedDate';

function markHabitAsCompleted(habits, title) {
	const today = getFormattedDate(new Date());

	const updatedHabits = habits.map((habit) => {
		if (habit.title === title) {
			const isCompleted = habit.completedDays.includes(today);

			const updatedCompletedDays = isCompleted
				? habit.completedDays.filter((day) => day !== today)
				: [today, ...habit.completedDays];

			return {
				...habit,
				completedDays: updatedCompletedDays
			};
		};

		return habit;
	});

	return updatedHabits;
}

export default markHabitAsCompleted;