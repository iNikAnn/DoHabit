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
function deleteMainDiaryNote(params: Params): Note[] {
	const {
		diary,
		payload: { noteCreationDate }
	} = params;

	return diary.filter((note) => note.date !== noteCreationDate);
}

export default deleteMainDiaryNote;