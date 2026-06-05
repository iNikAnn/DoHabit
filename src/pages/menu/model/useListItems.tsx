import { useTranslation } from 'react-i18next';
import { HiArchiveBox } from 'react-icons/hi2';
import { FaGithub, FaPaintBrush } from 'react-icons/fa';
import { BsFillDatabaseFill } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { getNavigationTarget } from '@shared/lib/router';
import type { ListItemProps } from '@shared/ui';

function useListItems() {
	const { t } = useTranslation();

	const appItems: ListItemProps[] = [
		{
			icon: HiArchiveBox,
			iconProps: { color: '#7b68ee' },
			title: t('menu.archiveTitle'),
			description: t('menu.archiveDesc'),
			...getNavigationTarget('ARCHIVE', {
				modalTitle: t('menu.archiveTitle')
			}),
			indicator: { type: 'arrow' }
		},
		{
			icon: FaPaintBrush,
			iconProps: { color: '#ffa420' },
			title: t('menu.appearanceTitle'),
			description: t('menu.appearanceDesc'),
			...getNavigationTarget('APPEARANCE', {
				modalTitle: t('menu.appearanceTitle')
			}),
			indicator: { type: 'arrow' }
		},
		{
			icon: BsFillDatabaseFill,
			iconProps: { color: '#77dd77' },
			title: t('menu.dataMgmtTitle'),
			description: t('menu.dataMgmtDesc'),
			...getNavigationTarget('DATA_MANAGEMENT', {
				modalTitle: t('menu.dataMgmtTitle')
			}),
			indicator: { type: 'arrow' }
		}
	];

	const supportItems: ListItemProps[] = [
		{
			icon: FaGithub,
			iconProps: { color: '#7fc7ff' },
			title: t('menu.githubTitle'),
			description: t('menu.githubDesc'),
			onClick: () => window.open('https://github.com/iNikAnn/DoHabit', '_blank'),
			indicator: { type: 'external' }
		},
		{
			icon: IoIosMail,
			iconProps: { color: '#ffb841' },
			title: t('menu.feedbackTitle'),
			description: t('menu.feedbackDesc'),
			onClick: () => window.location.href = 'mailto:ilowen@ya.ru?subject=Feedback%20on%20DoHabit',
			indicator: { type: 'external' }
		}
	];

	return {
		appItems,
		supportItems
	};
}

export default useListItems;