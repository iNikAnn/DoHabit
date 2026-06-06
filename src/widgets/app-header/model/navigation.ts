import { FaAward, FaBars, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import type { NavItem } from './types';
import { getNavigationTarget } from '@shared/lib/router';
import { t } from 'i18next';

export const getNavItems = (): NavItem[] => ([
	{
		...getNavigationTarget('HABIT_EDITOR', {
			modalTitle: t('habits.actions.createNew')
		}),
		icon: FaPlus
	},
	{
		...getNavigationTarget('DIARY', {
			modalTitle: t('notes.title'),
		}),
		icon: MdLibraryBooks
	},
	{
		...getNavigationTarget('ACHIEVEMENTS', {
			modalTitle: t('achievements.title')
		}),
		icon: FaAward
	},
	{
		...getNavigationTarget('MENU', {
			modalTitle: t('menu.title')
		}),
		icon: FaBars
	}
]);