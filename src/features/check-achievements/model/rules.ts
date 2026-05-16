import { CheckContext } from './types';
import { AchievementId } from '@entities/achievement';
import { formatDate } from '@shared/lib';

export const achievementRules: Record<AchievementId, (ctx: CheckContext) => boolean> = {
	'fresh-start': ({ habits }) => habits.length > 0,

	'new-years-resolution': ({ habits }) => habits.some((h) => {
		if (!h.createdAt || !h.completedDays.length) return false;

		const creationDate = (new Date(h.createdAt));

		const isCreatedJanFirst = creationDate.getDate() === 1 && creationDate.getMonth() === 0;
		if (!isCreatedJanFirst) return false;

		const janFirstStr = formatDate(creationDate);
		const firstCompletedDay = h.completedDays.at(-1);

		return firstCompletedDay?.date === janFirstStr;
	})
};