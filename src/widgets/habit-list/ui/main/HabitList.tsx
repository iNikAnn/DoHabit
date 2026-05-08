import styles from './HabitList.module.css';
import { AnimatePresence } from 'framer-motion';
import { useColorsStore } from '../../../../stores/colorsStore';
import HabitListEmpty from '../habit-list-empty/HabitListEmpty';
import { getHabitStats } from '../../lib/getHabitStats';
import { useHabitActions } from '../../lib/useHabitActions';
import { UpdateHabitProgress } from '@features/update-habit-progress';
import { RestoreHabit } from '@features/restore-habit';
import { HabitCard, useHabitsStore } from '@entities/habit';
import { getColorVariants } from '@shared/lib';

interface HabitListParams {
	isArchive?: boolean;
}

/**
 * Habit list widget.
 * Supports dual mode: active habits or archived habits.
 */
function HabitList(params: HabitListParams) {
	const {
		isArchive = false
	} = params;

	const habits = useHabitsStore((s) => s.habits);
	const colors = useColorsStore((s) => s.colors);
	const { openHabitMenu } = useHabitActions();

	// Filter habits based on mode
	const filteredHabits = habits.filter((h) => isArchive ? h.isArchived : !h.isArchived);

	// 1. Handle empty state
	if (filteredHabits.length === 0) {
		return <HabitListEmpty isArchive={isArchive} />;
	}

	// 2. Render list
	return (
		<div className={styles.habitList}>
			{/* @ts-ignore */}
			<AnimatePresence initial={false}>
				{filteredHabits.map((habit) => {
					const colorVariants = getColorVariants(colors[habit.colorIndex]);
					const habitStats = getHabitStats(habit);

					return (
						<HabitCard
							key={habit.id}
							headerAction={isArchive
								? <RestoreHabit habitId={habit.id} />
								: <UpdateHabitProgress habit={habit} />}
							habit={habit}
							colorVariants={colorVariants}
							currentStreak={habitStats.currentStreak}
							isArchive={isArchive}
							onClick={(e) => !isArchive && openHabitMenu({
								habit,
								habitStats,
								colorVariants,
								cardElement: e.currentTarget
							})}
						/>
					);
				})}
			</AnimatePresence>
		</div>
	);
}

export { HabitList };