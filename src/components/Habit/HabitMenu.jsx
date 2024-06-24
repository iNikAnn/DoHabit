import styles from '../../css/HabitMenu.module.css';

// components
import Button from '../Button';

// icons
import { MdEditSquare } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";

function HabitMenu(props) {
	const {
		title, btnBgColor, isTodayCompleted, isYesterdayCompleted, todayProgress, frequency,

		// 'on' functions
		onOpenModal, onUpdate
	} = props;

	console.log(props);
	return (
		<div className={styles.menu}>
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
						icon={<MdLibraryBooks />}
						text="Diary Entries"
						bgColor={btnBgColor}
						onClick={() => onOpenModal({
							habitTitle: title,
							modalTitle: title,
							modalContent: 'habitProfile'
						})}
					/>
				</li>
			</ul>
		</div>
	)
}

export default HabitMenu;