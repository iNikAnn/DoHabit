import { FaAward, FaBars, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import type { NavItem } from './types';
import { getModalPath } from '@shared/lib/router';

export const NAV_ITEMS: NavItem[] = [
	{
		path: getModalPath('HABIT_EDITOR'),
		title: 'Create new habit',
		icon: FaPlus
	},
	{
		path: getModalPath('DIARY'),
		title: 'Main diary',
		icon: MdLibraryBooks
	},
	{
		path: getModalPath('ACHIEVEMENTS'),
		title: 'Achievements',
		icon: FaAward
	},
	{
		path: getModalPath('MENU'),
		title: 'Menu',
		icon: FaBars
	}
];