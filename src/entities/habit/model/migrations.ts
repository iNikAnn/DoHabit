export const habitMigrations: Record<number, (state: any) => any> = {
	0: (state) => state,
	1: migrateToV1
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