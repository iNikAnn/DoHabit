import styles from '../css/HabitList.module.css';

// components
import HabitCard from "./Habit/HabitCard";

// react
import { useState } from 'react';

// framer
import { AnimatePresence } from 'framer-motion';

// stores
import { useColorsStore } from '../stores/colorsStore';

// types
import { Habit } from '../types/habit';

interface Props {
	habits: Habit[];
	isArchive?: boolean;
}

function HabitList({ habits, isArchive = false }: Props) {

	const dbColors = useColorsStore((s) => s.colors);
	const [visibleMenuIndex, setVisibleMenuIndex] = useState(-1);

	const handleToggleMenu = (i: number) => {
		document.body.classList.toggle('no-scroll');
		setVisibleMenuIndex(i === visibleMenuIndex ? -1 : i);
	};

	const habitList = habits.map(
		(habit, index) => (
			<HabitCard
				key={habit.title}
				habit={habit}
				habitIndex={index}
				color={dbColors[habit.colorIndex] ?? 'red'}
				isArchive={isArchive}
				isMenuVisible={visibleMenuIndex === index}
				onShowMenu={handleToggleMenu}
			/>
		)
	);

	return (
		<div className={styles.habitList}>
			{/* @ts-ignore */}
			<AnimatePresence initial={false}>
				{habitList}
			</AnimatePresence>
		</div>
	);
}

export default HabitList;