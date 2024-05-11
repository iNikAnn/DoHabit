function createHabit(currentHabits, data) {
	const newHabit = {
		title: data.title.value,
		color: data.color.value,
		iconTitle: data.iconTitle.value,
		completedDays: [],
	};

	return [newHabit, ...currentHabits];
}

export default createHabit;