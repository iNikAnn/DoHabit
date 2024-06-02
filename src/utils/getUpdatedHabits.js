// utils
import deleteHabit from './deleteHabit';
import editHabit from './editHabit';
import reorderHabit from './reorderHabit';

function getUpdatedHabits(habits, { data, mode, habitTitle }) {
	if (mode === 'delete') {
		return deleteHabit(habits, habitTitle);
	};

	const newHabit = {
		title: data.title.value,
		colorIndex: Number(data.colorIndex.value),
		iconTitle: data.iconTitle.value,
		frequency: Number(data.frequency.value),
		completedDays: [],
	};

	if (mode === 'edit') {
		const updatedHabits = editHabit(habits, habitTitle, newHabit);

		// reorder habits
		if (data.order && data.order.value) {
			const newIndex = Number(data.order.value, 10) - 1;
			const currIndex = updatedHabits.findIndex((habit) => {
				return habit.title === data.title.value;
			});

			if (currIndex !== -1 && newIndex !== currIndex) {
				reorderHabit(updatedHabits, newIndex, currIndex);
			};
		};

		return updatedHabits;
	};

	return [newHabit, ...habits];
}

export default getUpdatedHabits;