import { NoteAction, Note } from './types';
import editNote from './handlers/editNote';
import deleteNote from './handlers/deleteNote';
import { writeLocalStorage } from '@shared/lib';

function notesReducer(diary: Note[], { type, payload }: NoteAction) {
	let nextDiary = [...diary];

	switch (type) {
		case 'addNote':
			nextDiary.push(payload.note);
			break;

		case 'editNote':
			nextDiary = editNote({ diary, payload });
			break;

		case 'deleteNote':
			nextDiary = deleteNote({ diary, payload });
			break;

		default:
			const _exhaustiveCheck: never = type;
			console.error('Unknown action type.');
			return _exhaustiveCheck;
	}

	writeLocalStorage('mainDiary', nextDiary);

	return nextDiary;
}

export { notesReducer };