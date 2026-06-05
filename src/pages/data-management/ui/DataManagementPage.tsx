import styles from './DataManagementPage.module.css';
import useListItems from '../model/useListItems';
import { List } from '@shared/ui';
import { useTranslation } from 'react-i18next';

/**
 * Handles data export and import (JSON backups).
 */
function DataManagementPage() {
	const { t } = useTranslation();
	const { backupItems, dangerItems } = useListItems();

	return (
		<div className={styles.page}>
			<List
				title={t('settings.data-management.backUpSectionTitle')}
				items={backupItems}
			/>

			<List
				title={t('settings.data-management.dangerSectionTitle')}
				titleStyle={{ color: 'IndianRed' }}
				listStyle={{ border: '2px solid IndianRed' }}
				items={dangerItems}
			/>
		</div>
	);
}

export { DataManagementPage };