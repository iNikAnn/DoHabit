import styles from '../css/HabitList.module.css';

// components
import Habit from "./Habit/Habit";

// react
import { useState } from 'react';

// framer
import { AnimatePresence } from 'framer-motion';

// stores
import { useColorsStore } from '../stores/colorsStore';

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