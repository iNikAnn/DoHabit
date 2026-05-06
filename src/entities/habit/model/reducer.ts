import { Habit, HabitAction } from './types';
import addHabit from './handlers/addHabit';
import editHabit from './handlers/editHabit';
import deleteHabit from './handlers/deleteHabit';
import archiveHabit from './handlers/archiveHabit';
import updateHabitProgress from './handlers/updateHabitProgress';
import toggleYesterdayStatus from './handlers/toggleYesterdayStatus';
import { writeLocalStorage } from '@shared/lib';

/**
 * Main habit reducer.
 * Routes actions to specific handler functions.
 */
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

		default:
			const _exhaustiveCheck: never = type;
			console.error('Unknown action type.');
			return _exhaustiveCheck;
	}

	writeLocalStorage('habits', nextHabits);

	return nextHabits;
}

export default habitsReducer;