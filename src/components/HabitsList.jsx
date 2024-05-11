import styles from '../css/HabitList.module.css';

// components
import Habit from "./Habit";

function HabitsList(props) {
	const {
		data,

		// 'on' functions
		onMarkHabitAsCompleted,

		// db
		icons
	} = props;

	const habitsList = data.map((habit) => {
		return (
			<Habit
				key={habit.title}
				{...habit}

				// 'on' functions
				onMarkHabitAsCompleted={onMarkHabitAsCompleted}

				// db
				icons={icons}
			/>
		);
	});

	return (
		<div className={styles.habits}>
			{habitsList}
		</div>
	);
}

export default HabitsList;