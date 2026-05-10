import { DeleteHabitNotes, Note } from '../types';

interface DeleteHabitNotesParams {
	notes: Note[];
	payload: DeleteHabitNotes['payload'];
}

/**
 * Removes all notes associated with a specific habit.
 */
function deleteHabitNotes(params: DeleteHabitNotesParams): Note[] {
	const {
		notes,
		payload: { habitId }
	} = params;

	return notes.filter((note) => note.habitId !== habitId);
}

export { deleteHabitNotes };