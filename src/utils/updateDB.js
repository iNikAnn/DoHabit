function updateDB(data, dbColors) {
	return JSON.parse(data).map((habit) => {
		let updatedHabit = { ...habit };

		// update color
		if (habit.color) {
			const colorIndex = Math.max(0, dbColors.indexOf(habit.color));

			delete updatedHabit.color;
			updatedHabit.colorIndex = colorIndex;
		};

		// add frequency
		if (!habit.frequency) {
			updatedHabit.frequency = 1;
		};

		return updatedHabit;
	});
}

export default updateDB;