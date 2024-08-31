import styles from '../css/Header.module.css';

// icons
import { FaBurger } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md"; // diary

function Header(props) {
	const {
		// 'on' functions
		onOpenHabitEditor, onOpenModal
	} = props;

	const modalProps = {
		modalContent: 'habitEditor',
		modalTitle: 'Create new habit',
	};

	return (
		<header className={styles.header}>
			<span className={styles.logoWrapper}>
				<span className={styles.logo} />
				<h1>DoHabit</h1>
			</span>

			<div className={styles.btnsWrapper}>
				<button
					className={styles.btn}
					onClick={() => onOpenHabitEditor(modalProps)}
				>
					<FaPlus />
				</button>

				<button
					className={styles.btn}
					onClick={() => { }}
				>
					<MdLibraryBooks />
				</button>

				<button
					className={styles.btn}
					onClick={() => onOpenModal({
						modalTitle: 'Menu',
						modalContent: 'menu'
					})}
				>
					<FaBurger />
				</button>
			</div>
		</header>
	);
}

export default Header;