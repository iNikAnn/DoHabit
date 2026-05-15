import { AchievementId } from './achievements';

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