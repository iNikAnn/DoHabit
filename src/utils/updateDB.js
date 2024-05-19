function updateDB(data, dbColors) {
	return JSON.parse(data).map((habit) => {
		if (habit.color) {
			const colorIndex = Math.max(0, dbColors.indexOf(habit.color));

			delete habit.color;

			return {
				...habit,
				colorIndex: colorIndex
			};
		};

		return { ...habit };
	});
}

export default updateDB;