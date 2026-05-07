import styles from './HabitCard.module.css';

// react
import { CSSProperties, ReactNode, useMemo, useRef } from 'react';

// framer
import { motion } from 'framer-motion';

// stores
import { useSettingsStore } from '../../../../stores/settingsStore';

// components
import HabitHeader from '../habit-header/HabitHeader';
import Calendar from '../../../../components/Habit/Calendar';
import CompactCalendar from '../../../../components/Habit/CompactCalendar';

// types
import { Habit } from '../../model/types';

// utils
import { getColorVariants, shareElementScreenshot } from '@shared/lib';
import { getStreaks } from '../../lib/getStreaks';
import { checkHabitCompletion } from '../../lib/checkHabitCompletion';
import getListAnimationVariants from '../../../../utils/getListAnimationVariants';
import { DrawerAction, useDrawerStore } from '@shared/ui';
import { MdEditSquare, MdLibraryBooks } from 'react-icons/md';
import { getModalPath } from '@shared/const';
import { FaCalendarCheck, FaCalendarTimes, FaShareAltSquare } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';
import { useHabitsStore } from '../../model/store';
import { getTodayProgress } from '@entities/habit';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

interface HabitCardProps {
	headerAction?: ReactNode;
	habit: Habit;
	color: string;
	isArchive: boolean;
}

function HabitCard(props: HabitCardProps) {
	const {
		headerAction,
		habit,
		color,
		isArchive,
	} = props;

	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);
	const settings = useSettingsStore((s) => s.settings);
	const habitRef = useRef(null);
	const colorVariants = useMemo(() => getColorVariants(color), [color]);
	const {
		progress: todayProgress,
		isCompleted: isTodayCompleted
	} = getTodayProgress({ completedDays: habit.completedDays, frequency: habit.frequency });
	const { currentStreak } = getStreaks(habit.completedDays, habit.frequency);

	const [
		isYesterdayCompleted
	] = useMemo(
		() => checkHabitCompletion(habit.completedDays, habit.frequency, today, yesterday),
		[habit.completedDays, habit.frequency]
	);

	const handleShareHabit = () => {
		if (habitRef.current) {
			shareElementScreenshot(habitRef.current);
		} else {
			alert('Something went wrong.');
		}
	};

	const calendar = useMemo(
		() => {
			const props = {
				colorVariants,
				completedDays: habit.completedDays,
				frequency: habit.frequency
			};

			return settings.calendarView === 'compact' ? (
				<CompactCalendar {...props} />
			) : (
				<Calendar {...props} />
			);
		},
		[colorVariants, habit.completedDays, habit.frequency, settings.calendarView]
	);

	const habitVariants = getListAnimationVariants(0.3);
	const { baseColor, darkenedColor, softenedColor } = colorVariants;

	const openDrawer = useDrawerStore((s) => s.open);

	const handleCompleteYeserday = () => {
		habitsDispatch({
			type: 'toggleYesterdayStatus',
			payload: {
				habitId: habit.title,
				isTodayCompleted,
				isYesterdayCompleted,
				todayProgress
			}
		});
	};

	const handleOpenDrawer = () => {
		if (isArchive) return;

		const actions: DrawerAction[] = [
			{
				icon: isYesterdayCompleted ? <FaCalendarTimes /> : <FaCalendarCheck />,
				label: (isYesterdayCompleted ? 'Uncomp.' : 'Comp.') + ' Y\'day',
				style: { backgroundColor: isYesterdayCompleted ? 'IndianRed' : darkenedColor },
				onClick: handleCompleteYeserday
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
				onClick: handleShareHabit,
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

	return (
		<motion.div
			ref={habitRef}

			// Inject dynamic colors as CSS variables.
			style={{
				'--habit-color-base': baseColor,
				'--habit-color-dark': darkenedColor,
				'--habit-color-soft': softenedColor
			} as CSSProperties}

			className={styles.habit}
			{...habitVariants}
			layout
			onClick={handleOpenDrawer}
		>
			<HabitHeader
				action={headerAction}
				habit={habit}
				currentStreak={isArchive ? undefined : currentStreak}
			/>

			{!isArchive && (
				<div className={styles.content}>
					{calendar}
				</div>
			)}
		</motion.div>
	);
}

export { HabitCard };