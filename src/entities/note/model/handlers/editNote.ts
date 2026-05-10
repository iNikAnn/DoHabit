import { EditNote, Note } from '../types';

interface EditNoteParams {
	notes: Note[];
	payload: EditNote['payload'];
}

/**
 * Edit a specific note.
 */
function editNote(params: EditNoteParams): Note[] {
	const {
		notes,
		payload: {
			noteId,
			newText
		}
	} = params;

	return notes.map((note) => {
		if (note.id !== noteId) return note;

		return {
			...note,
			text: newText
		}
	});
}

export { editNote };