import styles from './HabitList.module.css';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useColorsStore } from '../../../../stores/colorsStore';
import HabitListEmpty from '../habit-list-empty/HabitListEmpty';
import { getHabitStats } from '../../lib/getHabitStats';
import { useHabitActions } from '../../lib/useHabitActions';
import Calendar from '@/components/Habit/Calendar';
import { RestoreHabit } from '@features/restore-habit';
import { UpdateHabitProgress } from '@features/update-habit-progress';
import { getCompletedDatesSet, HabitCard, useHabitsStore } from '@entities/habit';
import { useSettingsStore } from '@entities/settings';
import { getColorVariants } from '@shared/lib';
import { CompactCalendar } from '@shared/ui';

interface HabitListProps {
	isArchive?: boolean;
}

/**
 * Habit list widget.
 * Supports dual mode: active habits or archived habits.
 */
function HabitList(props: HabitListProps) {
	const {
		isArchive = false
	} = props;

	const habits = useHabitsStore((s) => s.habits);
	const settings = useSettingsStore((s) => s.settings);
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
		<div className={clsx(styles.habitList, isArchive && styles.isArchive)}>
			{/* @ts-ignore */}
			<AnimatePresence initial={false}>
				{filteredHabits.map((habit) => {
					const colorVariants = getColorVariants(colors[habit.colorIndex]);
					const habitStats = getHabitStats(habit);

					const headerAction = isArchive
						? <RestoreHabit habitId={habit.id} />
						: <UpdateHabitProgress habit={habit} />;

					const calendarProps = {
						colorVariants,
						completedDays: habit.completedDays
					};

					const calendar = !isArchive
						? settings.calendarView === 'compact'
							? <CompactCalendar
								color={colorVariants.darkenedColor}
								accentColor={colorVariants.baseColor}
								highlightToday={settings.calendarHighlightToday}
								getCompletedDates={(days) => (
									getCompletedDatesSet(habit.completedDays, ...days)
								)}
							/>
							: <Calendar {...calendarProps} />
						: undefined;

					return (
						<HabitCard
							key={habit.id}
							habit={habit}
							headerAction={headerAction}
							colorVariants={colorVariants}
							currentStreak={isArchive ? undefined : habitStats.currentStreak}
							content={calendar}
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