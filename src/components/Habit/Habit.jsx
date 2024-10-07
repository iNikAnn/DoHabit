import styles from '../../css/Habit.module.css';

// react
import { useRef } from 'react';

// framer
import { AnimatePresence } from 'framer-motion';

// components
import HabitHeader from './HabitHeader';
import Calendar from './Calendar';
import HabitMenu from './HabitMenu';

// utils
import getColorPalette from '../../utils/getColorPalette';
import getFormattedDate from '../../utils/getFormattedDate';
import getCurrentStreak from '../../utils/getCurrentStreak';
import checkHabitCompletion from '../../utils/checkHabitCompletion';
import shareHabit from '../../utils/shareHabit';

function Habit(props) {
	const {
		index, color, completedDays, frequency, isMenuVisible,
		archive,
		onShowMenu
	} = props;

	const habitRef = useRef(null);
	const colorPalette = getColorPalette(color);

	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	// is completed
	const isTodayCompleted = checkHabitCompletion(completedDays, today, frequency);
	const isYesterdayCompleted = checkHabitCompletion(completedDays, yesterday, frequency);

	// today progress
	const todayProgress = completedDays.find(
		(day) => day.date === getFormattedDate(new Date())
	)?.progress || 0;

	// current streak
	const currentStreak = getCurrentStreak(completedDays, frequency);

	// share habit
	const handleShare = () => shareHabit(habitRef.current);

	return (
		<div
			ref={habitRef}
			className={styles.habit}
			onClick={() => onShowMenu(index)}
		>
			<HabitHeader
				{...{ ...props, colorPalette }}
				{...{ isTodayCompleted, todayProgress, currentStreak }}
			/>

			{!archive && (
				<div className={styles.content}>
					<Calendar
						{...{ colorPalette, completedDays, frequency }}
					/>
				</div>
			)}

			<AnimatePresence>
				{(isMenuVisible && !archive) && (
					<HabitMenu
						key="habitMenu"
						{...props}
						{...{ isTodayCompleted, isYesterdayCompleted, todayProgress }}
						btnBgColor={colorPalette.softenedColor}
						onShowMenu={onShowMenu}
						onShare={handleShare}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Habit;