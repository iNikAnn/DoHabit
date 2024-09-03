function mainDiaryReducer(diary, actions) {
	let newDiary = [...diary];

	switch (actions.type) {
		case 'addNote':
			newDiary.push(actions.newNote);
			break;

		case 'deleteNote':
			newDiary = newDiary.filter(
				(n) => n.date !== actions.noteCreationDate
			);
			break;

		default:
			break;
	};

	return newDiary;
}

export default mainDiaryReducer;