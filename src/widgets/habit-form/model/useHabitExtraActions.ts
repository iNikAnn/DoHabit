import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';
import { archiveHabit } from '@features/archive-habit';
import { removeHabit } from '@features/remove-habit';
import { type DrawerAction } from '@shared/ui';

function useHabitExtraActions(habitId: string, onSuccess: () => void): DrawerAction[] {
	const { t } = useTranslation();

	const actions: DrawerAction[] = [
		{
			icon: FaTrash,
			label: t('habits.actions.delete'),
			variant: 'danger',
			onClick: () => removeHabit(habitId, onSuccess)
		},
		{
			icon: HiArchiveBoxArrowDown,
			label: t('habits.actions.archive'),
			onClick: () => archiveHabit(habitId, onSuccess)
		}
	];

	return actions;
}

export default useHabitExtraActions