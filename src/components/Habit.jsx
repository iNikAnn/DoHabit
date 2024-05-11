import styles from '../css/Habit.module.css';

// components
import Calendar from './Calendar';

function Habit(props) {
	const {
		title,
		color,
		iconTitle,
		completedDays,

		// 'on' functions
		onMarkHabitAsCompleted,

		// db
		icons
	} = props;

	// icon
	const icon = icons.find((el) => el[0] === iconTitle)[1];

	return (
		<div className={styles.habit}>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					{icon}
					<span><strong>{title}</strong></span>
				</div>

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