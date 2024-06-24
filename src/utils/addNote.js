function addNote(habits, title, newNote) {
	return habits.map(
		(habit) => {
			let modifiedHabit = habit;

			if (habit.title === title) {
				const modifiedDiary = [...(modifiedHabit.diary || [])];
				modifiedDiary.push(newNote);

				modifiedHabit = {
					...modifiedHabit,
					diary: modifiedDiary
				};
			};

			return modifiedHabit;
		}
	);
}

export default addNote;