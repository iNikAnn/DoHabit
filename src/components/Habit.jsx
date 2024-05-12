import styles from '../css/Habit.module.css';

// components
import Calendar from './Calendar';

// icons
import { FaCheck } from "react-icons/fa";

// utils
import getDimmedColor from '../utils/getDimmedColor';
import getLightDimmedColor from '../utils/getLightDimmedColor';
import getFormattedDate from '../utils/getFormattedDate';
import getCurrentStreak from '../utils/getCurrentStreak';

function Habit(props) {
	const {
		title,
		color,
		iconTitle,
		completedDays,

		// 'on' functions
		onMarkHabitAsCompleted,

		// db
		icons
	} = props;

	// icon
	const icon = icons.find((el) => el[0] === iconTitle)[1];

	// dimmed color
	const dimmedColor = getDimmedColor(color);
	const lightDimmedColor = getLightDimmedColor(dimmedColor);

	// isTodayCompleted
	const isTodayCompleted = completedDays.includes(getFormattedDate(new Date()));

	// currentStreak
	const currentStreak = getCurrentStreak(completedDays);

	const markAsCompletedBtnStyle = {
		backgroundColor: isTodayCompleted ? color : dimmedColor,
		color: isTodayCompleted ? 'inherit' : lightDimmedColor
	};

	return (
		<div className={styles.habit}>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					<span
						style={{ backgroundColor: dimmedColor }}
						className={styles.iconWrapper}
					>
						{icon}
					</span>

					<div className={styles.titleWrapper}>
						<strong>{title}</strong>

						<small
							style={{ color: 'gray' }}
						>
							Current streak: <strong>{currentStreak}</strong>
						</small>
					</div>
				</div>

				<button
					style={markAsCompletedBtnStyle}
					className={styles.markAsCompletedBtn}
					onClick={() => onMarkHabitAsCompleted(title)}
				>
					<FaCheck />
				</button>
			</div>

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