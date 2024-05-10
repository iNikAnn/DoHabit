import styles from '../css/HabitList.module.css';

// components
import Habit from "./Habit";

function HabitsList(props) {
	const {
		data
	} = props;

	const habitsList = data.map((habit) => {
		return (
			<Habit
				{...habit}
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