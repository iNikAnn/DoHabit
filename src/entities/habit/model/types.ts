export interface CompletedDay {
	date: string;
	progress: number;
	isCompYdayBtnUsed?: boolean;
}

export interface Habit {
	id: string;
	title: string;
	colorIndex: number;
	iconTitle: string;
	frequency: number;
	creationDate: Date | string;
	completedDays: CompletedDay[];
	isArchived?: boolean;
}

export interface HabitData {
	title: string;
	frequency: string;
	colorIndex: string;
	iconTitle: string;
	order?: string;
}

// TODO: Replace with habit id
// action types
export interface AddHabit {
	type: 'addHabit';
	payload: {
		data: HabitData;
	};
}

export interface EditHabit {
	type: 'editHabit';
	payload: {
		habitId: string;
		data: HabitData;
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
	};
}

export type HabitAction =
	| AddHabit
	| EditHabit
	| DeleteHabit
	| ArchiveHabit
	| UpdateProgress
	| ToggleYesterdayStatus;

export interface HabitState {
	habits: Habit[];
	habitsDispatch: (action: HabitAction) => void;
}