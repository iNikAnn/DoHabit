import { getCompletedDatesSet, getStreaks, getTodayProgress, Habit } from '@entities/habit';
import { formatDate, getYesterday } from '@shared/lib';

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

	const isYdayCompleted = getCompletedDatesSet(completedDays, frequency, yDay).has(formatDate(yDay));
	const { progress: todayProgress } = getTodayProgress({ completedDays, frequency });
	const { currentStreak } = getStreaks(completedDays, frequency);

	return {
		isYdayCompleted,
		todayProgress,
		currentStreak
	};
}

export { getHabitStats };