import type { AddHabit, Habit } from '../types';
import mapHabitData from '../../lib/mapHabitData';
import { formatDate } from '@shared/lib/date-time';

interface AddHabitParams {
	habits: Habit[];
	payload: AddHabit['payload'];
}

const isDev = import.meta.env.DEV;

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
		id: isDev ? String(Math.random()) : crypto.randomUUID(),
		...mapHabitData(data),
		completedDays: [],
		currentProgress: 0,
		lastActivityDate: formatDate(now),
		createdAt: now.getTime()
	};

	return [newHabit, ...habits];
}

export default addHabit;