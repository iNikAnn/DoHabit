import { Habit } from '../types/habit';

interface Params {
	habits: Habit[];
	payload: {
		habitTitle: string;
		noteCreationDate: Date | string;
		newText: string;
	};
}

/**
 * Updates the text of a specific note within a habit's diary.
 */
function editNote(params: Params): Habit[] {
	const {
		habits,
		payload: {
			habitTitle,
			noteCreationDate,
			newText
		}
	} = params;

	// TODO: Switch to ID-based search once implemented
	return habits.map(
		(habit) => {
			if (habit.title !== habitTitle) return habit;

			const nextDiary = (habit.diary ?? []).map(
				(note) => {
					if (note.date !== noteCreationDate) return note;

					return {
						...note,
						text: newText
					};
				}
			);

			return {
				...habit,
				diary: nextDiary
			};
		}
	);
}

export default editNote;