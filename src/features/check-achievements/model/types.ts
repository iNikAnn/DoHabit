import type { AchievementId, AchievementType } from '@entities/achievement';
import type { Habit } from '@entities/habit';
import type { Note } from '@entities/note';

export type CheckContext = { habits: Habit[]; notes: Note[] };

export type AchievementRules<T extends AchievementType> = Record<
	AchievementId<T>,
	(ctx: CheckContext) => boolean
>;