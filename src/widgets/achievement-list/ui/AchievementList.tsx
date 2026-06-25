import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Achievement } from '@entities/achievement';
import { ACHIEVEMENTS, useAchievementsStore } from '@entities/achievement';
import type { ListItemProps } from '@shared/ui';
import { List, Placeholder, useDialogStore } from '@shared/ui';

/**
 * Render a sorted list of unlocked user achievements.
 * Shows a placeholder if nothing is unlocked yet.
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

	// Filter, sort by newest unlock date, and map to list items
	const achievements: ListItemProps[] = useMemo(() => (
		ACHIEVEMENTS
			.filter((a) => unlockedAt[a.id] || !a.isSecret)
			.sort((a, b) => (unlockedAt[b.id] ?? 0) - (unlockedAt[a.id] ?? 0))
			.map((a) => {
				const isLocked = !unlockedAt[a.id];
				const hintKey = `achievements.items.${a.id}.hint`;

				return {
					title: t(`achievements.items.${a.id}.title`),
					description: isLocked
						? i18n.exists(hintKey) ? t(hintKey as any) : undefined
						: t(`achievements.items.${a.id}.desc`),
					icon: a.icon,
					iconProps: isLocked ? { style: { filter: 'saturate(0)' } } : {},
					onClick: isLocked ? undefined : () => handleShowDetails(a)
				};
			})
	), [handleShowDetails, i18n, t, unlockedAt]);

	// 1. Handle empty state
	if (achievements.length === 0) {
		return (
			<Placeholder
				content={{
					// TODO: Add icon
					title: t('achievements.list.emptyTitle'),
					description: t('achievements.list.emptyDesc')
				}}
			/>
		);
	}

	// 2. Render list
	return (
		<List
			items={achievements}
			iconSize='lg'
			truncateDescription
		/>
	);
}

export { AchievementList };