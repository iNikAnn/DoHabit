import type { AchievementId, AchievementType } from '@entities/achievement';
import type { Habit } from '@entities/habit';
import type { Note } from '@entities/note';
import type { Settings } from '@entities/settings';

export type CheckContext = { settings: Settings, habits: Habit[]; notes: Note[] };

export type AchievementRules<T extends AchievementType> = Record<
	AchievementId<T>,
	(ctx: CheckContext) => boolean
>;