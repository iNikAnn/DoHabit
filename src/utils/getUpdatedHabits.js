// utils
import deleteHabit from './deleteHabit';
import editHabit from './editHabit';
import reorderHabit from './reorderHabit';

function getUpdatedHabits(habits, { data, mode, habitTitle }) {
	let updatedHabits = [...habits];

	const newHabit = data ? {
		title: data.title.value,
		colorIndex: Number(data.colorIndex.value),
		iconTitle: data.iconTitle.value,
		frequency: Number(data.frequency.value),
		completedDays: [],
	} : null;

	switch (mode) {
		case 'delete':
			updatedHabits = deleteHabit(updatedHabits, habitTitle);
			break;

		case 'edit':
			updatedHabits = editHabit(updatedHabits, habitTitle, newHabit);

			// reorder habits
			const newIndex = Number(data.order.value, 10) - 1;
			const currIndex = updatedHabits.findIndex((habit) => (
				habit.title === data.title.value
			));

			if (currIndex !== -1 && newIndex !== currIndex) {
				updatedHabits = reorderHabit(updatedHabits, newIndex, currIndex);
			};
			break;

		default:
			updatedHabits = [newHabit, ...updatedHabits];
			break;
	};

	return updatedHabits;
}

export default getUpdatedHabits;