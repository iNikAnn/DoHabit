import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getCardMotionProps } from '../../model/animations';
import { useHabitActions } from '../../model/useHabitActions';
import { getHabitStats } from '@widgets/habit-list/lib/getHabitStats';
import { RestoreHabit } from '@features/restore-habit';
import { UpdateHabitProgress } from '@features/update-habit-progress';
import { getCompletedDatesSet, HabitCard, type Habit } from '@entities/habit';
import { useSettingsStore } from '@entities/settings';
import type { ColorVariants } from '@shared/lib/theme';
import { Calendar, CompactCalendar } from '@shared/ui';

interface HabitListItemProps {
	habit: Habit;
	index: number;
	colorVariants: ColorVariants;
	isArchive: boolean;
}

const HabitListItem = memo((props: HabitListItemProps) => {
	const {
		habit,
		index,
		colorVariants,
		isArchive
	} = props;

	const settings = useSettingsStore((s) => s.settings);
	const habitStats = useMemo(() => getHabitStats(habit), [habit]);
	const { openHabitMenu } = useHabitActions();

	const headerAction = isArchive
		? <RestoreHabit habitId={habit.id} />
		: <UpdateHabitProgress habit={habit} />;

	const calendarProps = {
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
});

export default HabitListItem;