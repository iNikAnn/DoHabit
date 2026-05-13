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
			isTodayCompleted
		}
	} = params;

	const yDayStr = formatDate(getYesterday());

	return updateHabitById(habits, habitId, (habit) => {
		if (isYdayCompleted) {
			// If today is finished, it's at [0], so yesterday is at [1].
			// Otherwise, yesterday is at [0].
			const targetIndex = isTodayCompleted ? 1 : 0;

			// Remove yesterday entry
			return {
				...habit,
				// @ts-ignore
				completedDays: habit.completedDays.toSpliced(targetIndex, 1)
			};
		}

		// New record for yesterday
		const completedYday: CompletedDay = {
			date: yDayStr,
			isCompYdayBtnUsed: true
		};

		// Determine insertion index: 1 if today has record, otherwise 0
		const insertIndex = isTodayCompleted ? 1 : 0;

		return {
			...habit,
			// @ts-ignore
			completedDays: habit.completedDays.toSpliced(insertIndex, 0, completedYday)
		};
	});
}

export default toggleYesterdayStatus;