function getUpdatedHabits(currentHabits, data, mode, originalHabitTitle) {
	if (mode === 'delete') {
		return currentHabits.filter((habit) => {
			return habit.title !== originalHabitTitle;
		});
	};

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

export default getUpdatedHabits;