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
		const updatedHabits = currentHabits.map((habit) => {
			if (habit.title === originalHabitTitle) {
				return {
					...newHabit,
					completedDays: [...habit.completedDays]
				};
			};

			return { ...habit };
		});

		if (data.order && data.order.value) {
			const newOrder = parseInt(data.order.value, 10) - 1;
			const currHabitIndex = updatedHabits.findIndex((habit) => {
				return habit.title === data.title.value;
			});

			if (currHabitIndex !== -1) {
				const currHabit = updatedHabits[currHabitIndex];

				if (currHabitIndex !== newOrder && newOrder >= 0 && newOrder < updatedHabits.length) {
					updatedHabits.splice(currHabitIndex, 1);
					updatedHabits.splice(newOrder, 0, currHabit);
				};
			};
		};

		return updatedHabits;
	};

	return [newHabit, ...currentHabits];
}

export default getUpdatedHabits;