import { EditNote, Note } from '../types';

interface EditNoteParams {
	diary: Note[];
	payload: EditNote['payload'];
}

/**
 * Edit a specific note in the diary.
 */
function editNote(params: EditNoteParams): Note[] {
	const {
		diary,
		payload: {
			noteId,
			newText
		}
	} = params;

	return diary.map((note) => {
		if (note.id !== noteId) return note;

		return {
			...note,
			text: newText
		}
	});
}

export default editNote;