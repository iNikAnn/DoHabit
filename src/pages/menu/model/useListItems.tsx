import { useTranslation } from 'react-i18next';
import { HiArchiveBox } from 'react-icons/hi2';
import { FaBug, FaGithub, FaPaintBrush } from 'react-icons/fa';
import { BsFillDatabaseFill } from 'react-icons/bs';
import { getNavigationTarget } from '@shared/lib/router';
import type { ListItemProps } from '@shared/ui';

function useListItems() {
	const { t } = useTranslation();

	const habitItems: ListItemProps[] = [
		{
			icon: HiArchiveBox,
			iconProps: { color: '#7b68ee' },
			title: t('menu.archive.title'),
			description: t('menu.archive.desc'),
			...getNavigationTarget('ARCHIVE', {
				modalTitle: t('menu.archive.title')
			}),
			indicator: { type: 'arrow' }
		},
	];

	const settingsItems: ListItemProps[] = [
		{
			icon: FaPaintBrush,
			iconProps: { color: '#ffa420' },
			title: t('menu.appearance.title'),
			description: t('menu.appearance.desc'),
			...getNavigationTarget('APPEARANCE', {
				modalTitle: t('menu.appearance.title')
			}),
			indicator: { type: 'arrow' }
		},
		{
			icon: BsFillDatabaseFill,
			iconProps: { color: '#77dd77' },
			title: t('menu.dataManagement.title'),
			description: t('menu.dataManagement.desc'),
			...getNavigationTarget('DATA_MANAGEMENT', {
				modalTitle: t('menu.dataManagement.title')
			}),
			indicator: { type: 'arrow' }
		}
	];

	const supportItems: ListItemProps[] = [
		{
			icon: FaGithub,
			iconProps: { color: '#7fc7ff' },
			title: t('menu.shared.gitHub.title'),
			description: t('menu.shared.gitHub.desc'),
			onClick: () => window.open('https://github.com/iNikAnn/DoHabit', '_blank'),
			indicator: { type: 'external' }
		},
		{
			icon: FaBug,
			iconProps: { color: '#EF4444' },
			title: t('menu.shared.feedback.title'),
			description: t('menu.shared.feedback.desc'),
			onClick: () => window.open('https://github.com/iNikAnn/DoHabit/issues/new', '_blank'),
			indicator: { type: 'external' }
		}
	];

	return {
		habitItems,
		settingsItems,
		supportItems
	};
}

export default useListItems;