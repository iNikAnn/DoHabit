import styles from '../../css/HabitHeader.module.css';

// components
import ProgressBar from './ProgressBar';

// icons
import { FaCheck } from "react-icons/fa";
import { HiArchiveBoxXMark } from "react-icons/hi2";

function HabitHeader(props) {
	const {
		title, icon, frequency, diary,
		color, dimmedColor,
		isTodayCompleted, todayProgress, currentStreak,
		archive,

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
			<div
				style={{ backgroundColor: dimmedColor, color: color }}
				className={styles.iconWrapper}
			>
				{icon}
			</div>

			<div className={styles.titleWrapper} >
				<h4 className={styles.title}>
					{title}
				</h4>

				<div className={styles.desc}>
					<small >
						Streak: <strong>{currentStreak}</strong>
					</small>

					{(diary?.length > 0) && (
						<small>
							Notes: <strong>{diary.length}</strong>
						</small>
					)}
				</div>
			</div>

			{!archive && (
				<div className={styles.progressWrapper}>
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
			)}

			{archive && (
				<HiArchiveBoxXMark
					className={styles.restoreIcon}
					onClick={() => {
						if (window.confirm('Are you sure you want to restore this habit?')) {
							onUpdate({
								type: 'archiveHabit',
								habitTitle: title
							})
						};
					}}
				/>
			)}
		</div>
	);
}

export default HabitHeader;