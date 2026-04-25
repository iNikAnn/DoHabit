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


// action types
export interface AddHabit {
	type: 'addHabit';
	payload: HabitFormData;
}

export interface EditHabit {
	type: 'editHabit';

	// TODO: Replace with habit id
	habitTitle: string;

	payload: EditHabitFormData;
}

export interface DeleteHabit {
	type: 'deleteHabit';
	habitTitle: string;
}

export interface ArchiveHabit {
	type: 'archiveHabit';
	habitTitle: string;
}

export type HabitAction =
	| AddHabit
	| EditHabit
	| DeleteHabit
	| ArchiveHabit;

export interface HabitState {
	habits: Habit[];
	habitsDispatch: (context: HabitAction) => void;
}