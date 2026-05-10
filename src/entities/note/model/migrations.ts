export const noteMigrations: Record<number, (state: any) => any> = {
	0: (state) => state,
	1: migrateToV1
};

/**
 * Migration v1:
 * - Merges legacy notes from 'habits' store into the main list.
 * - Adds unique 'id' to each note.
 * - Renames 'creationDate' to 'createdAt' and converts it to Unix timestamp (number).
 */
function migrateToV1(state: any) {
	const rawHabits = localStorage.getItem('dohabit-habits-storage');

	// Default fallback state
	const currentState = { ...state, notes: state?.notes ?? [] };

	try {
		if (!rawHabits) return currentState;

		const habitsData = JSON.parse(rawHabits);
		const habits = habitsData?.state?.habits ?? [];

		// Extract notes from all habits
		const habitNotes = habits.flatMap((h: any) => {
			if (!Array.isArray(h.diary)) return [];

			return h.diary.map((note: any) => ({ ...note, habitId: h.id }));
		});

		// Merge, transform and fix structure
		const mergedNotes = [...habitNotes, ...currentState.notes];

		const processedNotes = mergedNotes
			.map((n: any) => {
				const nextNote = {
					...n,
					id: crypto.randomUUID(),
					createdAt: typeof n.date === 'string'
						? new Date(n.date).getTime()
						: Date.now()
				};

				delete nextNote.date;
				return nextNote;
			})
			.sort((a, b) => a.createdAt - b.createdAt);

		localStorage.setItem('dohabit_notes_migrated', 'true');

		return {
			...state,
			notes: processedNotes
		};
	} catch (error) {
		console.error('Notes migration v1 failed:', error);
		return currentState;
	}
}