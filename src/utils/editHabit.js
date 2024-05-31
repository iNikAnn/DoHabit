// utils
import getFormattedDate from './getFormattedDate';

function editHabit(habits, title, newHabit) {
	return habits.map((habit) => {
		if (habit.title === title) {
			// updating the frequency value for completed days
			const updatedCompletedDays = habit.completedDays.map(
				(day) => (
					day.date === getFormattedDate(new Date()) && day.progress < newHabit.frequency
						? day
						: { ...day, progress: newHabit.frequency }
				)
			);

			return {
				...newHabit,
				completedDays: updatedCompletedDays
			};
		};

		return habit;
	});
}

export default editHabit;