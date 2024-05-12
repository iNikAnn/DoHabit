import styles from '../css/Header.module.css';

// icons
import { FaPlus } from "react-icons/fa";

function Header(props) {
	const {
		// 'on' functions
		onOpenCreateHabitWindow
	} = props;

	return (
		<header className={styles.header}>
			<span className={styles.logoWrapper}>
				<span className={styles.logo} />
				<h1>DoHabit</h1>
			</span>

			<div>
				<button
					className={styles.btn}
					onClick={onOpenCreateHabitWindow}
				>
					<FaPlus />
				</button>
			</div>
		</header>
	);
}

export default Header;