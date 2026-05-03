import { DialogContent } from '@shared/ui';
import { Note } from './diary';
import { Habit } from './habit';

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
	unlockDate?: Date | string;
}

export interface AchievementContext {
	habits: Habit[];
	mainDiary: Note[];
	onUnlock: (content: DialogContent) => void;
	isInitialRender: boolean;
}

export interface AchievementState {
	achievements: Achievement[];
	achievementsDispatch: (context: AchievementContext) => void;
}