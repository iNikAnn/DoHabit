import styles from '../../css/HabitHeader.module.css';

// react
import { useRef } from 'react';

// stores
import { useHabitsStore } from '../../stores/habitsStore';

// components
import ProgressBar from './ProgressBar';

// icons
import { FaCheck } from "react-icons/fa";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

function HabitHeader(props) {
	const {
		title, icon, frequency, diary, colorPalette,
		isTodayCompleted, todayProgress, currentStreak,
		isArchive,
	} = props;

	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);
	const { baseColor, darkenedColor } = colorPalette;

	const progressPercentage = Math.floor((todayProgress / frequency) * 100);
	const progressWrapperRef = useRef(null);

	const handleUpdateProgress = (e) => {
		e.stopPropagation();

		const el = progressWrapperRef.current;

		if (!el) {
			console.error('Element not found');
			return;
		};

		const isCompleted = frequency - todayProgress === 1;

		el.classList.toggle(styles.completed, isCompleted);
		el.classList.toggle(styles.uncompleted, !isCompleted);

		setTimeout(
			() => el.classList.remove(styles.uncompleted),
			200
		);

		try {
			navigator?.vibrate(isCompleted ? [10, 10, 10, 10, 10] : 10);
		} catch (e) {
			console.error(e);
		}

		habitsDispatch({
			type: 'updateProgress',
			habitTitle: title
		});
	};

	return (
		<div className={styles.header}>
			<div
				style={{ backgroundColor: darkenedColor, color: baseColor }}
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

			{!isArchive && (
				<div
					ref={progressWrapperRef}
					className={styles.progressWrapper}
				>
					{frequency > 1 && (
						<ProgressBar
							{...{ segmentCount: frequency, colorPalette, todayProgress }}
						/>
					)}

					<button
						style={{ backgroundColor: isTodayCompleted ? baseColor : darkenedColor }}
						className={`${styles.progressBtn} ${frequency > 1 ? styles.multiFrequency : ''}`}
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

			{isArchive && (
				<MdOutlineSettingsBackupRestore
					className={styles.restoreIcon}
					onClick={() => {
						if (window.confirm('Are you sure you want to restore this habit?')) {
							habitsDispatch({
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