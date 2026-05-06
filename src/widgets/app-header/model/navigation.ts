// icons
import { FaAward, FaBars, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';

// types
import { NavItem } from './types';

// utils
import { getModalPath } from '@shared/const';

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