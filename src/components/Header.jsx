import styles from '../css/Header.module.css';

function Header() {
	return (
		<header className={styles.header}>
			<span>LOGO</span>

			<div>
				<button>+</button>
			</div>
		</header>
	);
}

export default Header;