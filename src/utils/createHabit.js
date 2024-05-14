function createHabit(currentHabits, data, mode, originalHabitTitle) {
	const newHabit = {
		title: data.title.value,
		color: data.color.value,
		iconTitle: data.iconTitle.value,
		completedDays: [],
	};

	if (mode === 'edit') {
		return currentHabits.map((habit) => {
			if (habit.title === originalHabitTitle) {
				return {
					...newHabit,
					completedDays: [...habit.completedDays]
				};
			};

			return { ...habit };
		});
	};

	return [newHabit, ...currentHabits];
}

export default createHabit;