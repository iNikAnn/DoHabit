import { AchievementRules } from './types';
import { getStreaks, getTodayProgress } from '@entities/habit';
import { countDaysBetween, formatDate } from '@shared/lib';

const habitAhievementRules: AchievementRules<'habit'> = {
	'fresh-start': ({ habits }) => habits.length > 0,

	'main-quest-abandoned': ({ habits }) => habits.some((h) => {
		// Skip if the user actually started working on this habit
		if (h.completedDays.length > 0) return false;

		// Calculate the exact gap between creation date and today
		const gap = countDaysBetween(new Date(h.createdAt), new Date());

		return gap >= 6;
	}),

	'habit-vacation-over': ({ habits }) => habits.some((h) => {
		if (h.completedDays.length < 2) return false;

		const lastDay = h.completedDays.at(0);
		const prevDay = h.completedDays.at(1);

		if (!lastDay || !prevDay) return false;

		const gap = countDaysBetween(new Date(lastDay.date), new Date(prevDay.date));

		return gap >= 21;
	}),

	'ill-be-back': ({ habits }) => {
		// Fast exit: need at least 5 habits
		if (habits.length < 5) return false;

		const archivedCount = habits.reduce(
			(count, h) => count + (h.isArchived ? 1 : 0),
			0
		);

		return archivedCount >= 5;
	},

	'overachiever-day': ({ habits }) => {
		const todayStr = formatDate(new Date());

		const createdTodayCount = habits.reduce(
			(count, h) => count + (formatDate(new Date(h.createdAt)) === todayStr ? 1 : 0),
			0
		);

		// Trigger achievement if 3 or more habits were spawned today
		return createdTodayCount >= 3;
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

	'time-traveler': ({ habits }) => {
		// Calculate total usages of the "Yesterday" button across all habits
		const totalLateCompletions = habits.reduce((acc, h) => {
			if (!h.completedDays) return acc;

			const lateCount = h.completedDays.reduce(
				(count, day) => count + (day.isCompYdayBtnUsed ? 1 : 0),
				0
			);

			return acc + lateCount;
		}, 0);

		return totalLateCompletions >= 5;
	},

	'new-years-resolution': ({ habits }) => habits.some((h) => {
		// Fast exit: if total completed days array is empty
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

const noteAhievementRules: AchievementRules<'note'> = {
	'gravity-falls-journal': ({ notes }) => notes.length >= 7,

	'not-twitter-approved': ({ notes }) => {
		const latestNote = notes.at(-1);
		if (!latestNote) return false;

		return latestNote.text.length > 140;
	},

	'diane-morning-log': ({ notes }) => {
		const latestNote = notes.at(-1);
		if (!latestNote) return false;

		const noteHour = new Date(latestNote.createdAt).getHours();
		return noteHour >= 4 && noteHour <= 8;
	},

	'gotham-protector': ({ notes }) => {
		const latestNote = notes.at(-1);
		if (!latestNote) return false;

		const noteHour = new Date(latestNote.createdAt).getHours();
		return noteHour >= 0 && noteHour <= 3;
	},

	'tolstoy-mode': ({ notes }) => {
		// Fast exit: no need to count characters if there aren't even 100 notes yet
		if (!notes || notes.length < 100) return false;

		// Simple sum run only when it actually makes sense
		const totalChars = notes.reduce((count, n) => count + n.text.length, 0);

		return totalChars >= 10_000;
	}
};

export const achievementRules = {
	...habitAhievementRules,
	...noteAhievementRules
};