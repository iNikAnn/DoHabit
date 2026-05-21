import styles from './DataManagementPage.module.css';
import useListItems from '../model/useListItems';
import { List } from '@shared/ui';

/**
 * Handles data export and import (JSON backups).
 */
function DataManagementPage() {
	const { backupItems, dangerItems } = useListItems();

	return (
		<div className={styles.page}>
			<List
				title='Backup'
				items={backupItems}
			/>

			<List
				title='Danger Zone'
				titleStyle={{ color: 'IndianRed' }}
				listStyle={{ border: '2px solid IndianRed' }}
				items={dangerItems}
			/>
		</div>
	);
}

export { DataManagementPage };