import { FaDownload, FaUpload } from 'react-icons/fa6';
import { ImFire } from 'react-icons/im';
import { clearAppData } from '@features/data-management/clear-data';
import { exportAppData } from '@features/data-management/export-data';
import { importAppData } from '@features/data-management/import-data';
import type { ListItemProps } from '@shared/ui';

function useListItems() {
	const backupItems: ListItemProps[] = [
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

	const dangerItems: ListItemProps[] = [
		{
			icon: ImFire,
			iconProps: { color: 'IndianRed' },
			title: 'Clear All',
			description: 'Delete all application data',
			onClick: clearAppData
		}
	];

	return {
		backupItems,
		dangerItems
	};
}

export default useListItems;