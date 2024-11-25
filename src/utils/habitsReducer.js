// utils
import deleteHabit from './deleteHabit';
import editHabit from './editHabit';
import updateHabitProgress from './updateHabitProgress';

import addNote from './addNote';
import deleteNote from './deleteNote';
import editNote from './editNote';

import archiveHabit from './archiveHabit';
import toggleCompleteYeserday from './toggleCompleteYeserday';
import scrollToTop from './scrollToTop';

import saveToLocalStorage from './saveToLocalStorage';

function habitsReducer(habits, action) {
	const {
		data, habitTitle
	} = action;

	const newHabit = data && {
		title: data.title.value,
		colorIndex: Number(data.colorIndex.value),
		iconTitle: data.iconTitle.value,
		frequency: Number(data.frequency.value),
		completedDays: [],
	};

	switch (action.type) {
		case 'importHabit':
			habits = [...action.importedData];
			break;

		// habits
		case 'addHabit':
			habits = [{ ...newHabit, creationDate: new Date() }, ...habits];
			scrollToTop();
			break;

		case 'deleteHabit':
			habits = deleteHabit(habits, habitTitle);
			break;

		case 'archiveHabit':
			habits = archiveHabit(habits, habitTitle);
			break;

		case 'editHabit':
			habits = editHabit(habits, habitTitle, newHabit, data.order.value - 1);
			break;

		case 'toggleCompleteYeserday':
			habits = toggleCompleteYeserday(habits, habitTitle, action.isTodayCompleted, action.isYesterdayCompleted, action.todayProgress, action.frequency);
			break;

		case 'updateProgress':
			habits = updateHabitProgress(habits, habitTitle);
			break;

		// diary
		case 'addNote':
			habits = addNote(habits, habitTitle, action.newNote);
			break;

		case 'editNote':
			habits = editNote(habits, action.habitTitle, action.noteCreationDate, action.newText);
			break;

		case 'deleteNote':
			habits = deleteNote(habits, habitTitle, action.noteCreationDate);
			break;

		default:
			console.error('Unknown action: ' + action.type);
	};

	saveToLocalStorage('habits', habits);

	return habits;
}

export default habitsReducer;