export interface Note {
	text: string;
	date: string;

	/** Current streak at the time of note creation */
	streak?: number;
}

export interface MainDiaryAction {

}

export interface MainDiaryState {
	mainDiary: Note[];
	mainDiaryDispatch: (action: MainDiaryAction) => void;
}