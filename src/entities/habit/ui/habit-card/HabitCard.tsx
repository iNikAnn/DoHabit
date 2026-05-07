import styles from './HabitCard.module.css';
import { CSSProperties, ReactNode, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSettingsStore } from '../../../../stores/settingsStore';
import HabitHeader from '../habit-header/HabitHeader';
import Calendar from '../../../../components/Habit/Calendar';
import CompactCalendar from '../../../../components/Habit/CompactCalendar';
import { Habit } from '../../model/types';
import getListAnimationVariants from '../../../../utils/getListAnimationVariants';
import { ColorVariants } from '@/types/colorScheme';

interface HabitCardProps {
	headerAction?: ReactNode;
	habit: Habit;
	colorVariants: ColorVariants;
	currentStreak: number;
	isArchive: boolean;
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function HabitCard(props: HabitCardProps) {
	const {
		headerAction,
		habit,
		colorVariants,
		currentStreak,
		isArchive,
		onClick
	} = props;

	const settings = useSettingsStore((s) => s.settings);

	const calendar = useMemo(
		() => {
			const props = {
				colorVariants,
				completedDays: habit.completedDays,
				frequency: habit.frequency
			};

			return settings.calendarView === 'compact' ? (
				<CompactCalendar {...props} />
			) : (
				<Calendar {...props} />
			);
		},
		[colorVariants, habit.completedDays, habit.frequency, settings.calendarView]
	);

	const habitVariants = getListAnimationVariants(0.3);

	return (
		<motion.div
			// Inject dynamic colors as CSS variables.
			style={{
				'--habit-color-base': colorVariants.baseColor,
				'--habit-color-dark': colorVariants.darkenedColor,
				'--habit-color-soft': colorVariants.softenedColor
			} as CSSProperties}

			className={styles.habit}
			{...habitVariants}
			layout
			onClick={onClick}
		>
			<HabitHeader
				action={headerAction}
				habit={habit}
				currentStreak={isArchive ? undefined : currentStreak}
			/>

			{!isArchive && (
				<div className={styles.content}>
					{calendar}
				</div>
			)}
		</motion.div>
	);
}

export { HabitCard };