function reorderHabit([...habits], newIndex, currIndex) {
	const currHabit = habits[currIndex];

	if (currIndex !== newIndex && newIndex >= 0 && newIndex < habits.length) {
		habits.splice(currIndex, 1);
		habits.splice(newIndex, 0, currHabit);
	};

	return habits;
}

export default reorderHabit;