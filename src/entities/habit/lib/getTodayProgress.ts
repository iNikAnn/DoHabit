import { Habit } from '../model/types';
import { formatDate } from '@shared/lib';

interface HabitProgress {
	today: string;
	progress: number;
	percentage: number;
	isCompleted: boolean;
}

/**
 * Calculates current day progress based on habit frequency.
 * Resets to zero if lastActivityDate is not today.
 */
function getTodayProgress(habit: Habit): HabitProgress {
	const {
		frequency,
		currentProgress,
		lastActivityDate
	} = habit;

	const today = formatDate(new Date());

	// If latest activity was on a different day, progress is 0
	if (lastActivityDate !== today) {
		return {
			today,
			progress: 0,
			percentage: 0,
			isCompleted: false
		};
	}

	return {
		today,
		progress: currentProgress,
		percentage: Math.floor((currentProgress / frequency) * 100),
		isCompleted: currentProgress >= frequency
	};
}

export { getTodayProgress };