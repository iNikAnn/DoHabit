import styles from '../../css/HabitHeader.module.css';

// icons
import { FaCheck } from "react-icons/fa";

function HabitHeader(props) {
	const {
		title,
		icon,
		color,
		dimmedColor,
		lightDimmedColor,
		isTodayCompleted,
		currentStreak,

		// 'on' functions
		onOpenHabitEditor,
		onMarkHabitAsCompleted
	} = props;

	const markAsCompletedBtnStyle = {
		backgroundColor: isTodayCompleted ? color : dimmedColor,
		color: isTodayCompleted ? 'inherit' : lightDimmedColor
	};

	return (
		<div className={styles.header}>
			<div className={styles.headerLeft}>
				<span
					style={{ backgroundColor: dimmedColor }}
					className={styles.iconWrapper}
				>
					{icon}
				</span>

				<div className={styles.titleWrapper}>
					<strong onClick={() => onOpenHabitEditor(title)}>{title}</strong>

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
	)
}

export default HabitHeader;