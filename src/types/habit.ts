export interface Note {
	text: string;
	date: string;

	/** Current streak at the time of note creation */
	streak?: number;
}

export interface CompletedDay {
	date: string;
	progress: number;
	isCompYdayBtnUsed?: boolean;
}

export interface Habit {
	title: string;
	colorIndex: number;
	iconTitle: string;
	frequency: number;
	creationDate: string;
	completedDays: CompletedDay[];
	diary: Note[];
	isArchived: boolean;
}