import styles from '../../css/Habit.module.css';

// react
import { useContext, useRef } from 'react';

// framer
import { AnimatePresence, motion } from 'framer-motion';

// context
import { SettingsContext } from '../../context/settingsContext';

// components
import HabitHeader from './HabitHeader';
import Calendar from './Calendar';
import CompactCalendar from './CompactCalendar';
import HabitMenu from './HabitMenu';

// utils
import getColorPalette from '../../utils/getColorPalette';
import getTodayProgress from '../../utils//getTodayProgress';
import getStreaks from '../../utils/getStreaks';
import checkHabitCompletion from '../../utils/checkHabitCompletion';
import shareHabit from '../../utils/shareHabit';
import getListAnimationVariants from '../../utils/getListAnimationVariants';

function Habit(props) {
	const {
		index, color, completedDays, frequency,
		isMenuVisible, archive,
		onShowMenu
	} = props;

	const settings = useContext(SettingsContext);
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

	const habitVariants = getListAnimationVariants(0.3);

	return (
		<motion.div
			ref={habitRef}
			className={styles.habit}
			{...habitVariants}
			layout
			onClick={() => onShowMenu(index)}
		>
			<HabitHeader
				{...{ ...props, colorPalette }}
				{...{ isTodayCompleted, todayProgress, currentStreak }}
			/>

			{!archive && (
				<div className={styles.content}>
					{settings.calendar === 'compact' ? (
						<CompactCalendar
							{...{ colorPalette, completedDays, frequency }}
						/>
					) : (
						<Calendar
							{...{ colorPalette, completedDays, frequency }}
						/>
					)}
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
		</motion.div>
	);
}

export default Habit;