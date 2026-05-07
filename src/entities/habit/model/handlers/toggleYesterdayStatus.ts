import { Habit, CompletedDay, ToggleYesterdayStatus } from '../types';
import updateHabitById from '../../lib/updateHabitById';
import { formatDate, getYesterday } from '@shared/lib';

interface Params {
	habits: Habit[];
	payload: ToggleYesterdayStatus['payload'];
}

/**
 * Toggle completion status for the previous day.
 */
function toggleYesterdayStatus(params: Params): Habit[] {
	const {
		habits,
		payload: {
			habitId,
			isYdayCompleted,
			todayProgress
		}
	} = params;

	const yDayStr = formatDate(getYesterday());

	return updateHabitById(habits, habitId, (habit) => {
		if (isYdayCompleted) {
			// Remove yesterday entry
			return {
				...habit,
				completedDays: habit.completedDays.filter(
					(day) => day.date !== yDayStr
				)
			};
		}

		// New record for yesterday
		const completedYday: CompletedDay = {
			date: yDayStr,
			progress: habit.frequency,
			isCompYdayBtnUsed: true
		};

		// Determine insertion index: 1 if today has record, otherwise 0
		const insertIndex = todayProgress ? 1 : 0;

		return {
			...habit,
			// @ts-ignore
			completedDays: habit.completedDays.toSpliced(insertIndex, 0, completedYday)
		};
	});
}

export default toggleYesterdayStatus;