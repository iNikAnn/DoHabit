function createHabit(currentHabits, newData) {
	const newHabit = {
		title: newData.title.value,
		color: newData.color.value,
		completedDays: [],
	};

	return [newHabit, ...currentHabits];
}

export default createHabit;