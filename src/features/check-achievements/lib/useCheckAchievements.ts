import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { achievementRules } from '../model/rules';
import { type AchievementId, ACHIEVEMENTS, useAchievementsStore } from '@entities/achievement';
import { useHabitsStore } from '@entities/habit';
import { useNotesStore } from '@entities/note';
import { useDialogStore } from '@shared/ui';
import { useSettingsStore } from '@entities/settings';

/**
 * Runs validation rules against current stores and unlocks achievements.
 */
function useCheckAchievements() {
	const { t } = useTranslation();
	const openDialog = useDialogStore((s) => s.open);

	const settings = useSettingsStore((s) => s.settings);

	const habits = useHabitsStore((s) => s.habits);
	const isHabitsReady = useHabitsStore((s) => s._hasHydrated);

	const notes = useNotesStore((s) => s.notes);
	const isNotesReady = useNotesStore((s) => s._hasHydrated);

	const unlockedAt = useAchievementsStore((s) => s.unlockedAt);
	const isAchievementsReady = useAchievementsStore((state) => state._hasHydrated);
	const unlock = useAchievementsStore((s) => s.unlock);

	const isInitialCheck = useRef(true);
	const isReady = isHabitsReady && isNotesReady && isAchievementsReady;

	// Shows modal dialog when an achievement is unlocked
	const notifyUnlock = useCallback((id: AchievementId) => {
		const ach = ACHIEVEMENTS.find((a) => a.id === id);
		if (!ach) return;

		const title = t(`achievements.items.${ach.id}.title`);
		const description = t(`achievements.items.${ach.id}.desc`);

		openDialog({
			title: t('achievements.notification.title'),
			imgSrc: ach.icon,
			text: `"${title}"\n${description}`
		});
	}, [openDialog, t]);

	// Track state changes and evaluate locked achievements
	useEffect(() => {
		if (!isReady) return;

		const context = { settings, habits, notes };
		let hasBulkUnlock = false;

		(Object.keys(achievementRules) as AchievementId[]).forEach((id) => {
			// Skip checking if already unlocked
			if (unlockedAt[id]) return;

			const checkFn = achievementRules[id];

			// Unlock achievement if validation rules pass
			if (checkFn(context)) {
				unlock(id);

				if (isInitialCheck.current) {
					hasBulkUnlock = true;
				} else {
					notifyUnlock(id);
				}
			}
		});

		// Trigger generic modal once after data analysis on mount
		if (isInitialCheck.current) {
			if (hasBulkUnlock) {
				openDialog({
					title: t('achievements.notification.title'),
					text: t('achievements.notification.desc')
				});
			}

			isInitialCheck.current = false;
		}
	}, [habits, isReady, notes, notifyUnlock, openDialog, settings, t, unlock, unlockedAt]);
}

export { useCheckAchievements };