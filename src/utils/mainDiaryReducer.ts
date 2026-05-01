// types
import { MainDiaryAction, Note } from '../types/diary';

// utils
import editNote from './editNote';
import deleteNote from './deleteNote';
import { writeLocalStorage } from '@shared/lib/utils';

function mainDiaryReducer(diary: Note[], { type, payload }: MainDiaryAction) {
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

export default mainDiaryReducer;