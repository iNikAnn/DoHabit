// utils
import updateCompletedDays from './updateCompletedDays';
import reorderHabit from './reorderHabit';

function editHabit(habits, title, updatedHabit, newIndex) {
	habits = habits.map(
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

	const currIndex = habits.findIndex(
		(habit) => habit.title === title
	);

	if (currIndex !== -1 && newIndex !== currIndex) {
		habits = reorderHabit(habits, newIndex, currIndex);
	};

	return habits;
}

export default editHabit;