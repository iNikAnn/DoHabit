import styles from '../../css/StreakBlock.module.css';

// utils
import getCurrentStreak from '../../utils/getCurrentStreak';
import getLongestStreak from '../../utils/getLongestStreak';

// icons
import { FaAward } from "react-icons/fa";

function StreakBlock({ habit, color, selectedYear }) {
	const completedDays = habit.completedDays.filter(
		(day) => new Date(day.date).getFullYear() === selectedYear
	);

	const currentStreak = getCurrentStreak(habit.completedDays, habit.frequency);
	const longestStreak = getLongestStreak(completedDays, habit.frequency);

	const percentageDifference = Math.floor(
		((currentStreak - longestStreak) / (longestStreak || 1)) * 100
	);

	return (
		<div className={styles.streaks}>
			<div className={styles.card}>
				<div className={styles.header}>
					<h4>Current</h4>
					<span style={{ color: percentageDifference < 0 ? 'IndianRed' : '#57a639' }}>
						{percentageDifference + '%'}
					</span>
				</div>

				<div className={styles.streak}>
					{currentStreak}
				</div>
			</div>

			<div className={styles.card}>
				<div className={styles.header}>
					<h4>Longest</h4>
					<FaAward color={color} />
				</div>

				<div className={styles.streak}>
					{longestStreak}
				</div>
			</div>
		</div>
	);
}

export default StreakBlock;