import styles from './MenuPage.module.css';
import packageJson from '../../../../package.json';
import { appItems, supportItems } from '../model/menu.items';
import { MenuList } from '@shared/ui';

/**
 * Navigation hub for app settings.
 */
function MenuPage() {
	return (
		<section className={styles.menu}>
			<MenuList
				title='App'
				items={appItems}
			/>

			<MenuList
				title='Support'
				items={supportItems}
			/>

			<div className={styles.footer}>
				<small>Version: {packageJson.version}</small>
			</div>
		</section>
	);
}

export { MenuPage };