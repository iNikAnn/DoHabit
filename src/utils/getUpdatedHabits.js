// utils
import getFormattedDate from './getFormattedDate';
import deleteHabit from './deleteHabit';

function getUpdatedHabits(habits, data, mode, originalHabitTitle) {
	if (mode === 'delete') {
		return deleteHabit(habits, originalHabitTitle);
	};

	const newHabit = {
		title: data.title.value,
		colorIndex: Number(data.colorIndex.value),
		iconTitle: data.iconTitle.value,
		frequency: Number(data.frequency.value),
		completedDays: [],
	};

	if (mode === 'edit') {
		const updatedHabits = habits.map((habit) => {
			if (habit.title === originalHabitTitle) {
				// updating the frequency value for completed days
				const updatedCompletedDays = habit.completedDays.map((day) => {
					if (day.date === getFormattedDate(new Date())
						&& day.progress < Number(data.frequency.value)
					) {
						return { ...day };
					};

					return {
						...day,
						progress: Number(data.frequency.value)
					};
				});

				return {
					...newHabit,
					completedDays: updatedCompletedDays
				};
			};

			return { ...habit };
		});


		// reorder habits
		if (data.order && data.order.value) {
			const newOrder = parseInt(data.order.value, 10) - 1;
			const currHabitIndex = updatedHabits.findIndex((habit) => {
				return habit.title === data.title.value;
			});

			if (currHabitIndex !== -1) {
				const currHabit = updatedHabits[currHabitIndex];

				if (currHabitIndex !== newOrder && newOrder >= 0 && newOrder < updatedHabits.length) {
					updatedHabits.splice(currHabitIndex, 1);
					updatedHabits.splice(newOrder, 0, currHabit);
				};
			};
		};

		return updatedHabits;
	};

	return [newHabit, ...habits];
}

export default getUpdatedHabits;