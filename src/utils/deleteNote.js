function deleteNote(habits, title, noteCreationDate) {
	return habits.map(
		(habit) => {
			let updatedHabit = habit;

			if (habit.title === title) {
				const updatedDiary = habit.diary.filter(
					(note) => note.date !== noteCreationDate
				);

				updatedHabit = {
					...updatedHabit,
					diary: updatedDiary
				};
			};

			return updatedHabit;
		}
	);
}

export default deleteNote;