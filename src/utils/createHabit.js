function createHabit(currentHabits, newData) {
	const newHabit = {
		title: newData.title.value,
		completedDays: []
	};

	return [newHabit, ...currentHabits];
}

export default createHabit;