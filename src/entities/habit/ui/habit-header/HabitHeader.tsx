import styles from './HabitHeader.module.css';
import { ReactNode } from 'react';
import { Habit, HABIT_ICONS } from '@entities/habit';

interface HabitHeaderProps {
	action?: ReactNode;
	habit: Habit;
	currentStreak?: number;
}

function HabitHeader(props: HabitHeaderProps) {
	const {
		action,
		habit,
		currentStreak,
	} = props;

	const Icon = HABIT_ICONS.find((icon) => icon.iconTitle === habit.iconTitle)?.Icon
		?? HABIT_ICONS[0]?.Icon;

	return (
		<div className={styles.header}>
			<div className={styles.iconWrapper}>
				{Icon && <Icon />}
			</div>

			<div className={styles.titleWrapper} >
				<h4 className={styles.title}>
					{habit.title}
				</h4>

				{currentStreak !== undefined && (
					<div className={styles.description}>
						<small >
							Streak: <strong>{currentStreak}</strong>
						</small>
					</div>
				)}
			</div>

			<div className={styles.actionWrapper}>
				{action}
			</div>
		</div>
	);
}

export default HabitHeader;