import styles from './HabitCard.module.css';

// react
import { useMemo, useRef } from 'react';

// framer
import { motion } from 'framer-motion';

// stores
import { useSettingsStore } from '../../../stores/settingsStore';

// components
import HabitHeader from '../../../components/Habit/HabitHeader';
import Calendar from '../../../components/Habit/Calendar';
import CompactCalendar from '../../../components/Habit/CompactCalendar';

// types
import { Habit } from '../model/types';

// utils
import { getColorVariants, shareElementScreenshot } from '@shared/lib';
import getTodayProgress from '../lib/getTodayProgress';
import { getStreaks } from '../lib/getStreaks';
import { checkHabitCompletion } from '../lib/checkHabitCompletion';
import getListAnimationVariants from '../../../utils/getListAnimationVariants';
import { DrawerAction, useDrawerStore } from '@shared/ui';
import { MdEditSquare, MdLibraryBooks } from 'react-icons/md';
import { getModalPath } from '@shared/const';
import { FaCalendarCheck, FaCalendarTimes, FaShareAltSquare } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';
import { useHabitsStore } from '../model/store';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

interface Props {
	habit: Habit;
	color: string;
	isArchive: boolean;
}

function HabitCard(props: Props) {
	const {
		habit,
		color,
		isArchive,
	} = props;

	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);
	const settings = useSettingsStore((s) => s.settings);
	const habitRef = useRef(null);
	const colorPalette = useMemo(() => getColorVariants(color), [color]);
	const todayProgress = getTodayProgress(habit.completedDays);
	const { currentStreak } = getStreaks(habit.completedDays, habit.frequency);

	const [
		isTodayCompleted,
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
				colorPalette,
				completedDays: habit.completedDays,
				frequency: habit.frequency
			};

			return settings.calendarView === 'compact' ? (
				<CompactCalendar {...props} />
			) : (
				<Calendar {...props} />
			);
		},
		[colorPalette, habit.completedDays, habit.frequency, settings.calendarView]
	);

	const habitVariants = getListAnimationVariants(0.3);
	const { darkenedColor } = colorPalette;

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
					habitTitle: habit.title,
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
					colorPalette,
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
			className={styles.habit}
			{...habitVariants}
			layout
			onClick={handleOpenDrawer}
		>
			<HabitHeader
				habit={habit}
				colorPalette={colorPalette}
				isTodayCompleted={!!isTodayCompleted}
				todayProgress={todayProgress}
				currentStreak={currentStreak}
				isArchive={isArchive}
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