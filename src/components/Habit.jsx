import styles from '../css/Habit.module.css';

function Habit() {
	return (
		<div className={styles.habit}>
			<div className={styles.header}>
				<span>Habit title</span>

				<button>Check</button>
			</div>

			<div className={styles.content}>
				Calendar
			</div>
		</div>
	);
}

export default Habit;