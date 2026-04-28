export interface Note {
	text: string;
	date: string;

	/** Current streak at the time of note creation */
	streak?: number;
}

export interface AddNote {
	type: 'addNote';
	payload: {
		note: Note;
	};
}

export interface EditNote {
	type: 'editNote';
	payload: {
		noteCreationDate: Date | string;
		newText: string;
	};
}

export interface DeleteNote {
	type: 'deleteNote';
	payload: {
		noteCreationDate: Date | string;
	};
}

export type MainDiaryAction =
	| AddNote
	| EditNote
	| DeleteNote;

export interface MainDiaryState {
	mainDiary: Note[];
	mainDiaryDispatch: (action: MainDiaryAction) => void;
}