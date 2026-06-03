import { FaAward, FaBars, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import type { NavItem } from './types';
import { getNavigationTarget } from '@shared/lib/router';

export const NAV_ITEMS: NavItem[] = [
	{
		...getNavigationTarget('HABIT_EDITOR', {
			modalTitle: 'Create new habit'
		}),
		icon: FaPlus
	},
	{
		...getNavigationTarget('DIARY', {
			modalTitle: 'Main diary',
		}),
		icon: MdLibraryBooks
	},
	{
		...getNavigationTarget('ACHIEVEMENTS', {
			modalTitle: 'Achievements'
		}),
		icon: FaAward
	},
	{
		...getNavigationTarget('MENU', {
			modalTitle: 'Menu'
		}),
		icon: FaBars
	}
];