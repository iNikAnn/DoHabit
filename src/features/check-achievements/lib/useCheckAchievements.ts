import { useCallback, useEffect } from 'react';
import { achievementRules } from '../model/rules';
import { AchievementId, ACHIEVEMENTS, useAchievementsStore } from '@entities/achievement';
import { useHabitsStore } from '@entities/habit';
import { useNotesStore } from '@entities/note';
import { useDialogStore } from '@shared/ui';
import { useIsFirstRender } from '@shared/lib';

/**
 * Runs validation rules against current stores and unlocks achievements.
 */
function useCheckAchievements() {
	const isFirstRender = useIsFirstRender();
	const openDialog = useDialogStore((s) => s.open);

	const habits = useHabitsStore((s) => s.habits);
	const notes = useNotesStore((s) => s.notes);

	const unlockedAt = useAchievementsStore((s) => s.unlockedAt);
	const unlock = useAchievementsStore((s) => s.unlock);

	// Shows modal dialog when an achievement is unlocked
	const notifyUnlock = useCallback((id: AchievementId) => {
		const ach = ACHIEVEMENTS.find((a) => a.id === id);

		if (isFirstRender) {
			// Bulk unlock on mount (e.g., historical data analysis). Show single generic modal
			openDialog({
				title: 'Achievement Unlocked!',
				text: 'It seems that new achievements have been unlocked!\nYou can check them in the achievements section.'
			});
		} else {
			// Real-time unlock during the session. Show specific achievement details
			if (!ach) return;

			openDialog({
				title: 'Achievement Unlocked!',
				imgSrc: ach.icon,
				text: `"${ach.title}"\n${ach.description}`

			});
		}
	}, [isFirstRender, openDialog]);

	// Track state changes and evaluate locked achievements
	useEffect(() => {
		const context = { habits, notes };

		(Object.keys(achievementRules) as AchievementId[]).forEach((id) => {
			// Skip checking if already unlocked
			if (unlockedAt[id]) return;

			const checkFn = achievementRules[id];

			if (checkFn(context)) {
				unlock(id);
				notifyUnlock(id);
			}
		});
	}, [habits, notifyUnlock, notes, unlock, unlockedAt]);
}

export { useCheckAchievements };