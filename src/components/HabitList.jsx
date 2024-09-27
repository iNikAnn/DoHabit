import styles from '../css/HabitList.module.css';

// react
import { useEffect, useState } from 'react';

// components
import Habit from "./Habit/Habit";

function HabitList(props) {
	const {
		habits, archive,

		// 'on' functions
		onOpenModal, onUpdate,

		// db
		dbIcons, dbColors
	} = props;

	const [visibleMenuIndex, setVisibleMenuIndex] = useState(-1);

	const habitList = habits.map(
		(habit, index) => (
			<Habit
				key={habit.title}
				{...habit}
				icon={dbIcons.find(([iconTitle]) => iconTitle === habit.iconTitle)?.[1] || '?'}
				color={dbColors[habit.colorIndex]}
				isMenuVisible={visibleMenuIndex === index}
				archive={archive}

				// 'on' functions
				{...{ onOpenModal, onUpdate }}
				onShowMenu={() => setVisibleMenuIndex(index === visibleMenuIndex ? -1 : index)}
			/>
		)
	);

	return (
		<div className={styles.habitList}>
			{habitList}
		</div>
	);
}

export default HabitList;