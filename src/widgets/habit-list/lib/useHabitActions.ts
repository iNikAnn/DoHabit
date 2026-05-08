import { ColorVariants } from '@/types/colorScheme';
import { FaCalendarCheck, FaCalendarTimes, FaShareAlt } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';
import { MdEditSquare, MdLibraryBooks } from 'react-icons/md';
import { Habit, useHabitsStore } from '@entities/habit';
import { getModalPath } from '@shared/const';
import { shareElementScreenshot } from '@shared/lib';
import { DrawerAction, useDrawerStore } from '@shared/ui';

interface OpenMenuParams {
	habit: Habit;
	habitStats: {
		isYdayCompleted: boolean;
		todayProgress: number;
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
				todayProgress,
				currentStreak
			},
			colorVariants,
			cardElement
		} = params;

		const { darkenedColor } = colorVariants;

		return [
			{
				icon: isYdayCompleted ? FaCalendarTimes : FaCalendarCheck,
				label: (isYdayCompleted ? 'Undo' : 'Done') + ' Y\'day',
				style: { backgroundColor: isYdayCompleted ? 'IndianRed' : darkenedColor },
				onClick: () => habitsDispatch({
					type: 'toggleYesterdayStatus',
					payload: {
						habitId: habit.id,
						isYdayCompleted,
						todayProgress
					}
				})
			},
			{
				to: getModalPath('HABIT_EDITOR'),
				state: {
					modalTitle: 'Edit habit',
					habitId: habit.id
				},
				icon: MdEditSquare,
				label: 'Edit Habit',
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			},
			{
				icon: FaShareAlt,
				label: 'Share Habit',
				onClick: () => shareElementScreenshot(cardElement),
				style: { backgroundColor: darkenedColor }
			},
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
			{
				to: getModalPath('DIARY'),
				state: {
					modalTitle: habit.title,
					habitTitle: habit.title,
					colorIndex: habit.colorIndex,
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