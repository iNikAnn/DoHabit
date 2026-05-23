import styles from './HabitCard.module.css';
import { type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Habit } from '../../model/types';
import HabitHeader from '../habit-header/HabitHeader';
import { createListVariants } from '@shared/lib/animation';
import { type ColorVariants } from '@shared/lib/theme';

interface HabitCardProps {
	habit: Habit;
	headerAction?: ReactNode;
	colorVariants: ColorVariants;
	currentStreak?: number;
	content?: ReactNode;
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function HabitCard(props: HabitCardProps) {
	const {
		habit,
		headerAction,
		colorVariants,
		currentStreak,
		content,
		onClick
	} = props;

	const habitVariants = createListVariants(0.3);

	// Dynamic colors as CSS variables
	const style = {
		'--habit-color-base': colorVariants.baseColor,
		'--habit-color-dark': colorVariants.darkenedColor,
		'--habit-color-soft': colorVariants.softenedColor
	} as CSSProperties;

	return (
		<motion.div
			style={style}
			className={styles.habit}
			{...habitVariants}
			layout
			onClick={onClick}
		>
			<HabitHeader
				habit={habit}
				action={headerAction}
				currentStreak={currentStreak}
			/>

			{content && (
				<div className={styles.contentWrapper}>
					{content}
				</div>
			)}
		</motion.div>
	);
}

export { HabitCard };