import { HABIT_ACHIEVEMENTS, NOTE_ACHIEVEMENTS, OTHER_ACHIEVEMENTS } from './achievements';

export type HabitAchievementId = typeof HABIT_ACHIEVEMENTS[number]['id'];
export type NoteAchievementId = typeof NOTE_ACHIEVEMENTS[number]['id'];
export type OtherAchievementId = typeof OTHER_ACHIEVEMENTS[number]['id'];

type AchievementIdMap = {
	habit: HabitAchievementId;
	note: NoteAchievementId;
	other: OtherAchievementId;
};

export type AchievementType = keyof AchievementIdMap;

export type AchievementId<T extends AchievementType = AchievementType> = AchievementIdMap[T];

export interface Achievement {
	id: AchievementId;
	icon: string;
	isSecret?: boolean;
}

export interface AchievementState {
	// Stores key-value as { "achievement-id": "1234567890123" }
	unlockedAt: Partial<Record<AchievementId, number>>;
	unlock: (id: AchievementId) => void;

	_hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
}