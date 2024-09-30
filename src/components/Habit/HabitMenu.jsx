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
		title, btnBgColor, completedDays, colorIndex,
		isTodayCompleted, isYesterdayCompleted, todayProgress, frequency,

		// 'on' functions
		onShowMenu, onOpenModal, onUpdate, onShare
	} = props;

	// --- Animation parameters ---
	const initialVariant = {
		opacity: 0,
		y: '100%'
	};

	const variants = {
		initial: initialVariant,

		animate: {
			opacity: 1,
			y: 0,
			translateY: '60px'
		},

		exit: initialVariant
	};

	const handleDragEnd = (_, info) => {
		if (info.offset.y >= 100) {
			onShowMenu(-1);
			navigator.vibrate?.(10);
		};
	};
	//

	return (
		<div data-name="habitMenu" className={styles.menu}>
			<motion.div
				className={styles.content}
				{...variants}

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
					<li>
						<Button
							icon={isYesterdayCompleted ? <FaCalendarTimes /> : <FaCalendarCheck />}
							text={(isYesterdayCompleted ? 'Uncomp.' : 'Comp.') + ' Y\'day'}
							bgColor={isYesterdayCompleted ? 'IndianRed' : btnBgColor}
							onClick={() => onUpdate({
								type: 'toggleCompleteYeserday',
								habitTitle: title,
								isTodayCompleted,
								isYesterdayCompleted,
								todayProgress,
								frequency
							})}
						/>
					</li>

					<li>
						<Button
							icon={<MdEditSquare />}
							text="Edit Habit"
							arrow
							bgColor={btnBgColor}
							onClick={() => onOpenModal({
								habitTitle: title,
								modalTitle: 'Edit habit',
								modalContent: 'habitEditor'
							})}
						/>
					</li>

					<li>
						<Button
							icon={<FaShareAltSquare />}
							text="Share Habit"
							bgColor={btnBgColor}
							onClick={onShare}
						/>
					</li>

					<li>
						<Button
							icon={<FaChartSimple />}
							text="Statistics"
							arrow
							bgColor={btnBgColor}
							onClick={() => onOpenModal({
								completedDays,
								colorIndex,
								frequency,
								modalTitle: title,
								modalContent: 'statistics'
							})}
						/>
					</li>

					<li>
						<Button
							icon={<MdLibraryBooks />}
							text="Diary"
							arrow
							bgColor={btnBgColor}
							onClick={() => onOpenModal({
								habitTitle: title,
								colorIndex: colorIndex,
								modalTitle: title,
								modalContent: 'diary'
							})}
						/>
					</li>
				</ul>
			</motion.div>
		</div >
	);
}

export default HabitMenu;