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

	// disable scrolling on the body when the habit menu is open
	// useEffect(
	// 	() => { document.body.style.overflow = visibleMenuIndex !== -1 ? 'hidden' : 'auto' },
	// 	[visibleMenuIndex]
	// );

	const habitList = habits.map(
		(habit, index) => (
			<Habit
				key={habit.title}
				index={index}
				{...habit}
				icon={dbIcons.find(([iconTitle]) => iconTitle === habit.iconTitle)?.[1] || '?'}
				color={dbColors[habit.colorIndex]}
				isMenuVisible={visibleMenuIndex === index}
				archive={archive}

				// 'on' functions
				{...{ onOpenModal, onUpdate }}
				onShowMenu={(i) => {
					document.body.classList.toggle('no-scroll');
					setVisibleMenuIndex(i === visibleMenuIndex ? -1 : i)
				}}
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