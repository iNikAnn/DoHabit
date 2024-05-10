import styles from '../css/Header.module.css';

function Header(props) {
	const {
		// 'on' functions
		onOpenCreateHabitWindow
	} = props;

	return (
		<header className={styles.header}>
			<span>LOGO</span>

			<div>
				<button onClick={onOpenCreateHabitWindow}>+</button>
			</div>
		</header>
	);
}

export default Header;