function deleteHabit(habits, title) {
	if (title === '' || typeof title !== 'string') {
		throw new Error('A valid habit title must be provided to delete a habit');
	};

	return habits.filter(
		(habit) => (
			habit.title !== title
		)
	);
}

export default deleteHabit;