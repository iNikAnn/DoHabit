function archiveHabit(habits, title) {
	if (title === '' || typeof title !== 'string') {
		throw new Error('A valid habit title must be provided to archive a habit');
	};

	return habits.map(
		(h) => {
			const habit = { ...h };

			if (habit.title === title) {
				habit.isArchived = !habit.isArchived
			};

			return habit;
		}
	);
}

export default archiveHabit;