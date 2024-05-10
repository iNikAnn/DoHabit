function createHabit(currentHabits, newData) {
	const newHabit = {
		title: newData.title.value
	};

	return [newHabit, ...currentHabits];
}

export default createHabit;