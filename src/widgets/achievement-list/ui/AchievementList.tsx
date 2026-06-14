import { useTranslation } from 'react-i18next';
import type { Achievement, AchievementId } from '@entities/achievement';
import { ACHIEVEMENTS, useAchievementsStore } from '@entities/achievement';
import type { ListItemProps } from '@shared/ui';
import { List, Placeholder, useDialogStore } from '@shared/ui';

/**
 * Render a sorted list of unlocked user achievements.
 * Shows a placeholder if nothing is unlocked yet.
 */
function AchievementList() {
	// UI localization
	const { t } = useTranslation();

	const openDialog = useDialogStore((s) => s.open);
	const unlockedAt = useAchievementsStore((s) => s.unlockedAt);

	// Open detail modal with full achievement info
	const handleShowDetails = (a: Achievement) => {
		const unlockDate = unlockedAt[a.id as AchievementId] ?? '';

		openDialog({
			title: t(`achievements.items.${a.id}.title`),
			subTitle: `Unlock Date: ${new Date(unlockDate).toLocaleDateString()}`,
			imgSrc: a.icon,
			text: t(`achievements.items.${a.id}.desc`)
		});
	};

	// Filter, sort by newest unlock date, and map to list items
	const achievements: ListItemProps[] = ACHIEVEMENTS
		.filter((a) => unlockedAt[a.id])
		.sort((a, b) => unlockedAt[b.id]! - unlockedAt[a.id]!)
		.map((a) => ({
			title: t(`achievements.items.${a.id}.title`),
			description: t(`achievements.items.${a.id}.desc`),
			icon: a.icon,
			onClick: () => handleShowDetails(a)
		}));

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