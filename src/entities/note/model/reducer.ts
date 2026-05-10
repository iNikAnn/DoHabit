import { NoteAction, Note } from './types';
import editNote from './handlers/editNote';
import deleteNote from './handlers/deleteNote';

/**
 * Main reducer for the Diary notes.
 */
function notesReducer(notes: Note[], { type, payload }: NoteAction): Note[] {
	switch (type) {
		case 'addNote':
			return [...notes, payload.note];

		case 'editNote':
			return editNote({ notes, payload });

		case 'deleteNote':
			return deleteNote({ notes, payload });

		default:
			const _exhaustiveCheck: never = type;
			console.error('Unknown action type.');
			return _exhaustiveCheck;
	}
}

export { notesReducer };