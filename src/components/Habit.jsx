import styles from '../css/Habit.module.css';

// components
import Calendar from './Calendar';

function Habit(props) {
	const {
		title,
		color,
		completedDays,

		// 'on' functions
		onMarkHabitAsCompleted
	} = props;

	return (
		<div className={styles.habit}>
			<div className={styles.header}>
				<span>{title}</span>

				<button onClick={() => onMarkHabitAsCompleted(title)}>Check</button>
			</div>

			<div className={styles.content}>
				<Calendar
					color={color}
					completedDays={completedDays}
				/>
			</div>
		</div>
	);
}

export default Habit;