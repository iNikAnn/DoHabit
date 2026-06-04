import { HiArchiveBox } from 'react-icons/hi2';
import { FaGithub, FaPaintBrush } from 'react-icons/fa';
import { BsFillDatabaseFill } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { getNavigationTarget } from '@shared/lib/router';
import type { ListItemProps } from '@shared/ui';

function useListItems() {
	const appItems: ListItemProps[] = [
		{
			icon: HiArchiveBox,
			iconProps: { color: '#7b68ee' },
			title: 'Archive',
			description: 'View or manage archived habits',
			...getNavigationTarget('ARCHIVE', {
				modalTitle: 'Archive'
			}),
			indicator: { type: 'arrow' }
		},
		{
			icon: FaPaintBrush,
			iconProps: { color: '#ffa420' },
			title: 'Appearance',
			description: 'Customize the app\'s look',
			...getNavigationTarget('APPEARANCE', {
				modalTitle: 'Appearance'
			}),
			indicator: { type: 'arrow' }
		},
		{
			icon: BsFillDatabaseFill,
			iconProps: { color: '#77dd77' },
			title: 'Data Management',
			description: 'Backup, restore, or clear app data',
			...getNavigationTarget('DATA_MANAGEMENT', {
				modalTitle: 'Data Management'
			}),
			indicator: { type: 'arrow' }
		}
	];

	const supportItems: ListItemProps[] = [
		{
			icon: FaGithub,
			iconProps: { color: '#7fc7ff' },
			title: 'GitHub Repository',
			description: 'View or contribute to the project',
			onClick: () => window.open('https://github.com/iNikAnn/DoHabit', '_blank'),
			indicator: { type: 'external' }
		},
		{
			icon: IoIosMail,
			iconProps: { color: '#ffb841' },
			title: 'Send Feedback',
			description: 'Share feedback or report bugs',
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