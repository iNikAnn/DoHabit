function checkHabitTitleExistence(habits, currHabit, input) {
	return Boolean(habits.find(
		(habit) => (
			habit.title === input && habit.title !== currHabit?.title
		)
	));
}

export default checkHabitTitleExistence;