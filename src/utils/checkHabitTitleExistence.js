function checkHabitTitleExistence(habits, currHabit, input) {
	return Boolean(habits.find(
		(habit) => (
			habit.title === input && !(currHabit?.title || '')
		)
	));
}

export default checkHabitTitleExistence;