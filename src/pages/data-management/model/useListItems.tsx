import { useTranslation } from 'react-i18next';
import { FaDownload, FaUpload } from 'react-icons/fa6';
import { ImFire } from 'react-icons/im';
import { clearAppData } from '@features/data-management/clear-data';
import { exportAppData } from '@features/data-management/export-data';
import { importAppData } from '@features/data-management/import-data';
import type { ListItemProps } from '@shared/ui';

function useListItems() {
	const { t } = useTranslation();
	const backupItems: ListItemProps[] = [
		{
			icon: FaUpload,
			iconProps: { color: '#4cbe57' },
			title: t('settings.data-management.backupExportTitle'),
			description: t('settings.data-management.backupExportDesc'),
			onClick: exportAppData
		},
		{
			icon: FaDownload,
			iconProps: { color: '#728ad8' },
			title: t('settings.data-management.backupImportTitle'),
			description: t('settings.data-management.backupImportDesc'),
			onClick: importAppData
		}
	];

	const dangerItems: ListItemProps[] = [
		{
			icon: ImFire,
			iconProps: { color: 'IndianRed' },
			title: t('settings.data-management.dangerClearAllTitle'),
			description: t('settings.data-management.dangerClearAllDesc'),
			onClick: clearAppData
		}
	];

	return {
		backupItems,
		dangerItems
	};
}

export default useListItems;