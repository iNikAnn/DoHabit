import styles from './DataManagementPage.module.css';
import { ImFire } from 'react-icons/im';
import { FaDownload, FaUpload } from 'react-icons/fa6';
import { clearAppData } from '@features/data-management/clear-data';
import { exportAppData } from '@features/data-management/export-data';
import { importAppData } from '@features/data-management/import-data';
import { MenuItemProps, MenuList } from '@shared/ui';

/**
 * Handles data export and import (JSON backups).
 */
function DataManagementPage() {
	const backupItems: MenuItemProps[] = [
		{
			icon: FaUpload,
			iconProps: { color: '#4cbe57' },
			title: 'Export',
			description: 'Save a backup data to your device',
			onClick: exportAppData
		},
		{
			icon: FaDownload,
			iconProps: { color: '#728ad8' },
			title: 'Import',
			description: 'Upload your app data from a backup file',
			onClick: importAppData
		}
	];

	const dangerItems: MenuItemProps[] = [
		{
			icon: <ImFire style={{ color: 'IndianRed' }} />,
			title: 'Clear All',
			description: 'Delete all application data',
			onClick: clearAppData
		}
	];

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