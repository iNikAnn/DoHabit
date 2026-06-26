import styles from './AchievementList.module.css';
import { useCallback, useMemo } from 'react';
import { groupBy } from 'es-toolkit';
import { useTranslation } from 'react-i18next';
import type { Achievement } from '@entities/achievement';
import { ACHIEVEMENTS, useAchievementsStore } from '@entities/achievement';
import { List, useDialogStore } from '@shared/ui';

/**
 * Render a sorted list of unlocked user achievements.
 */
function AchievementList() {
	// UI localization
	const { t, i18n } = useTranslation();

	const openDialog = useDialogStore((s) => s.open);
	const unlockedAt = useAchievementsStore((s) => s.unlockedAt);

	// Open detail modal with full achievement info
	const handleShowDetails = useCallback((a: Achievement) => {
		const unlockDate = unlockedAt[a.id] ?? '';

		openDialog({
			title: t(`achievements.items.${a.id}.title`),
			subTitle: `Unlock Date: ${new Date(unlockDate).toLocaleDateString()}`,
			imgSrc: a.icon,
			text: t(`achievements.items.${a.id}.desc`)
		});
	}, [openDialog, t, unlockedAt]);

	/**
	 * Filter visible achievements, sort by newest unlock,
	 * transform to item schema, and group by type
	 */
	const achievements = useMemo(() => {
		const allAchievements = ACHIEVEMENTS
			.filter((a) => unlockedAt[a.id] || !a.isSecret)
			.sort((a, b) => (unlockedAt[b.id] ?? 0) - (unlockedAt[a.id] ?? 0))
			.map((a) => {
				const isUnlocked = !!unlockedAt[a.id];
				const hintKey = `achievements.items.${a.id}.hint`;

				return {
					id: a.id,
					group: a.isSecret ? 'secret' : 'onboarding', // eslint-disable-line
					title: t(`achievements.items.${a.id}.title`),
					description: isUnlocked
						? t(`achievements.items.${a.id}.desc`)
						: i18n.exists(hintKey) ? t(hintKey as any) : undefined,
					icon: a.icon,
					iconProps: isUnlocked ? {} : { style: { filter: 'saturate(0)' } },
					onClick: isUnlocked ? () => handleShowDetails(a) : undefined
				};
			});

		return groupBy(allAchievements, (a) => a.group);
	}, [handleShowDetails, i18n, t, unlockedAt]);

	const onboardingItems = achievements['onboarding'] || [];
	const totalOnboarding = onboardingItems.length;
	const unlockedOnboarding = onboardingItems.filter((i) => unlockedAt[i.id]).length;
	const onboardingProgress = totalOnboarding > 0 ? `${unlockedOnboarding}/${totalOnboarding}` : '';

	return (
		<div className={styles.container}>
			{achievements['secret'] && achievements['secret'].length > 0 && (
				<List
					items={achievements['secret']}
					iconSize='lg'
					truncateDescription
				/>
			)}

			{onboardingItems.length > 0 && (
				<List
					title={t('achievements.groups.onboarding')}
					extra={onboardingProgress}
					items={achievements['onboarding']}
					iconSize='lg'
					truncateDescription
				/>
			)}
		</div>
	);
}

export { AchievementList };