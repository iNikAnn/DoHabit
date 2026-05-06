import { DeleteNote, Note } from '../types';

interface DeleteNoteParams {
	diary: Note[];
	payload: DeleteNote['payload'];
}

/**
 * Remove a note from the diary.
 */
function deleteNote(params: DeleteNoteParams): Note[] {
	const {
		diary,
		payload: { noteId }
	} = params;

	return diary.filter((note) => note.id !== noteId);
}

export default deleteNote;