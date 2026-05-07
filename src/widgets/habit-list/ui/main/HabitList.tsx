import styles from './HabitList.module.css';
import { AnimatePresence } from 'framer-motion';
import { useColorsStore } from '../../../../stores/colorsStore';
import { MdEditSquare, MdLibraryBooks } from 'react-icons/md';
import { getHabitStats } from '../../lib/getHabitStats';
import { UpdateHabitProgress } from '@features/update-habit-progress';
import { RestoreHabit } from '@features/restore-habit';
import { Habit, HabitCard, useHabitsStore } from '@entities/habit';
import { getModalPath } from '@shared/const';
import { DrawerAction, useDrawerStore } from '@shared/ui';
import { getColorVariants, shareElementScreenshot } from '@shared/lib';
import { FaCalendarCheck, FaCalendarTimes, FaShareAltSquare } from 'react-icons/fa';
import { ColorVariants } from '@/types/colorScheme';
import { FaChartSimple } from 'react-icons/fa6';
import HabitListEmpty from '../habit-list-empty/HabitListEmpty';

interface HabitListParams {
	isArchive?: boolean;
}

/**
 * Habit list widget.
 * Supports dual mode: active habits or archived habits.
 */
function HabitList(params: HabitListParams) {
	const {
		isArchive = false
	} = params;

	const habits = useHabitsStore((s) => s.habits);
	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);
	const colors = useColorsStore((s) => s.colors);
	const openDrawer = useDrawerStore((s) => s.open);

	// Filter habits based on mode
	const filteredHabits = habits.filter((h) => isArchive ? h.isArchived : !h.isArchived);

	// 1. Handle empty state
	if (filteredHabits.length === 0) {
		return <HabitListEmpty isArchive={isArchive} />
	}

	const handleShareHabit = (element: HTMLDivElement) => {
		if (element) {
			shareElementScreenshot(element);
		} else {
			alert('Something went wrong.');
		}
	};

	const handleCardClick = (habit: Habit, data: {
		isYdayCompleted: boolean,
		todayProgress: number,
		currentStreak: number,
		colorVariants: ColorVariants
	}, target: EventTarget | null) => {
		if (isArchive) return;

		const {
			isYdayCompleted,
			todayProgress,
			currentStreak,
			colorVariants
		} = data;

		const { darkenedColor } = colorVariants;

		const actions: DrawerAction[] = [
			{
				icon: isYdayCompleted ? <FaCalendarTimes /> : <FaCalendarCheck />,
				label: (isYdayCompleted ? 'Uncomp.' : 'Comp.') + ' Y\'day',
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
					habitId: habit.id,
					modalTitle: 'Edit habit',
				},
				icon: <MdEditSquare />,
				label: 'Edit Habit',
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			},
			{
				icon: <FaShareAltSquare />,
				label: 'Share Habit',
				onClick: () => handleShareHabit(target as HTMLDivElement),
				style: { backgroundColor: darkenedColor }
			},
			{
				to: getModalPath('STATISTICS'),
				state: {
					completedDays: habit.completedDays,
					colorVariants,
					colorIndex: habit.colorIndex,
					frequency: habit.frequency,
					modalTitle: habit.title,
				},
				icon: <FaChartSimple />,
				label: 'Statistics',
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			},
			{
				to: getModalPath('DIARY'),
				state: {
					currentStreak,
					habitTitle: habit.title,
					colorIndex: habit.colorIndex,
					modalTitle: habit.title,
				},
				icon: <MdLibraryBooks />,
				label: 'Diary',
				indicator: { type: 'arrow' },
				style: { backgroundColor: darkenedColor }
			}
		];

		openDrawer({
			title: habit.title,
			actions
		});
	};

	// 2. Render list
	return (
		<div className={styles.habitList}>
			{/* @ts-ignore */}
			<AnimatePresence initial={false}>
				{filteredHabits.map((habit) => {
					const colorVariants = getColorVariants(colors[habit.colorIndex]);
					const stats = getHabitStats(habit);

					return (
						<HabitCard
							key={habit.id}
							headerAction={isArchive
								? <RestoreHabit habitId={habit.id} />
								: <UpdateHabitProgress habit={habit} />}
							habit={habit}
							colorVariants={colorVariants}
							currentStreak={stats.currentStreak}
							isArchive={isArchive}
							onClick={(e) => handleCardClick(habit, { colorVariants, ...stats }, e.currentTarget)}
						/>
					);
				})}
			</AnimatePresence>
		</div>
	);
}

export { HabitList };