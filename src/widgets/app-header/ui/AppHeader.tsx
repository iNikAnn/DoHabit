import styles from './AppHeader.module.css';
import { getNavItems } from '../model/navigation';
import { Button } from '@shared/ui';

/**
 * Main application header with navigation.
 *
 * Uses {@link getNavItems} to render links.
 */
function AppHeader() {
	const navItems = getNavItems();

	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<span className={styles.logo} />
				<h1>DoHabit</h1> {/* eslint-disable-line */}
			</div>

			<nav>
				<ul className={styles.navList}>
					{navItems.map((item) => {
						const { to, state, icon: Icon } = item;

						return (
							<Button
								key={item.to}
								to={to}
								state={state}
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