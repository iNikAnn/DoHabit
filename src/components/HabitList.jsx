import styles from '../css/HabitList.module.css';

// components
import Habit from "./Habit/Habit";
import EmptyHabitListMessage from './EmptyHabitListMessage';

function HabitList(props) {
	const {
		habits,

		// 'on' functions
		onOpenHabitEditor, onMarkHabitAsCompleted,

		// db
		dbIcons, dbColors
	} = props;

	const habitList = habits.map((habit) => (
		<Habit
			key={habit.title}
			{...habit}
			icon={dbIcons.find(([iconTitle]) => iconTitle === habit.iconTitle)?.[1] || '?'}
			color={dbColors[habit.colorIndex]}

			// 'on' functions
			onOpenHabitEditor={(habitTitle) => onOpenHabitEditor({ mode: 'edit', habitTitle: habitTitle })}
			{...{ onMarkHabitAsCompleted }}
		/>
	));

	return (
		<div className={styles.habitList}>
			{!habitList.length && (
				<EmptyHabitListMessage {...{ onOpenHabitEditor }} />
			)}

			{habitList}
		</div>
	);
}

export default HabitList;