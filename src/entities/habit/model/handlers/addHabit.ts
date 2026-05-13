import { AddHabit, Habit } from '../types';
import mapHabitData from '../../lib/mapHabitData';
import { formatDate } from '@shared/lib';

interface AddHabitParams {
	habits: Habit[];
	payload: AddHabit['payload'];
}

/**
 * Adds a new habit to the beginning of the list.
 */
function addHabit(params: AddHabitParams): Habit[] {
	const {
		habits,
		payload: { data }
	} = params;

	const now = new Date();

	const newHabit: Habit = {
		id: crypto.randomUUID(),
		...mapHabitData(data),
		completedDays: [],
		currentProgress: 0,
		lastActivityDate: formatDate(now),
		createdAt: now.getTime()
	};

	return [newHabit, ...habits];
}

export default addHabit;