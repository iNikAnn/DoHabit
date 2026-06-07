import type { DeleteNote, Note } from '../types';

interface DeleteNoteParams {
	notes: Note[];
	payload: DeleteNote['payload'];
}

/**
 * Filter out specified notes by ID.
 */
function deleteNote(params: DeleteNoteParams): Note[] {
	const {
		notes,
		payload: { noteId }
	} = params;

	// Convert string, array, or set into an array for Set constructor
	const idsArray = typeof noteId === 'string'
		? [noteId]
		: Array.from(noteId);

	const targetIds = new Set(idsArray);

	return notes.filter((note) => !targetIds.has(note.id));
}

export { deleteNote };