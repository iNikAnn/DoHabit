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
import getTodayProgress from '../../utils//getTodayProgress';
import getStreaks from '../../utils/getStreaks';
import checkHabitCompletion from '../../utils/checkHabitCompletion';
import shareHabit from '../../utils/shareHabit';

function Habit(props) {
	const {
		index, color, completedDays, frequency,
		isMenuVisible, archive,
		onShowMenu
	} = props;

	const habitRef = useRef(null);
	const colorPalette = getColorPalette(color);
	const todayProgress = getTodayProgress(completedDays);
	const { currentStreak } = getStreaks(completedDays, frequency);

	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	const [
		isTodayCompleted,
		isYesterdayCompleted
	] = checkHabitCompletion(completedDays, frequency, today, yesterday);

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
						{...{ colorPalette, isTodayCompleted, isYesterdayCompleted, todayProgress }}
						onShowMenu={onShowMenu}
						onShare={handleShare}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Habit;