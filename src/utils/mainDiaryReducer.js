// utils
import saveToLocalStorage from './saveToLocalStorage';

function mainDiaryReducer(diary, actions) {
	let newDiary = [...diary];

	switch (actions.type) {
		case 'addNote':
			newDiary.push(actions.newNote);
			break;

		case 'editNote':
			newDiary.map(
				(note) => {
					let updatedNote = note;

					if (note.date === actions.noteCreationDate) {
						updatedNote.text = actions.newText;
					};

					return updatedNote;
				}
			);
			break;

		case 'deleteNote':
			newDiary = newDiary.filter(
				(n) => n.date !== actions.noteCreationDate
			);
			break;

		default:
			break;
	};

	saveToLocalStorage('mainDiary', newDiary);

	return newDiary;
}

export default mainDiaryReducer;