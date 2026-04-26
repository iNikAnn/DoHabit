import { Note } from '../types/diary';

interface Params {
	diary: Note[];
	payload: {
		noteCreationDate: Date | string;
	}
}

/**
 * Remove a note from the main diary.
 */
function deleteNote(params: Params): Note[] {
	const {
		diary,
		payload: { noteCreationDate }
	} = params;

	// TODO: Switch to ID-based search once implemented
	return diary.filter((note) => note.date !== noteCreationDate);
}

export default deleteNote;