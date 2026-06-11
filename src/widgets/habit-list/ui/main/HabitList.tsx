import styles from './HabitList.module.css';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import HabitListEmpty from '../habit-list-empty/HabitListEmpty';
import { getHabitStats } from '../../lib/getHabitStats';
import { getCardMotionProps } from '../../model/animations';
import { useHabitActions } from '../../model/useHabitActions';
import { RestoreHabit } from '@features/restore-habit';
import { UpdateHabitProgress } from '@features/update-habit-progress';
import { getCompletedDatesSet, HabitCard, useHabitsStore } from '@entities/habit';
import { useSettingsStore } from '@entities/settings';
import { getAppPalette } from '@shared/lib/theme';
import { Calendar, CompactCalendar } from '@shared/ui';

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
	const isHabitsReady = useHabitsStore((s) => s._hasHydrated);
	const settings = useSettingsStore((s) => s.settings);
	const palette = getAppPalette();
	const { openHabitMenu } = useHabitActions();

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
				{filteredHabits.map((habit, index) => {
					const colorVariants = palette[habit.colorIndex] ?? palette[0]!;
					const habitStats = getHabitStats(habit);

					const headerAction = isArchive
						? <RestoreHabit habitId={habit.id} />
						: <UpdateHabitProgress habit={habit} />;

					const calendarProps = {
						colorVariants,
						highlightToday: settings.calendarHighlightToday,
						showDayNames: settings.calendarShowDayNames,
						showDayNumbers: settings.calendarShowDayNumbers,
						getCompletedDates: (days: string[]) => (
							getCompletedDatesSet(habit.completedDays, ...days)
						)
					};

					const calendar = !isArchive
						? settings.calendarView === 'compact'
							? <CompactCalendar {...calendarProps} />
							: <Calendar {...calendarProps} />
						: undefined;

					return (
						<motion.li
							key={habit.id}
							whileTap={{
								filter: 'brightness(0.8)',
								scale: 0.98,
								transition: { duration: 0.1 }
							}}
							{...getCardMotionProps(index)}
						>
							<HabitCard
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
						</motion.li>
					);
				})}
			</AnimatePresence>
		</ul>
	);
}

export { HabitList };