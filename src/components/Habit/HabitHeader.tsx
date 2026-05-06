import styles from '../../css/HabitHeader.module.css';

// react
import { useRef } from 'react';

import { Habit, HABIT_ICONS, useHabitsStore } from '@entities/habit';

// components
import ProgressBar from './ProgressBar';

// types
import { ColorPalette } from '../../types/colorScheme';

// icons
import { FaCheck } from "react-icons/fa";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

interface Props {
	habit: Habit;
	colorPalette: ColorPalette;
	isTodayCompleted: boolean;
	todayProgress: number;
	currentStreak: number;
	isArchive: boolean;
}

function HabitHeader(props: Props) {
	const {
		habit,
		colorPalette,
		isTodayCompleted,
		todayProgress,
		currentStreak,
		isArchive,
	} = props;

	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);
	const { baseColor, darkenedColor } = colorPalette;

	const progressPercentage = Math.floor((todayProgress / habit.frequency) * 100);
	const progressWrapperRef = useRef<HTMLDivElement>(null);

	const handleUpdateProgress = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (!progressWrapperRef.current) return;

		const el = progressWrapperRef.current;

		if (!el) {
			console.error('Element not found');
			return;
		};

		const isCompleted = habit.frequency - todayProgress === 1;

		el.classList.toggle(styles.completed, isCompleted);
		el.classList.toggle(styles.uncompleted, !isCompleted);

		setTimeout(
			() => el.classList.remove(styles.uncompleted),
			200
		);

		try {
			navigator?.vibrate(isCompleted ? [10, 10, 10, 10, 10] : 10);
		} catch (e) {
			console.warn(e);
		}

		habitsDispatch({
			type: 'updateProgress',
			payload: {
				// TODO: Switch to ID once implemented
				habitId: habit.title
			}
		});
	};

	const Icon = HABIT_ICONS.find((icon) => icon.iconTitle === habit.iconTitle)?.Icon ?? null;

	return (
		<div className={styles.header}>
			<div
				style={{ backgroundColor: darkenedColor, color: baseColor }}
				className={styles.iconWrapper}
			>
				{Icon ? <Icon /> : '??'}
			</div>

			<div className={styles.titleWrapper} >
				<h4 className={styles.title}>
					{habit.title}
				</h4>

				<div className={styles.desc}>
					<small >
						Streak: <strong>{currentStreak}</strong>
					</small>

					{/* {!!habit.diary?.length && (
						<small>
							Notes: <strong>{habit.diary.length}</strong>
						</small>
					)} */}
				</div>
			</div>

			{!isArchive && (
				<div
					ref={progressWrapperRef}
					className={styles.progressWrapper}
				>
					{habit.frequency > 1 && (
						<ProgressBar
							colorPalette={colorPalette}
							segmentCount={habit.frequency}
							todayProgress={todayProgress}
						/>
					)}

					<button
						style={{ backgroundColor: isTodayCompleted ? baseColor : darkenedColor }}
						className={`${styles.progressBtn} ${habit.frequency > 1 ? styles.multiFrequency : ''}`}
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
								payload: {
									// TODO: Switch to ID once implemented
									habitId: habit.title
								}
							})
						};
					}}
				/>
			)}
		</div>
	);
}

export default HabitHeader;