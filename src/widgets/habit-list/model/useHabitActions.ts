import { FaCalendarCheck, FaCalendarTimes, FaPencilAlt, FaShareAlt } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';
import { MdLibraryBooks } from 'react-icons/md';
import { type Habit, useHabitsStore } from '@entities/habit';
import { takeScreenshot } from '@shared/lib/dom';
import { getModalPath } from '@shared/lib/router';
import { type ColorVariants } from '@shared/lib/theme';
import { type DrawerAction, useDrawerStore } from '@shared/ui';

interface OpenMenuParams {
	habit: Habit;
	habitStats: {
		isYdayCompleted: boolean;
		isTodayCompleted: boolean;
		currentStreak: number;
	};
	colorVariants: ColorVariants;
	cardElement: HTMLElement;
}

/**
 * Hook to manage drawer menu logic.
 */
function useHabitActions() {
	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);
	const openDrawer = useDrawerStore((s) => s.open);

	const getActions = (params: OpenMenuParams): DrawerAction[] => {
		const {
			habit,
			habitStats: {
				isYdayCompleted,
				isTodayCompleted,
				currentStreak
			},
			colorVariants,
			cardElement
		} = params;

		const { darkenedColor } = colorVariants;

		return [
			// Done/Undo yestarday
			{
				icon: isYdayCompleted ? FaCalendarTimes : FaCalendarCheck,
				label: (isYdayCompleted ? 'Undo' : 'Done') + ' Y\'day',
				onClick: () => habitsDispatch({
					type: 'toggleYesterdayStatus',
					payload: {
						habitId: habit.id,
						isYdayCompleted,
						isTodayCompleted
					}
				}),
				style: { backgroundColor: darkenedColor }
			},

			// Open habit editor
			{
				to: getModalPath('HABIT_EDITOR'),
				state: {
					modalTitle: 'Edit habit',
					habitId: habit.id
				},
				icon: FaPencilAlt,
				label: 'Edit Habit',
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			},

			// Share habit
			{
				icon: FaShareAlt,
				label: 'Share Habit',
				onClick: () => takeScreenshot(cardElement),
				style: { backgroundColor: darkenedColor }
			},

			// Open habit statistics
			{
				to: getModalPath('STATISTICS'),
				state: {
					modalTitle: habit.title,
					completedDays: habit.completedDays,
					colorVariants: colorVariants,
					colorIndex: habit.colorIndex,
					frequency: habit.frequency
				},
				icon: FaChartSimple,
				label: 'Statistics',
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			},

			// Open habit diary
			{
				to: getModalPath('DIARY'),
				state: {
					modalTitle: habit.title,
					habitId: habit.id,
					currentStreak
				},
				icon: MdLibraryBooks,
				label: 'Diary',
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			}
		];
	};

	return {
		openHabitMenu: ({ habit, ...rest }: OpenMenuParams) => {
			openDrawer({
				title: habit.title,
				actions: getActions({ habit, ...rest })
			});
		}
	};
}

export { useHabitActions };