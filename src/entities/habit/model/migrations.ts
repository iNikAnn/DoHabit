import { formatDate } from '@shared/lib';

export const habitMigrations: Record<number, (state: any) => any> = {
	0: (state) => state,
	1: migrateToV1,
	2: migrateToV2
};

/**
 * Migration v1:
 * - Adds unique 'id' to each habit.
 * - Renames 'creationDate' to 'createdAt' and converts it to Unix timestamp (number).
 */
function migrateToV1(state: any): any {
	return {
		...state,
		habits: state.habits.map((h: any) => {
			const nextHabit = {
				...h,
				id: crypto.randomUUID(),
				createdAt: typeof h.creationDate === 'string'
					? new Date(h.creationDate).getTime()
					: Date.now()
			};

			delete nextHabit.creationDate;
			return nextHabit;
		})
	};
}

/**
 * Migration v2:
 * - Adds progress fields.
 * - Cleans up the history array.
 */
function migrateToV2(state: any): any {
	const todayStr = formatDate(new Date());

	return {
		...state,
		habits: state.habits.map((h: any) => {
			// Get legacy data for today if exists
			const oldTodayEntry = h.completedDays.find((d: any) => d.date === todayStr);

			// Extract last activity date from the very first entry in history
			const lastActivityDate = h.completedDays[0]?.date ?? '';

			// Clean history: only full days, no progress field
			const nextCompletedDays = h.completedDays
				.filter((d: any) => d.progress >= h.frequency)
				.map((d: any) => {
					const { progress, ...rest } = d; // remove progress field
					return rest;
				});

			return {
				...h,
				currentProgress: oldTodayEntry ? (oldTodayEntry.progress ?? 0) : 0,
				lastActivityDate,
				completedDays: nextCompletedDays
			};
		})
	};
}