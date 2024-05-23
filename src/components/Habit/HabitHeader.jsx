import styles from '../../css/HabitHeader.module.css';

// components
import ProgressBar from './ProgressBar';

// icons
import { FaCheck } from "react-icons/fa";

function HabitHeader(props) {
	const {
		title, icon, frequency,
		color, dimmedColor, lightDimmedColor,
		isTodayCompleted, todayProgress, currentStreak,

		// 'on' functions
		onOpenHabitEditor, onMarkHabitAsCompleted
	} = props;

	const markAsCompletedBtnStyle = {
		backgroundColor: isTodayCompleted ? color : dimmedColor,
		color: isTodayCompleted ? 'inherit' : lightDimmedColor,
		borderRadius: frequency === 1
			? 'var(--border-radius-secondary)'
			: '0 var(--border-radius-secondary) var(--border-radius-secondary) 0'
	};

	const progressPercentage = Math.floor((todayProgress / frequency) * 100);

	return (
		<div className={styles.header}>
			<div className={styles.headerTop}>
				<div className={styles.headerLeft}>
					<span
						style={{ backgroundColor: dimmedColor }}
						className={styles.iconWrapper}
					>
						{icon}
					</span>

					<div className={styles.titleWrapper}>
						<strong onClick={() => onOpenHabitEditor(title)}>
							{title}
						</strong>

						<small style={{ color: 'gray' }}>
							Current streak: <strong>{currentStreak}</strong>
						</small>
					</div>
				</div>

				<div className={styles.headerRight}>
					{frequency > 1 && (
						<ProgressBar
							{...{ color, dimmedColor, todayProgress }}
							segmentCount={frequency}
						/>
					)}

					<button
						style={markAsCompletedBtnStyle}
						className={styles.markAsCompletedBtn}
						onClick={() => onMarkHabitAsCompleted(title)}
					>
						{progressPercentage === 100 ? (
							<FaCheck />
						) : (
							<strong>{progressPercentage}%</strong>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default HabitHeader;