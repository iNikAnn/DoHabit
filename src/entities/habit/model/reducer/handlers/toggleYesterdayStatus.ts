import { Habit, CompletedDay, ToggleYesterdayStatus } from '../../types';
import updateHabitById from '../../../lib/updateHabitById';
import { formatDate } from '@shared/lib';

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
			isTodayCompleted,
			isYesterdayCompleted,
			todayProgress
		}
	} = params;

	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	const yDayStr = formatDate(yesterday);

	return updateHabitById(habits, habitId, (habit) => {
		if (isYesterdayCompleted) {
			// Remove yesterday entry
			return {
				...habit,
				completedDays: habit.completedDays.filter(
					(day) => day.date !== yDayStr
				)
			};
		}

		// New record for yesterday
		const completedYesterday: CompletedDay = {
			date: yDayStr,
			progress: habit.frequency,
			isCompYdayBtnUsed: true
		};

		// Determine insertion index: 1 if today has record, otherwise 0
		const insertIndex = (isTodayCompleted || todayProgress) ? 1 : 0;

		return {
			...habit,
			// @ts-ignore
			completedDays: habit.completedDays.toSpliced(insertIndex, 0, completedYesterday)
		};
	});
}

export default toggleYesterdayStatus;