import { Habit, Note } from './habit';

export interface Achievement {
	id: number;
	title: string;
	desc: string;
	criteria?: {
		streak?: number;
		gap?: number;
		count?: number;
		length?: number;
		hours?: number;
	};
	isSecret: boolean;
	isUnlocked?: boolean;
	unlockDate?: string;
}

export interface AchievementContext {
	habits: Habit[];
	mainDiary: Note[];
	onUnlock: (ach: Achievement) => void;
	isInitialRender: boolean;
}

export interface AchievementState {
	achievements: Achievement[];
	achievementsDispatch: (context: AchievementContext) => void;
}