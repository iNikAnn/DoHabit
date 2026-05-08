import styles from './HabitCard.module.css';
import { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Habit } from '../../model/types';
import HabitHeader from '../habit-header/HabitHeader';
import getListAnimationVariants from '../../../../utils/getListAnimationVariants';
import { ColorVariants } from '@/types/colorScheme';

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

	const habitVariants = getListAnimationVariants(0.3);

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
				<div className={styles.contentWapper}>
					{content}
				</div>
			)}
		</motion.div>
	);
}

export { HabitCard };