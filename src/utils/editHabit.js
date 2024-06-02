// utils
import updateCompletedDays from './updateCompletedDays';

function editHabit(habits, title, updatedHabit) {
	return habits.map(
		(habit) => {
			let modifiedHabit = habit;

			if (habit.title === title) {
				const frequencyWasChanged = habit.frequency !== updatedHabit.frequency;

				const updatedCompletedDays = frequencyWasChanged
					? updateCompletedDays(habit.completedDays, updatedHabit.frequency)
					: habit.completedDays;

				modifiedHabit = {
					...updatedHabit,
					completedDays: updatedCompletedDays
				};
			};

			return modifiedHabit;
		}
	);
}

export default editHabit;