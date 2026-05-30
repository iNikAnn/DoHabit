import styles from './HabitCard.module.css';
import { type CSSProperties, type ReactNode } from 'react';
import type { Habit } from '../../model/types';
import HabitHeader from '../habit-header/HabitHeader';
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

	// Dynamic colors as CSS variables
	const style = {
		'--habit-color-base': colorVariants.baseColor,
		'--habit-color-dark': colorVariants.darkenedColor,
		'--habit-color-soft': colorVariants.softenedColor
	} as CSSProperties;

	return (
		<div
			style={style}
			className={styles.habit}
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
		</div>
	);
}

export { HabitCard };