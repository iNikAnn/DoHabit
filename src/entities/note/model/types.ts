export interface Note {
	id: string;

	/** Optional ID of the habit this note belongs to */
	habitId?: string;

	text: string;

	/** Current streak at the time of note creation */
	streak?: number;

	/** Creation time as a Unix timestamp (ms) */
	createdAt: number;
}

// actions
export interface AddNote {
	type: 'addNote';
	payload: {
		note: Note;
	};
}

export interface EditNote {
	type: 'editNote';
	payload: {
		noteId: string;
		newText: string;
	};
}

export interface DeleteNote {
	type: 'deleteNote';
	payload: {
		noteId: string;
	};
}

export type DiaryAction =
	| AddNote
	| EditNote
	| DeleteNote;

export interface DiaryState {
	diary: Note[];
	diaryDispatch: (action: DiaryAction) => void;
}