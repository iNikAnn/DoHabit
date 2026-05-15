import { HiArchiveBox } from 'react-icons/hi2';
import { FaGithub, FaPaintBrush } from 'react-icons/fa';
import { BsFillDatabaseFill } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { getModalPath } from '@shared/const';
import { MenuItemProps } from '@shared/ui';

export const appItems: MenuItemProps[] = [
	{
		icon: HiArchiveBox,
		iconProps: { color: '#7b68ee' },
		title: 'Archive',
		description: 'View or manage archived habits',
		to: getModalPath('ARCHIVE'),
		state: { modalTitle: 'Archive' },
		indicator: { type: 'arrow' }
	},
	{
		icon: FaPaintBrush,
		iconProps: { color: '#ffa420' },
		title: 'Appearance',
		description: 'Customize the app\'s look',
		to: getModalPath('APPEARANCE'),
		state: { modalTitle: 'Appearance' },
		indicator: { type: 'arrow' }
	},
	{
		icon: BsFillDatabaseFill,
		iconProps: { color: '#77dd77' },
		title: 'Export / Import Data',
		description: 'Backup or restore your data',
		to: getModalPath('DATA_MANAGEMENT'),
		state: { modalTitle: 'Export/Import Data' },
		indicator: { type: 'arrow' }
	}
];

export const supportItems: MenuItemProps[] = [
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