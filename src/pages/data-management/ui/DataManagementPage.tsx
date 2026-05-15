import styles from './DataManagementPage.module.css';
import { backupItems, dangerItems } from '../model/menu.items';
import { MenuList } from '@shared/ui';

/**
 * Handles data export and import (JSON backups).
 */
function DataManagementPage() {
	return (
		<div className={styles.page}>
			<MenuList
				title='Backup'
				items={backupItems}
			/>

			<MenuList
				title='Danger Zone'
				titleStyle={{ color: 'IndianRed' }}
				listStyle={{ border: '2px solid IndianRed' }}
				items={dangerItems}
			/>
		</div>
	);
}

export { DataManagementPage };