import styles from '../css/Header.module.css';

// icons
import { FaPlus } from "react-icons/fa";

function Header(props) {
	const {
		// 'on' functions
		onOpenHabitEditor,
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

			<div>
				<button
					className={styles.btn}
					onClick={() => onOpenHabitEditor(modalProps)}
				>
					<FaPlus />
				</button>
			</div>
		</header>
	);
}

export default Header;