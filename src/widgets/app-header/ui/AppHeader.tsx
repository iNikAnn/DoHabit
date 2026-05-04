import styles from './AppHeader.module.css';
import { NAV_ITEMS } from '../model/navigation';
import { Link } from 'react-router-dom';
import IconButton from '../../../components/Actions/IconButton';

function AppHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<span className={styles.logo} />
				<h1>DoHabit</h1>
			</div>

			<nav>
				<ul className={styles.navList}>
					{NAV_ITEMS.map((item) => {
						const { path, title, icon: Icon } = item;

						return (
							<Link to={path} state={{ modalTitle: title }}>
								<IconButton
									icon={<Icon />}
									text={title}
								/>
							</Link>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}

export { AppHeader };