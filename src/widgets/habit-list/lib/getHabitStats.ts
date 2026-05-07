import { checkHabitCompletion, getStreaks, getTodayProgress, Habit } from '@entities/habit';
import { getYesterday } from '@shared/lib';

/**
 * Get stats for a specific habit.
 * Returns yesterday status, today progress and current streak.
 */
function getHabitStats(habit: Habit) {
	const {
		completedDays,
		frequency
	} = habit;

	const yDay = getYesterday();

	const [isYdayCompleted] = checkHabitCompletion(completedDays, frequency, yDay);
	const { progress: todayProgress } = getTodayProgress({ completedDays, frequency });
	const { currentStreak } = getStreaks(completedDays, frequency);

	return {
		isYdayCompleted,
		todayProgress,
		currentStreak
	};
}

export { getHabitStats };