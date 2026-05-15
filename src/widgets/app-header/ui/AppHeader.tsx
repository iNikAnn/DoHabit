import styles from './AppHeader.module.css';
import { NAV_ITEMS } from '../model/navigation';
import { Button } from '@shared/ui';

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
							<Button
								key={item.path}
								to={path}
								state={{ modalTitle: title }}
								className={styles.navItem}
							>
								<Icon />
							</Button>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}

export { AppHeader };