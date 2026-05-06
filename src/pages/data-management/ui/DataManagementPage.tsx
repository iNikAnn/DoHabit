import styles from './DataManagementPage.module.css';

// components
import { Placeholder } from '@shared/ui';

// utils
import { exportAppData, importAppData } from '@shared/lib';

// icons
import { ExportIcon, ImportIcon } from '@shared/assets';
import { BsDatabaseFillUp } from 'react-icons/bs';
import { BsDatabaseFillDown } from 'react-icons/bs';

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
						onClick: importAppData
					}}
				/>
			</div>
		</div>
	);
}

export { DataManagementPage };