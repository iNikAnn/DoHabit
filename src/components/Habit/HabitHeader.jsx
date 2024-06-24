import styles from '../../css/HabitHeader.module.css';

// components
import ProgressBar from './ProgressBar';

// icons
import { FaCheck } from "react-icons/fa";

function HabitHeader(props) {
	const {
		title, icon, frequency,
		color, dimmedColor,
		isTodayCompleted, todayProgress, currentStreak,

		// 'on' functions
		onUpdate
	} = props;

	const markAsCompletedBtnStyle = {
		backgroundColor: isTodayCompleted ? color : dimmedColor,
		color: 'inherit',
		borderRadius: frequency === 1
			? 'var(--border-radius-secondary)'
			: '0 var(--border-radius-secondary) var(--border-radius-secondary) 0'
	};

	const progressPercentage = Math.floor((todayProgress / frequency) * 100);

	const handleUpdateProgress = (e) => {
		e.stopPropagation();

		onUpdate({
			type: 'updateProgress',
			habitTitle: title
		});
	};

	return (
		<div className={styles.header}>
			<div className={styles.headerTop}>
				<div className={styles.headerLeft}>
					<span
						style={{ backgroundColor: dimmedColor, color: color }}
						className={styles.iconWrapper}
					>
						{icon}
					</span>

					<div
						className={styles.titleWrapper}
					>
						<strong>
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
						onClick={handleUpdateProgress}
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