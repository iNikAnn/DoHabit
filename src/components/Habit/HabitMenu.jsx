import styles from '../../css/HabitMenu.module.css';

// framer
import { motion } from "framer-motion"

// components
import Button from '../Button';

// icons
import { MdEditSquare } from "react-icons/md"; // edit
import { MdLibraryBooks } from "react-icons/md"; // diary
import { FaShareAltSquare } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

function HabitMenu(props) {
	const {
		title, completedDays, colorIndex, colorPalette,
		isTodayCompleted, isYesterdayCompleted, todayProgress, frequency,
		onShowMenu, onOpenModal, onUpdate, onShare
	} = props;

	const { darkenedColor } = colorPalette;

	// --- Animation parameters ---
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

	const handleDragEnd = (_, info) => {
		if (info.offset.y >= 100) {
			onShowMenu(-1);
			navigator.vibrate?.(10);
		};
	};
	//

	const handleClick = (action) => {
		switch (action) {
			case 'toggleCompleteYeserday':
				onUpdate({
					type: 'toggleCompleteYeserday',
					habitTitle: title,
					isTodayCompleted,
					isYesterdayCompleted,
					todayProgress,
					frequency
				});
				break;

			case 'editHabit':
				onOpenModal({
					type: 'open',
					habitTitle: title,
					modalTitle: 'Edit habit',
					modalContent: 'habitEditor'
				});
				break;

			case 'openStatistics':
				onOpenModal({
					type: 'open',
					completedDays,
					colorPalette,
					colorIndex,
					frequency,
					modalTitle: title,
					modalContent: 'statistics'
				});
				break;

			case 'openDiary':
				onOpenModal({
					type: 'open',
					habitTitle: title,
					colorIndex: colorIndex,
					modalTitle: title,
					modalContent: 'diary'
				});
				break;

			default:
				break;
		};
	};

	const buttons = [[
		isYesterdayCompleted ? <FaCalendarTimes /> : <FaCalendarCheck />,
		(isYesterdayCompleted ? 'Uncomp.' : 'Comp.') + ' Y\'day',
		isYesterdayCompleted ? 'IndianRed' : darkenedColor,
		() => handleClick('toggleCompleteYeserday')
	], [
		<MdEditSquare />,
		'Edit Habit',
		darkenedColor,
		() => handleClick('editHabit'),
		true
	], [
		<FaShareAltSquare />,
		'Share Habit',
		darkenedColor,
		() => onShare()
	], [
		<FaChartSimple />,
		'Statistics',
		darkenedColor,
		() => handleClick('openStatistics'),
		true
	], [
		<MdLibraryBooks />,
		'Diary',
		darkenedColor,
		() => handleClick('openDiary'),
		true
	]].map(
		([icon, text, bgColor, onClick, arrow]) => (
			<li key={text}>
				<Button {...{ icon, text, bgColor, onClick, arrow }} />
			</li>
		)
	);

	return (
		<motion.div
			data-name="habitMenu"
			className={styles.menu}
			{...bgVariants}
		>
			<motion.div
				className={styles.content}
				{...contentVariants}

				drag="y"
				dragConstraints={{ top: 0, bottom: 0 }}
				dragElastic={{ top: 0.1, bottom: 1 }}
				onDragEnd={handleDragEnd}

				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.handle} />
				<h3 className={styles.title}>{title}</h3>

				<ul
					className={styles.list}
					onClick={() => onShowMenu(-1)}
				>
					{buttons}
				</ul>
			</motion.div>
		</motion.div >
	);
}

export default HabitMenu;