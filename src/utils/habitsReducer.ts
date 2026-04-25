// types
import { Habit, HabitAction } from '../types/habit';

// utils
import mapHabitData from './mapHabitData';
import deleteHabit from './deleteHabit';
import editHabit from './editHabit';
import updateHabitProgress from './updateHabitProgress';
import toggleYesterdayStatus from './toggleYesterdayStatus';

import addNote from './addNote';
import deleteNote from './deleteNote';
import editNote from './editNote';

import archiveHabit from './archiveHabit';
import scrollToTop from './scrollToTop';

import saveToLocalStorage from './saveToLocalStorage';

function habitsReducer(habits: Habit[], action: HabitAction): Habit[] {
	switch (action.type) {
		// habits
		case 'addHabit':
			habits = [
				{
					...mapHabitData(action.payload),
					creationDate: new Date(),
					completedDays: []
				},
				...habits
			];

			// TODO: remove
			scrollToTop();
			break;

		case 'editHabit':
			habits = editHabit({
				habits,
				title: action.habitTitle,
				data: action.payload,
			});
			break;

		case 'deleteHabit':
			habits = deleteHabit({ habits, title: action.habitTitle });
			break;

		case 'archiveHabit':
			habits = archiveHabit({ habits, title: action.habitTitle });
			break;

		case 'updateProgress':
			habits = updateHabitProgress({ habits, title: action.habitTitle });
			break;

		case 'toggleYesterdayStatus':
			habits = toggleYesterdayStatus({ habits, payload: action.payload });
			break;

		// diary
		case 'addNote':
			habits = addNote({
				habits,
				habitTitle: action.habitTitle,
				note: action.payload.note
			});
			break;

		case 'editNote':
			habits = editNote({
				habits,
				habitTitle: action.habitTitle,
				noteCreationDate: action.noteCreationDate,
				newText: action.payload.newText
			});
			break;

		case 'deleteNote':
			habits = deleteNote({
				habits,
				habitTitle: action.habitTitle,
				noteCreationDate: action.noteCreationDate
			});
			break;

		default:
			const _exhaustiveCheck: never = action;
			console.error('Unknown action');
			return _exhaustiveCheck;
	};

	saveToLocalStorage('habits', habits);

	return habits;
}

export default habitsReducer;
