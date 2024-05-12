import styles from '../css/Habit.module.css';

// components
import Calendar from './Calendar';

// icons
import { FaCheck } from "react-icons/fa";

// utils
import getDimmedColor from '../utils/getDimmedColor';
import getLightDimmedColor from '../utils/getLightDimmedColor';
import getFormattedDate from '../utils/getFormattedDate';

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

					<span><strong>{title}</strong></span>
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