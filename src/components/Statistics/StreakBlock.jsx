import styles from '../../css/StreakBlock.module.css';

// utils
import getCurrentStreak from '../../utils/getCurrentStreak';
import getLongestStreak from '../../utils/getLongestStreak';

function StreakBlock({ habit }) {
	const currentStreak = getCurrentStreak(habit.completedDays, habit.frequency);
	const longestStreak = getLongestStreak(habit.completedDays, habit.frequency);

	const percentageDifference = ((currentStreak - longestStreak) / longestStreak) * 100;

	return (
		<div className={styles.streaks}>
			<div className={styles.card}>
				<div className={styles.header}>
					<h4>Current</h4>
					<span style={{ color: percentageDifference < 0 ? 'IndianRed' : '#57a639' }}>
						{percentageDifference > 0 && '+'}{percentageDifference}%
					</span>
				</div>

				<div className={styles.streak}>
					{currentStreak}
				</div>
			</div>

			<div className={styles.card}>
				<h4>Longest</h4>
				<div className={styles.streak}>
					{longestStreak}
				</div>
			</div>
		</div>
	);
}

export default StreakBlock;