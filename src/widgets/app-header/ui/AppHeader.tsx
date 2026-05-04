import styles from './AppHeader.module.css';
import { NAV_ITEMS } from '../model/navigation';
import { Link } from 'react-router-dom';
import IconButton from '../../../components/Actions/IconButton';

/**
 * Main application header with navigation.
 *
 * Uses {@link NAV_ITEMS} to render links.
 */
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
							<Link
								key={item.path}
								to={path}
								// Passes title to ModalLayout's header via router state
								state={{ modalTitle: title }}
							>
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