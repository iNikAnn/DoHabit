import { CheckContext } from './types';
import { AchievementId } from '@entities/achievement';
import { getStreaks, getTodayProgress } from '@entities/habit';
import { formatDate } from '@shared/lib';

export const achievementRules: Record<AchievementId, (ctx: CheckContext) => boolean> = {
	'fresh-start': ({ habits }) => habits.length > 0,

	'ill-be-back': ({ habits }) => {
		// Fast exit: need at least 5 habits
		if (habits.length < 5) return false;

		const archivedCount = habits.filter((h) => h.isArchived).length;

		return archivedCount >= 5;
	},

	'overachiever-day': ({ habits }) => {
		const todayStr = formatDate(new Date());

		// Filter out habits that match today's date format
		const habitsCreatedToday = habits.filter((h) => {
			if (!h.createdAt) return false;
			return formatDate(new Date(h.createdAt)) === todayStr;
		});

		// Trigger achievement if 3 or more habits were spawned today
		return habitsCreatedToday.length >= 3;
	},

	'perfect-day': ({ habits }) => {
		// Fast exit: need at least 3 habits to qualify for a perfect day
		if (!habits || habits.length < 3) return false;

		// Every single habit must be checked off for the current day
		return habits.every((h) => {
			const { isCompleted } = getTodayProgress(h);
			return isCompleted;
		});
	},

	'new-years-resolution': ({ habits }) => habits.some((h) => {
		if (!h.createdAt || h.completedDays.length === 0) return false;

		const creationDate = (new Date(h.createdAt));

		const isCreatedJanFirst = creationDate.getDate() === 1 && creationDate.getMonth() === 0;
		if (!isCreatedJanFirst) return false;

		const janFirstStr = formatDate(creationDate);
		const firstCompletedDay = h.completedDays.at(-1);

		return firstCompletedDay?.date === janFirstStr;
	}),

	'accumulated-year': ({ habits }) => habits.some((h) => h.completedDays && h.completedDays.length >= 365),

	'perfect-year': (({ habits }) => habits.some((h) => {
		// Fast exit: if total completed days are less than a year
		if (!h.completedDays || h.completedDays.length < 365) return false;

		const { allStreaks } = getStreaks(h.completedDays);

		return allStreaks.some((streak) => {
			// Skip small streaks
			if (streak.length < 365) return false;

			const startDate = new Date(streak.start);
			const isStartedJanFirst = startDate.getDate() === 1 && startDate.getMonth() === 0;

			return isStartedJanFirst;
		});
	}))
};