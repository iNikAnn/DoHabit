// utils
import updateCompletedDays from './updateCompletedDays';
import reorderHabit from './reorderHabit';

function editHabit(habits, title, updatedHabit, newIndex) {
	habits = habits.map(
		(habit) => {
			habit = { ...habit };

			if (habit.title === title) {
				const frequencyWasChanged = habit.frequency !== updatedHabit.frequency;

				const updatedCompletedDays = frequencyWasChanged
					? updateCompletedDays(habit.completedDays, updatedHabit.frequency)
					: habit.completedDays;

				habit = {
					...habit,
					...updatedHabit,
					completedDays: updatedCompletedDays
				};
			};

			return habit;
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