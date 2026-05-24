import { archiveHabit } from '@features/archive-habit';
import { removeHabit } from '@features/remove-habit';
import { type DrawerAction } from '@shared/ui';
import { FaTrash } from 'react-icons/fa';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';

function useHabitExtraActions(habitId: string, onSuccess: () => void): DrawerAction[] {
	const actions: DrawerAction[] = [
		{
			icon: FaTrash,
			label: 'Delete Habit',
			variant: 'danger',
			onClick: () => removeHabit(habitId, onSuccess)
		},
		{
			icon: HiArchiveBoxArrowDown,
			label: 'Archive Habit',
			onClick: () => archiveHabit(habitId, onSuccess)
		}
	];

	return actions;
}

export default useHabitExtraActions