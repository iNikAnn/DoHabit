import styles from '../css/HabitList.module.css';

// react
import { useState } from 'react';

// framer
import { AnimatePresence } from 'framer-motion';

// stores
import { useColorsStore } from '../stores/colorsStore';

// components
import Habit from "./Habit/Habit";

// db
import dbIcons from '../db/dbIcons';

function HabitList({ habits, isArchive = false }) {

	const dbColors = useColorsStore((s) => s.colors);
	const [visibleMenuIndex, setVisibleMenuIndex] = useState(-1);

	const handleToggleMenu = (i) => {
		document.body.classList.toggle('no-scroll');
		setVisibleMenuIndex(i === visibleMenuIndex ? -1 : i);
	};

	const habitList = habits.map(
		(h, index) => (
			<Habit
				key={h.title}
				{...{ ...h, index, isArchive }}
				icon={dbIcons.find(([iconTitle]) => iconTitle === h.iconTitle)?.[1] ?? '?'}
				color={dbColors[h.colorIndex]}
				isMenuVisible={visibleMenuIndex === index}
				onShowMenu={(i) => handleToggleMenu(i)}
			/>
		)
	);

	return (
		<div className={styles.habitList}>
			<AnimatePresence initial={false}>
				{habitList}
			</AnimatePresence>
		</div>
	);
}

export default HabitList;