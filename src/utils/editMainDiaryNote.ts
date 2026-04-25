import { Note } from '../types/diary';

interface Params {
	diary: Note[];
	payload: {
		noteCreationDate: Date | string;
		newText: string;
	}
}

/**
 * Edit a specific note in the main diary.
 */
function editMainDiaryNote(params: Params): Note[] {
	const {
		diary,
		payload: {
			noteCreationDate,
			newText
		}
	} = params;

	return diary.map((note) => {
		if (note.date !== noteCreationDate) return note;

		return {
			...note,
			text: newText
		}
	});
}

export default editMainDiaryNote;