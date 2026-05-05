import styles from '../../css/HabitMenu.module.css';

// components
import { Button } from '@shared/ui';

// react
import { JSX } from 'react';

// router
import { Link } from 'react-router-dom';

// framer
import { motion, PanInfo } from 'framer-motion'

// stores
import { useHabitsStore } from '../../stores/habitsStore';

// types
import { Habit } from '../../types/habit';
import { ColorPalette } from '../../types/colorScheme';

// icons
import { MdEditSquare } from 'react-icons/md'; // edit
import { MdLibraryBooks } from 'react-icons/md'; // diary
import { FaShareAltSquare } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaCalendarTimes } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';

// --- Variants:START ---
const bgVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 100 },
	exit: { opacity: 0 },
	transition: { duration: .2, ease: 'easeOut' }
};

const contentVariants = {
	initial: { y: '100%' },
	animate: { y: 0 },
	exit: { y: '100%' },
	transition: { duration: .2, ease: 'easeOut' }
};
// --- Variants:END ---

interface Props {
	habit: Habit;
	colorPalette: ColorPalette;
	isTodayCompleted: boolean;
	isYesterdayCompleted: boolean;
	todayProgress: number;
	currentStreak: number;
	onShowMenu: (i: number) => void;
	onShare: () => void;
}

function HabitMenu(props: Props) {
	const {
		habit,
		colorPalette,
		isTodayCompleted,
		isYesterdayCompleted,
		todayProgress,
		currentStreak,
		onShowMenu,
		onShare
	} = props;

	const habitsDispatch = useHabitsStore((s) => s.habitsDispatch);
	const { darkenedColor } = colorPalette;

	const handleDragEnd = (_: any, info: PanInfo) => {
		if (info.offset.y >= 100) {
			onShowMenu(-1);
			navigator.vibrate?.(10);
		};
	};

	const handleCompleteYeserday = () => {
		habitsDispatch({
			type: 'toggleYesterdayStatus',
			payload: {
				habitId: habit.title,
				isTodayCompleted,
				isYesterdayCompleted,
				todayProgress
			}
		});
	};

	const buttons = [[
		isYesterdayCompleted ? <FaCalendarTimes /> : <FaCalendarCheck />,
		(isYesterdayCompleted ? 'Uncomp.' : 'Comp.') + ' Y\'day',
		isYesterdayCompleted ? 'IndianRed' : darkenedColor,
		null,
		null,
		() => handleCompleteYeserday()
	], [
		<MdEditSquare />,
		'Edit Habit',
		darkenedColor,
		'/modal/habit-editor',
		{
			habitTitle: habit.title,
			modalTitle: 'Edit habit',
		},
		null,
		true
	], [
		<FaShareAltSquare />,
		'Share Habit',
		darkenedColor,
		null,
		null,
		() => onShare()
	], [
		<FaChartSimple />,
		'Statistics',
		darkenedColor,
		'/modal/statistics',
		{
			completedDays: habit.completedDays,
			colorPalette,
			colorIndex: habit.colorIndex,
			frequency: habit.frequency,
			modalTitle: habit.title,
		},
		null,
		true
	], [
		<MdLibraryBooks />,
		'Diary',
		darkenedColor,
		'/modal/diary',
		{
			currentStreak,
			habitTitle: habit.title,
			colorIndex: habit.colorIndex,
			modalTitle: habit.title,
		},
		null,
		true
	]].map(
		([icon, text, bgColor, to, state, onClick, arrow]) => (
			<li key={text as string}>
				<Button
					to={to ? to as string : undefined}
					// @ts-ignore
					state={state}
					style={{ backgroundColor: bgColor ? bgColor as string : '' }}
					// @ts-ignore
					icon={icon}
					indicator={{ type: arrow ? 'arrow' : 'none' }}
					// @ts-ignore
					onClick={onClick}
				>
					{text as string}
				</Button>
			</li>
		)
	);

	return (
		<motion.div
			className={styles.menu}
			{...bgVariants}
			data-screenshot-ignore
		>
			<motion.div
				className={styles.content}
				{...contentVariants}

				drag='y'
				dragConstraints={{ top: 0, bottom: 0 }}
				dragElastic={{ top: 0.1, bottom: 1 }}
				onDragEnd={handleDragEnd}

				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.handle} />
				<h3 className={styles.title}>{habit.title}</h3>

				<ul
					className={styles.list}
					onClick={() => onShowMenu(-1)}
				>
					{buttons}
				</ul>
			</motion.div>
		</motion.div>
	);
}

export default HabitMenu;