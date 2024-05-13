import styles from '../css/HabitList.module.css';

// components
import Habit from "./Habit";
import EmptyHabitsListMessage from './EmptyHabitsListMessage';

function HabitList(props) {
	const {
		data,

		// 'on' functions
		onOpenCreateHabitWindow,
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
		<div className={styles.habitList}>
			{!habitsList.length && (
				<EmptyHabitsListMessage
					// 'on' functions
					onOpenCreateHabitWindow={onOpenCreateHabitWindow}
				/>
			)}

			{habitsList}
		</div>
	);
}

export default HabitList;