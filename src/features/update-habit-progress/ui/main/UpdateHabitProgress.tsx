import styles from './UpdateHabitProgress.module.css';
import clsx from 'clsx';
import { MouseEventHandler, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import ProgressBar from '../progress-bar/ProgressBar';
import { Habit, useHabitsStore, getTodayProgress } from '@entities/habit';
import { Button } from '@shared/ui';

interface Props {
	habit: Habit;
}

/**
 * Updates progress for a specific habit.
 * Manages click animations, haptic feedback, and progress visualization.
 */
function UpdateHabitProgress({ habit }: Props) {
	const {
		id,
		frequency
	} = habit;

	// Local state for trigger-based animations
	const [animation, setAnimation] = useState<'completed' | 'updated' | null>(null);

	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);

	// Current day stats from the domain helper
	const { progress, percentage, isCompleted } = getTodayProgress(habit);

	const handleUpdateProgress: MouseEventHandler = (e) => {
		e.stopPropagation();

		// Trigger visual feedback
		const isFinalStep = habit.frequency - progress === 1;
		setAnimation(isFinalStep ? 'completed' : 'updated');

		// Haptic feedback
		try {
			navigator?.vibrate(isFinalStep ? [10, 10, 10, 10, 10] : 10);
		} catch (e) {
			console.warn('Vibration not supported or failed.', e);
		}

		habitsDispatch({
			type: 'updateProgress',
			payload: { habitId: id }
		});
	};

	// Cleanup animation classes after they finish playing
	useEffect(() => {
		if (!animation) return;

		const timer = setTimeout(() => setAnimation(null), 200);
		return () => clearTimeout(timer);
	}, [animation]);

	return (
		<div
			className={clsx(
				styles.wrapper,
				animation === 'completed' && styles.completed,
				animation === 'updated' && styles.updated
			)}
		>
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