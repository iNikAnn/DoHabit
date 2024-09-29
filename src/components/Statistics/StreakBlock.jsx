import styles from '../../css/StreakBlock.module.css';

// components
import CardHeader from './CardHeader';

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
				<CardHeader
					title="Current"
					icon={percentageDifference + '%'}
					iconColor={percentageDifference < 0 ? 'IndianRed' : '#57a639'}
				/>

				<div className={styles.streak}>
					{currentStreak}
				</div>
			</div>

			<div className={styles.card}>
				<CardHeader
					title="Longest"
					icon={<FaAward />}
					iconColor={color}
				/>

				<div className={styles.streak}>
					{longestStreak}
				</div>
			</div>
		</div>
	);
}

export default StreakBlock;