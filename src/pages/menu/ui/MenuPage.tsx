import styles from './MenuPage.module.css';
import packageJson from '../../../../package.json';
import useListItems from '../model/useListItems';
import { List } from '@shared/ui';

/**
 * Navigation hub for app settings.
 */
function MenuPage() {
	const { appItems, supportItems } = useListItems();

	return (
		<section className={styles.page}>
			<List
				title='App'
				items={appItems}
			/>

			<List
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