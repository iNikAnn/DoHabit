import { DeleteNote, Note } from '../types';

interface DeleteNoteParams {
	notes: Note[];
	payload: DeleteNote['payload'];
}

/**
 * Remove a note from the list.
 */
function deleteNote(params: DeleteNoteParams): Note[] {
	const {
		notes,
		payload: { noteId }
	} = params;

	return notes.filter((note) => note.id !== noteId);
}

export default deleteNote;