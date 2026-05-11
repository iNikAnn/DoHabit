import { getStreaks, getTodayProgress, Habit, isYesterdayCompleted } from '@entities/habit';

/**
 * Get stats for a specific habit.
 * Returns yesterday status, today progress and current streak.
 */
function getHabitStats(habit: Habit) {
	const {
		completedDays,
		frequency
	} = habit;

	const isYdayCompleted = isYesterdayCompleted(completedDays);
	const { progress: todayProgress } = getTodayProgress({ completedDays, frequency });
	const { currentStreak } = getStreaks(completedDays, frequency);

	return {
		isYdayCompleted,
		todayProgress,
		currentStreak
	};
}

export { getHabitStats };