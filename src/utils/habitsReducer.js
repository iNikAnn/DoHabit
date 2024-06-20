// utils
import deleteHabit from './deleteHabit';
import editHabit from './editHabit';
import updateHabitProgress from './updateHabitProgress';
import createNote from './createNote';
import deleteNote from './deleteNote';

function habitsReducer(habits, action) {
	const {
		data, habitTitle
	} = action;

	let updatedHabits = [...habits];

	const newHabit = data
		? {
			title: data.title.value,
			colorIndex: Number(data.colorIndex.value),
			iconTitle: data.iconTitle.value,
			frequency: Number(data.frequency.value),
			completedDays: [],
		}
		: null;

	switch (action.type) {
		case 'addHabit':
			updatedHabits = [newHabit, ...updatedHabits];
			break;

		case 'deleteHabit':
			updatedHabits = deleteHabit(updatedHabits, habitTitle);
			break;

		case 'editHabit':
			updatedHabits = editHabit(updatedHabits, habitTitle, newHabit, data.order.value - 1);
			break;

		case 'addNote':
			updatedHabits = createNote(updatedHabits, habitTitle, action.newNote);
			break;

		case 'deleteNote':
			updatedHabits = deleteNote(updatedHabits, habitTitle, action.noteCreationDate);
			break;

		case 'updateProgress':
			updatedHabits = updateHabitProgress(updatedHabits, habitTitle);
			break;

		default:
			throw new Error('Unknown action: ' + action.type);
	};

	return updatedHabits;
}

export default habitsReducer;