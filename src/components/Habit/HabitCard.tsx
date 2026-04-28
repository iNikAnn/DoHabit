import styles from '../../css/Habit.module.css';

// react
import { useMemo, useRef } from 'react';

// framer
import { AnimatePresence, motion } from 'framer-motion';

// stores
import { useSettingsStore } from '../../stores/settingsStore';

// components
import HabitHeader from './HabitHeader';
import Calendar from './Calendar';
import CompactCalendar from './CompactCalendar';
import HabitMenu from './HabitMenu';

// types
import { Habit } from '../../types/habit';

// utils
import getColorPalette from '../../utils/getColorPalette';
import getTodayProgress from '../../utils/getTodayProgress';
import getStreaks from '../../utils/getStreaks';
import checkHabitCompletion from '../../utils/checkHabitCompletion';
import shareHabit from '../../utils/shareHabit';
import getListAnimationVariants from '../../utils/getListAnimationVariants';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

interface Props {
	habit: Habit;
	habitIndex: number;
	color: string;
	isArchive: boolean;
	isMenuVisible: boolean;
	onShowMenu: (i: number) => void;
}

function HabitCard(props: Props) {
	const {
		habit,
		habitIndex,
		color,
		isArchive,
		isMenuVisible,
		onShowMenu
	} = props;

	const settings = useSettingsStore((s) => s.settings);
	const habitRef = useRef(null);
	const colorPalette = useMemo(() => getColorPalette(color), [color]);
	const todayProgress = getTodayProgress(habit.completedDays);
	const { currentStreak } = getStreaks(habit.completedDays, habit.frequency);

	const [
		isTodayCompleted,
		isYesterdayCompleted
	] = useMemo(
		() => checkHabitCompletion(habit.completedDays, habit.frequency, today, yesterday),
		[habit.completedDays, habit.frequency]
	);

	const handleShare = () => {
		if (habitRef.current) {
			shareHabit(habitRef.current);
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

	return (
		<motion.div
			ref={habitRef}
			className={styles.habit}
			{...habitVariants}
			layout
			onClick={() => onShowMenu(habitIndex)}
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

			{/* @ts-ignore */}
			<AnimatePresence>
				{(isMenuVisible && !isArchive) && (
					<HabitMenu
						key='habitMenu'
						habit={habit}
						colorPalette={colorPalette}
						isTodayCompleted={!!isTodayCompleted}
						isYesterdayCompleted={!!isYesterdayCompleted}
						todayProgress={todayProgress}
						currentStreak={currentStreak}
						onShowMenu={onShowMenu}
						onShare={handleShare}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export default HabitCard;