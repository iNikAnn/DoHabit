import styles from './HabitList.module.css';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import HabitListEmpty from '../habit-list-empty/HabitListEmpty';
import HabitListItem from '../habit-list-item/HabitListItem';
import { useHabitsStore } from '@entities/habit';
import { getAppPalette } from '@shared/lib/theme';

interface HabitListProps {
	isArchive?: boolean;
}

const palette = getAppPalette();

/**
 * Habit list widget.
 * Supports dual mode: active habits or archived habits.
 */
function HabitList(props: HabitListProps) {
	const {
		isArchive = false
	} = props;

	const habits = useHabitsStore((s) => s.habits);
	const isHabitsReady = useHabitsStore((s) => s._hasHydrated);

	// Filter habits based on mode
	const filteredHabits = habits.filter((h) => isArchive ? h.isArchived : !h.isArchived);

	// 1. Wait until storage initialization completes
	if (!isHabitsReady) {
		return null;
	}

	// 2. Handle empty state
	if (filteredHabits.length === 0) {
		return <HabitListEmpty isArchive={isArchive} />;
	}

	// 3. Render list
	return (
		<ul className={clsx(styles.habitList, isArchive && styles.isArchive)}>
			<AnimatePresence>
				{filteredHabits.map((habit, index) => (
					<HabitListItem
						key={habit.id}
						habit={habit}
						index={index}
						colorVariants={palette[habit.colorIndex] ?? palette[0]}
						isArchive={isArchive}
					/>
				))}
			</AnimatePresence>
		</ul>
	);
}

export { HabitList };