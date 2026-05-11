export interface CompletedDay {
	/** ISO date string (YYYY-MM-DD) */
	date: string;

	/** Optional progress value. If missing, day is considered fully completed. */
	progress?: number;

	isCompYdayBtnUsed?: boolean;
}

export interface Habit {
	id: string;
	title: string;
	colorIndex: number;
	iconTitle: string;
	frequency: number;
	completedDays: CompletedDay[];
	isArchived?: boolean;

	/** Creation time as a Unix timestamp (ms) */
	createdAt: number;
}

export interface HabitData {
	title: string;
	frequency: string;
	colorIndex: string;
	iconTitle: string;
	order?: string;
}

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

export interface SetHabitArchiveStatus {
	type: 'setHabitArchiveStatus';
	payload: {
		habitId: string;
		isArchived: boolean;
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
		isYdayCompleted: boolean;
		todayProgress: number;
	};
}

export type HabitAction =
	| AddHabit
	| EditHabit
	| DeleteHabit
	| SetHabitArchiveStatus
	| UpdateProgress
	| ToggleYesterdayStatus;

export interface HabitState {
	habits: Habit[];
	habitsDispatch: (action: HabitAction) => void;
}