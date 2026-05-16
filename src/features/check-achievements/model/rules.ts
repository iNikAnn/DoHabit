import { CheckContext } from './types';
import { AchievementId } from '@entities/achievement';
import { getStreaks } from '@entities/habit';
import { formatDate } from '@shared/lib';

export const achievementRules: Record<AchievementId, (ctx: CheckContext) => boolean> = {
	'fresh-start': ({ habits }) => habits.length > 0,

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