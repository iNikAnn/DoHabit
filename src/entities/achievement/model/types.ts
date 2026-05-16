import { HABIT_ACHIEVEMENTS, NOTE_ACHIEVEMENTS } from './achievements';

export type HabitAchievementId = typeof HABIT_ACHIEVEMENTS[number]['id'];
export type NoteAchievementId = typeof NOTE_ACHIEVEMENTS[number]['id'];

type AchievementIdMap = {
	habit: HabitAchievementId;
	note: NoteAchievementId;
};

export type AchievementType = keyof AchievementIdMap;

export type AchievementId<T extends AchievementType = AchievementType> = AchievementIdMap[T];

export interface Achievement {
	id: string;
	title: string;
	description: string;
	isSecret?: boolean;
}

export interface AchievementState {
	// Stores key-value as { "achievement-id": "2026-05-15" }
	unlockedAt: Partial<Record<AchievementId, string>>;
	unlock: (id: AchievementId) => void;
}