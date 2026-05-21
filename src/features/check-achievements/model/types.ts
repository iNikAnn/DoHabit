import { AchievementId, AchievementType } from '@entities/achievement';
import { Habit } from '@entities/habit';
import { Note } from '@entities/note';

export type CheckContext = { habits: Habit[]; notes: Note[] };

export type AchievementRules<T extends AchievementType> = Record<
	AchievementId<T>,
	(ctx: CheckContext) => boolean
>;