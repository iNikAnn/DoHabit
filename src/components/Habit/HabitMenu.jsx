import styles from '../../css/HabitMenu.module.css';

// components
import Button from '../Button';

// icons
import { MdEditSquare } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md"; // diary
import { FaShareAltSquare } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

function HabitMenu(props) {
	const {
		title, btnBgColor, colorIndex,
		isTodayCompleted, isYesterdayCompleted, todayProgress, frequency,

		// 'on' functions
		onOpenModal, onUpdate, onShare
	} = props;

	return (
		<div data-name="habitMenu" className={styles.menu}>
			<ul className={styles.list}>
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
							habitTitle: title,
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
		</div>
	)
}

export default HabitMenu;