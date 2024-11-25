function archiveHabit(habits, title) {
	if (title === '' || typeof title !== 'string') {
		throw new Error('A valid habit title must be provided to archive a habit');
	};

	return habits
		.map(
			(h) => {
				const habit = { ...h };

				if (habit.title === title) {
					habit.isArchived = !habit.isArchived
				};

				return habit;
			}
		)
		// Sort archived habits to the end of the list
		.sort(
			(a, b) => {
				if (a.isArchived && !b.isArchived) return 1;
				if (!a.isArchived && b.isArchived) return -1;
				return 0;
			}
		);
}

export default archiveHabit;