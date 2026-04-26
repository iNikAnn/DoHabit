import { Note } from '../types/diary';

interface Params {
	diary: Note[];
	payload: {
		noteCreationDate: Date | string;
		newText: string;
	}
}

/**
 * Edit a specific note in the diary.
 */
function editNote(params: Params): Note[] {
	const {
		diary,
		payload: {
			noteCreationDate,
			newText
		}
	} = params;

	// TODO: Switch to ID-based search once implemented
	return diary.map((note) => {
		if (note.date !== noteCreationDate) return note;

		return {
			...note,
			text: newText
		}
	});
}

export default editNote;