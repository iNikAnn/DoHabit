import { useTranslation } from 'react-i18next';
import { FaCalendarCheck, FaCalendarTimes, FaPencilAlt, FaShareAlt } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';
import { MdLibraryBooks } from 'react-icons/md';
import { type Habit, useHabitsStore } from '@entities/habit';
import { takeScreenshot } from '@shared/lib/dom';
import { getNavigationTarget } from '@shared/lib/router';
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
	const { t } = useTranslation();
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
				label: isYdayCompleted
					? t('habits.actions.undoYesterday')
					: t('habits.actions.doneYesterday'),
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
				...getNavigationTarget('HABIT_EDITOR', {
					modalTitle: t('habits.actions.edit'),
					habitId: habit.id
				}),
				icon: FaPencilAlt,
				label: t('habits.actions.edit'),
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			},

			// Share habit
			{
				icon: FaShareAlt,
				label: t('habits.actions.share'),
				onClick: () => takeScreenshot(cardElement),
				style: { backgroundColor: darkenedColor }
			},

			// Open habit statistics
			{
				...getNavigationTarget('STATISTICS', {
					modalTitle: habit.title,
					habitId: habit.id
				}),
				icon: FaChartSimple,
				label: t('habits.stats.title'),
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			},

			// Open habit notes
			{
				...getNavigationTarget('DIARY', {
					modalTitle: habit.title,
					habitId: habit.id,
					currentStreak
				}),
				icon: MdLibraryBooks,
				label: t('notes.title'),
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