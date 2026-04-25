import { Habit } from '../types/habit';

interface Params {
	habits: Habit[];
	payload: {
		habitTitle: string;
		noteCreationDate: Date | string;
	};
}

/**
 * Removes a note from a specific habit's diary.
 */
function deleteHabitDiaryNote(params: Params): Habit[] {
	const {
		habits,
		payload: {
			habitTitle,
			noteCreationDate
		}
	} = params;

	// TODO: Switch to ID-based search once implemented
	return habits.map(
		(habit) => {
			if (habit.title !== habitTitle) return habit;

			const nextDiary = (habit.diary ?? []).filter(
				(note) => note.date !== noteCreationDate
			);

			return {
				...habit,
				diary: nextDiary
			};
		}
	);
}

export default deleteHabitDiaryNote;