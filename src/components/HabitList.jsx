import styles from '../css/HabitList.module.css';

// components
import Habit from "./Habit/Habit";
import EmptyHabitListMessage from './EmptyHabitListMessage';

function HabitList(props) {
	const {
		habits,

		// 'on' functions
		onOpenModal, onUpdateProgress,

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
			{...{ onOpenModal, onUpdateProgress }}
		/>
	));

	return (
		<div className={styles.habitList}>
			{!habitList.length && (
				<EmptyHabitListMessage {...{ onOpenModal }} />
			)}

			{habitList}
		</div>
	);
}

export default HabitList;