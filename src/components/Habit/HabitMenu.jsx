import styles from '../../css/HabitMenu.module.css';

// components
import Button from '../Button';

// icons
import { FaEdit } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

function HabitMenu(props) {
	const {
		title, btnBgColor,

		// 'on' functions
		onOpenModal
	} = props;

	return (
		<div className={styles.menu}>
			<ul className={styles.list}>
				<li>
					<Button
						icon={<FaEdit />}
						text="Edit"
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
						text="Diary"
						bgColor={btnBgColor}
						onClick={() => onOpenModal({
							habitTitle: title,
							modalTitle: title,
							modalContent: 'habitProfile'
						})}
					/>
				</li>

				<li>
					<Button
						icon={<FaCalendarCheck />}
						text="Complete Yesterday"
						bgColor={btnBgColor}
					// onClick={() => onOpenModal({
					// 	habitTitle: title,
					// 	modalTitle: title,
					// 	modalContent: 'habitProfile'
					// })}
					/>
				</li>
			</ul>
		</div>
	)
}

export default HabitMenu;