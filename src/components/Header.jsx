import styles from '../css/Header.module.css';

// components
import IconButton from './Actions/IconButton';

// icons
import { FaPlus, FaBars } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";

function Header({ onOpenModal }) {

	const handleClick = (modalContent, modalTitle) => {
		onOpenModal({ type: 'open', modalContent, modalTitle });
	};

	const navItems = [
		['habitEditor', 'Create new habit', <FaPlus />],
		['diary', 'Main Diary', <MdLibraryBooks />],
		['menu', 'Menu', <FaBars />]
	].map(
		([content, title, icon]) => (
			<li key={content}>
				<IconButton
					{...{ icon, title }}
					onClick={() => handleClick(content, title)}
				/>
			</li>
		)
	);

	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<span className={styles.logo} />
				<h1>DoHabit</h1>
			</div>

			<nav>
				<ul className={styles.navList}>
					{navItems}
				</ul>
			</nav>
		</header>
	);
}

export default Header;