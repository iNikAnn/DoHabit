function editNote(habits, title, noteCreationDate, newText) {
	return habits.map(
		(habit) => {
			let updatedHabit = habit;

			if (habit.title === title) {
				const updatedDiary = habit.diary.map(
					(note) => {
						let updatedNote = note;

						if (note.date === noteCreationDate) {
							updatedNote.text = newText;
						};

						return updatedNote;
					}
				);

				updatedHabit = {
					...updatedHabit,
					diary: updatedDiary
				}
			};

			return updatedHabit;
		}
	);
}

export default editNote;