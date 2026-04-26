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
		habitId: string;
		data: EditHabitFormData;
	};
}

export interface DeleteHabit {
	type: 'deleteHabit';
	payload: {
		habitId: string;
	};
}

export interface ArchiveHabit {
	type: 'archiveHabit';
	payload: {
		habitId: string;
	};
}

export interface UpdateProgress {
	type: 'updateProgress';
	payload: {
		habitId: string;
	};
}

export interface ToggleYesterdayStatus {
	type: 'toggleYesterdayStatus';
	payload: {
		habitId: string;
		isTodayCompleted: boolean;
		isYesterdayCompleted: boolean;
		todayProgress: number;
		frequency: number;
	};
}

export interface AddNote {
	type: 'addNote';
	payload: {
		habitId: string;
		note: Note;
	};
}

export interface EditNote {
	type: 'editNote';
	payload: {
		habitId: string;
		noteCreationDate: Date | string;
		newText: string;
	};
}

export interface DeleteNote {
	type: 'deleteNote';
	payload: {
		habitId: string;
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