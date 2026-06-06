import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsFirstRender } from '@uidotdev/usehooks';
import { achievementRules } from '../model/rules';
import { type AchievementId, ACHIEVEMENTS, useAchievementsStore } from '@entities/achievement';
import { useHabitsStore } from '@entities/habit';
import { useNotesStore } from '@entities/note';
import { useDialogStore } from '@shared/ui';

/**
 * Runs validation rules against current stores and unlocks achievements.
 */
function useCheckAchievements() {
	const { t } = useTranslation();
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
				title: t('achievements.notification.title'),
				text: t('achievements.notification.desc')
			});
		} else {
			// Real-time unlock during the session. Show specific achievement details
			if (!ach) return;

			openDialog({
				title: t('achievements.notification.title'),
				imgSrc: ach.icon,
				text: `"${ach.title}"\n${ach.description}`

			});
		}
	}, [isFirstRender, openDialog, t]);

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