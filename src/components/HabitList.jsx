import styles from '../css/HabitList.module.css';

// components
import Habit from "./Habit/Habit";
import EmptyHabitsListMessage from './EmptyHabitsListMessage';

function HabitList(props) {
	const {
		habits,

		// 'on' functions
		onOpenHabitEditor,
		onMarkHabitAsCompleted,

		// db
		dbIcons,
		dbColors
	} = props;

	const habitsList = habits.map((habit) => {
		return (
			<Habit
				key={habit.title}
				{...habit}
				color={dbColors[habit.colorIndex]}

				// 'on' functions
				onOpenHabitEditor={(habitTitle) => onOpenHabitEditor({ mode: 'edit', habitTitle: habitTitle })}
				onMarkHabitAsCompleted={onMarkHabitAsCompleted}

				// db
				dbIcons={dbIcons}
			/>
		);
	});

	return (
		<div className={styles.habitList}>
			{!habitsList.length && (
				<EmptyHabitsListMessage
					// 'on' functions
					onOpenHabitEditor={onOpenHabitEditor}
				/>
			)}

			{habitsList}
		</div>
	);
}

export default HabitList;