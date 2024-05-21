import styles from '../../css/Habit.module.css';

// components
import HabitHeader from './HabitHeader';
import Calendar from './Calendar';

// utils
import getDimmedColor from '../../utils/getDimmedColor';
import getLightDimmedColor from '../../utils/getLightDimmedColor';
import getFormattedDate from '../../utils/getFormattedDate';
import getCurrentStreak from '../../utils/getCurrentStreak';
import checkHabitCompletion from '../../utils/checkHabitCompletion';

function Habit(props) {
	const {
		color,
		iconTitle,
		completedDays,
		frequency,

		// db
		dbIcons
	} = props;

	// icon
	const icon = dbIcons.find((el) => el[0] === iconTitle)?.[1] || '?';

	// dimmed color
	const dimmedColor = getDimmedColor(color);
	const lightDimmedColor = getLightDimmedColor(dimmedColor);

	// isTodayCompleted
	const isTodayCompleted = checkHabitCompletion(completedDays, new Date(), frequency);

	// today progress
	const todayProgress = completedDays.find((day) => {
		return day.date === getFormattedDate(new Date());
	})?.progress || 0;

	// currentStreak
	const currentStreak = getCurrentStreak(completedDays, frequency);

	return (
		<div className={styles.habit}>
			<HabitHeader
				{...props}
				icon={icon}
				dimmedColor={dimmedColor}
				lightDimmedColor={lightDimmedColor}
				isTodayCompleted={isTodayCompleted}
				currentStreak={currentStreak}
				todayProgress={todayProgress}
			/>

			<div className={styles.content}>
				<Calendar
					color={color}
					dimmedColor={dimmedColor}
					lightDimmedColor={lightDimmedColor}
					completedDays={completedDays}
					frequency={frequency}
				/>
			</div>
		</div>
	);
}

export default Habit;