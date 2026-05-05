import styles from './HabitList.module.css';
import HabitCard from '../../../components/Habit/HabitCard';
import { Placeholder } from '@shared/ui';
import { AnimatePresence } from 'framer-motion';
import { useColorsStore } from '../../../stores/colorsStore';
import { useHabitsStore } from '@/stores/habitsStore';
import { CalendarIcon, TableIcon } from '@shared/assets';
import { MdAddToPhotos } from 'react-icons/md';
import { getModalPath } from '@shared/const';

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

	const dbColors = useColorsStore((s) => s.colors);
	const habits = useHabitsStore((s) => s.habits);

	// Filter habits based on mode
	const filteredHabits = habits.filter((h) => isArchive ? h.isArchived : !h.isArchived);

	// 1. Handle empty state
	if (filteredHabits.length === 0) {
		return isArchive ? (
			<Placeholder
				content={{
					image: <TableIcon />,
					title: 'No archived habits found',
					description: 'You can archive a habit by editing it.'
				}}
			/>
		) : (
			<Placeholder
				content={{
					image: <CalendarIcon />,
					title: 'No active habits found',
					description: 'Why not create one now?'
				}}
				action={{
					label: 'Create First Habit',
					icon: <MdAddToPhotos />,
					to: getModalPath('HABIT_EDITOR'),
					state: { modalTitle: 'Create new habit' }
				}}
			/>
		);
	}

	// 2. Render list
	return (
		<div className={styles.habitList}>
			{/* @ts-ignore */}
			<AnimatePresence initial={false}>
				{filteredHabits.map((habit) => (
					<HabitCard
						// TODO: Switch to ID once implemented
						key={habit.title}
						habit={habit}
						color={dbColors[habit.colorIndex] ?? 'red'}
						isArchive={isArchive}
					/>
				))}
			</AnimatePresence>
		</div>
	);
}

export { HabitList };