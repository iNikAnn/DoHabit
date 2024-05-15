import styles from '../../css/Habit.module.css';

// components
import HabitHeader from './HabitHeader';
import Calendar from '../Calendar';

// utils
import getDimmedColor from '../../utils/getDimmedColor';
import getLightDimmedColor from '../../utils/getLightDimmedColor';
import getFormattedDate from '../../utils/getFormattedDate';
import getCurrentStreak from '../../utils/getCurrentStreak';

function Habit(props) {
	const {
		color,
		iconTitle,
		completedDays,

		// db
		icons
	} = props;

	// icon
	const icon = icons.find((el) => el[0] === iconTitle)?.[1] || '?';

	// dimmed color
	const dimmedColor = getDimmedColor(color);
	const lightDimmedColor = getLightDimmedColor(dimmedColor);

	// isTodayCompleted
	const isTodayCompleted = completedDays.includes(getFormattedDate(new Date()));

	// currentStreak
	const currentStreak = getCurrentStreak(completedDays);

	return (
		<div className={styles.habit}>
			<HabitHeader
				{...props}
				icon={icon}
				dimmedColor={dimmedColor}
				lightDimmedColor={lightDimmedColor}
				isTodayCompleted={isTodayCompleted}
				currentStreak={currentStreak}
			/>

			<div className={styles.content}>
				<Calendar
					color={color}
					dimmedColor={dimmedColor}
					lightDimmedColor={lightDimmedColor}
					completedDays={completedDays}
				/>
			</div>
		</div>
	);
}

export default Habit;