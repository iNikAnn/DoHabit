import styles from '../../css/Habit.module.css';

// components
import HabitHeader from './HabitHeader';
import Calendar from './Calendar';
import HabitMenu from './HabitMenu';

// utils
import getDimmedColor from '../../utils/getDimmedColor';
import getLightDimmedColor from '../../utils/getLightDimmedColor';
import getFormattedDate from '../../utils/getFormattedDate';
import getCurrentStreak from '../../utils/getCurrentStreak';
import checkHabitCompletion from '../../utils/checkHabitCompletion';

function Habit(props) {
	const {
		color, completedDays, frequency, isMenuVisible,

		// 'on' functions
		onShowMenu
	} = props;

	// dimmed color
	const dimmedColor = getDimmedColor(color);
	const lightDimmedColor = getLightDimmedColor(dimmedColor);

	// is today completed?
	const isTodayCompleted = checkHabitCompletion(completedDays, new Date(), frequency);

	// today progress
	const todayProgress = completedDays.find((day) => {
		return day.date === getFormattedDate(new Date());
	})?.progress || 0;

	// current streak
	const currentStreak = getCurrentStreak(completedDays, frequency);

	return (
		<div
			className={styles.habit}
			onClick={onShowMenu}
		>
			<HabitHeader
				{...props}
				{...{
					dimmedColor,
					isTodayCompleted, todayProgress, currentStreak
				}}
			/>

			<div className={styles.content}>
				<Calendar
					{...{
						color, dimmedColor, lightDimmedColor,
						completedDays, frequency
					}}
				/>
			</div>

			{isMenuVisible && (
				<HabitMenu
					{...props}
					btnBgColor={lightDimmedColor}
				/>
			)}
		</div>
	);
}

export default Habit;