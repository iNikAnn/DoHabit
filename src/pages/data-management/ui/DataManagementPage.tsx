import styles from './DataManagementPage.module.css';
import { BsDatabaseFillUp } from 'react-icons/bs';
import { BsDatabaseFillDown } from 'react-icons/bs';
import { ExportIcon, ImportIcon } from '@shared/assets';
import { exportAppData, importAppData } from '@shared/lib';
import { Placeholder } from '@shared/ui';

// @ts-ignore
const PUBLIC_URL = process.env.PUBLIC_URL ?? '/';

/**
 * Handles data export and import (JSON backups).
 */
function DataManagementPage() {
	return (
		<div className={styles.dataTransfer}>
			<div className={styles.placeholderWrapper}>
				<Placeholder
					content={{
						image: <ExportIcon />,
						title: 'Export',
						description: 'Save a backup of your habits data to your device.'
					}}
					action={{
						label: 'Export Now',
						icon: < BsDatabaseFillUp />,
						color: '#57a639',
						onClick: exportAppData
					}}
				/>
			</div>

			<div className={styles.placeholderWrapper}>
				<Placeholder
					content={{
						image: <ImportIcon />,
						title: 'Import',
						description: 'Upload your habits data from a backup file.'
					}}
					action={{
						label: 'Import Now',
						icon: <BsDatabaseFillDown />,
						onClick: async () => {
							const res = await importAppData();

							if (res) {
								window.alert('Data imported successfully! The application will now reload.');
								window.location.href = PUBLIC_URL;
							} else {
								window.alert('Something went wrong during import.');
							}
						}
					}}
				/>
			</div>
		</div>
	);
}

export { DataManagementPage };