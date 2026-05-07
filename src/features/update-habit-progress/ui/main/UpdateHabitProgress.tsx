import styles from './UpdateHabitProgress.module.css';
import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import { FaCheck } from 'react-icons/fa';
import ProgressBar from '../progress-bar/ProgressBar';
import { Habit, useHabitsStore, getTodayProgress } from '@entities/habit';
import { Button } from '@shared/ui';

interface Props {
	habit: Habit;
}

function UpdateHabitProgress(props: Props) {
	const {
		habit: {
			id,
			frequency,
			completedDays
		}
	} = props;

	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);

	const {
		progress,
		percentage,
		isCompleted
	} = getTodayProgress({ completedDays, frequency });

	console.log(isCompleted);


	const handleUpdateProgress: MouseEventHandler = (e) => {
		e.stopPropagation();

		habitsDispatch({
			type: 'updateProgress',
			payload: { habitId: id }
		});
	};

	return (
		<div className={styles.wrapper}>
			{frequency > 1 && (
				<ProgressBar
					segmentCount={frequency}
					progress={progress}
				/>
			)}

			<Button
				style={{
					backgroundColor: isCompleted
						? 'var(--habit-color-base)'
						: 'var(--habit-color-dark)'
				}}
				className={clsx(
					styles.button,
					frequency > 1 && styles.multiFrequency
				)}
				onClick={handleUpdateProgress}
			>
				{percentage >= 100 ? (
					<FaCheck />
				) : (
					<strong>{percentage}%</strong>
				)}
			</Button>
		</div>
	);
}

export { UpdateHabitProgress };