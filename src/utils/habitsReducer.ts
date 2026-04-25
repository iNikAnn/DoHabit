// types
import { Habit, HabitAction } from '../types/habit';

// utils
import addHabit from './addHabit';
import editHabit from './editHabit';
import deleteHabit from './deleteHabit';
import archiveHabit from './archiveHabit';
import updateHabitProgress from './updateHabitProgress';
import toggleYesterdayStatus from './toggleYesterdayStatus';

import addHabitDiaryNote from './addHabitDiaryNote';
import editHabitDiaryNote from './editHabitDiaryNote';
import deleteHabitDiaryNote from './deleteHabitDiaryNote';

import saveToLocalStorage from './saveToLocalStorage';

function habitsReducer(habits: Habit[], { type, payload }: HabitAction): Habit[] {
	let nextHabits: Habit[] = [];

	switch (type) {
		// habits
		case 'addHabit':
			nextHabits = addHabit({ habits, payload });
			break;

		case 'editHabit':
			nextHabits = editHabit({ habits, payload });
			break;

		case 'deleteHabit':
			nextHabits = deleteHabit({ habits, payload });
			break;

		case 'archiveHabit':
			nextHabits = archiveHabit({ habits, payload });
			break;

		case 'updateProgress':
			nextHabits = updateHabitProgress({ habits, payload });
			break;

		case 'toggleYesterdayStatus':
			nextHabits = toggleYesterdayStatus({ habits, payload });
			break;

		// diary
		case 'addNote':
			nextHabits = addHabitDiaryNote({ habits, payload });
			break;

		case 'editNote':
			nextHabits = editHabitDiaryNote({ habits, payload });
			break;

		case 'deleteNote':
			nextHabits = deleteHabitDiaryNote({ habits, payload });
			break;

		default:
			const _exhaustiveCheck: never = type;
			console.error('Unknown action type.');
			return _exhaustiveCheck;
	}

	saveToLocalStorage('habits', nextHabits);

	return nextHabits;
}

export default habitsReducer;
