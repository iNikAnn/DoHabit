import styles from '../css/HabitList.module.css';

// components
import Habit from "./Habit/Habit";
import EmptyHabitListMessage from './EmptyHabitListMessage';
import { useState } from 'react';

function HabitList(props) {
	const {
		habits,

		// 'on' functions
		onOpenModal, onUpdateProgress,

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

				// 'on' functions
				{...{ onOpenModal, onUpdateProgress }}
				onShowMenu={() => setVisibleMenuIndex(index === visibleMenuIndex ? -1 : index)}
			/>
		)
	);

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