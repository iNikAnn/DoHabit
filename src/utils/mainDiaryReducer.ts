import { MainDiaryAction, Note } from '../types/diary';
import deleteMainDiaryNote from './deleteMainDiaryNote';
import editMainDiaryNote from './editMainDiaryNote';

// utils
import saveToLocalStorage from './saveToLocalStorage';

function mainDiaryReducer(diary: Note[], { type, payload }: MainDiaryAction) {
	let nextDiary = [...diary];

	switch (type) {
		case 'addNote':
			nextDiary.push(payload.note);
			break;

		case 'editNote':
			nextDiary = editMainDiaryNote({ diary, payload });
			break;

		case 'deleteNote':
			nextDiary = deleteMainDiaryNote({ diary, payload });
			break;

		default:
			const _exhaustiveCheck: never = type;
			console.error('Unknown action type.');
			return _exhaustiveCheck;
	}

	saveToLocalStorage('mainDiary', nextDiary);

	return nextDiary;
}

export default mainDiaryReducer;