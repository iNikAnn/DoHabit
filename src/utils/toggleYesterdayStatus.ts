// types
import { CompletedDay, Habit } from '../types/habit';

// utils
import getFormattedDate from './getFormattedDate';

interface Params {
	habits: Habit[];
	payload: {
		habitTitle: string;
		isTodayCompleted: boolean;
		isYesterdayCompleted: boolean;
		todayProgress: number;
		frequency: number;
	}
}

/**
 * Toggle completion status for the previous day.
 */
function toggleYesterdayStatus(params: Params): Habit[] {
	const {
		habits,
		payload: {
			habitTitle,
			isTodayCompleted,
			isYesterdayCompleted,
			todayProgress
		}
	} = params;

	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	const yDayStr = getFormattedDate(yesterday);

	return habits.map((habit) => {
		if (habit.title !== habitTitle) return habit;

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
			completedDays: habit.completedDays.toSpliced(insertIndex, 0, completedYesterday)
		};
	});
}

export default toggleYesterdayStatus;