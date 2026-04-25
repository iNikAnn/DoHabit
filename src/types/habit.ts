import { Note } from './diary';

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
	creationDate: Date | string;
	completedDays: CompletedDay[];
	diary?: Note[];
	isArchived?: boolean;
}

export interface HabitFormData {
	title: { value: string };
	frequency: { value: string };
	colorIndex: { value: string };
	iconTitle: { value: string };
}

export interface EditHabitFormData extends HabitFormData {
	order: { value: string };
}

// TODO: Replace with habit id
// action types
export interface AddHabit {
	type: 'addHabit';
	payload: {
		data: HabitFormData;
	};
}

export interface EditHabit {
	type: 'editHabit';
	payload: {
		habitTitle: string;
		data: EditHabitFormData;
	};
}

export interface DeleteHabit {
	type: 'deleteHabit';
	payload: {
		habitTitle: string;
	};
}

export interface ArchiveHabit {
	type: 'archiveHabit';
	payload: {
		habitTitle: string;
	};
}

export interface UpdateProgress {
	type: 'updateProgress';
	payload: {
		habitTitle: string;
	};
}

export interface ToggleYesterdayStatus {
	type: 'toggleYesterdayStatus';
	payload: {
		habitTitle: string;
		isTodayCompleted: boolean;
		isYesterdayCompleted: boolean;
		todayProgress: number;
		frequency: number;
	};
}

export interface AddNote {
	type: 'addNote';
	payload: {
		habitTitle: string;
		note: Note;
	};
}

export interface EditNote {
	type: 'editNote';
	payload: {
		habitTitle: string;
		noteCreationDate: Date | string;
		newText: string;
	};
}

export interface DeleteNote {
	type: 'deleteNote';
	payload: {
		habitTitle: string;
		noteCreationDate: Date | string;
	};
}

export type HabitAction =
	| AddHabit
	| EditHabit
	| DeleteHabit
	| ArchiveHabit
	| UpdateProgress
	| ToggleYesterdayStatus
	| AddNote
	| EditNote
	| DeleteNote;

export interface HabitState {
	habits: Habit[];
	habitsDispatch: (action: HabitAction) => void;
}