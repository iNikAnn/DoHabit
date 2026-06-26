import { useTranslation } from 'react-i18next';
import { FaDownload, FaUpload } from 'react-icons/fa6';
import { ImFire } from 'react-icons/im';
import { clearAppData } from '@features/data-management/clear-data';
import { exportAppData } from '@features/data-management/export-data';
import { importAppData } from '@features/data-management/import-data';
import { useDialogStore, type ListItemProps } from '@shared/ui';
import { FaInfoCircle } from 'react-icons/fa';

function useListItems() {
	const { t } = useTranslation();
	const openDialog = useDialogStore((s) => s.open);

	const infoItems: ListItemProps[] = [
		{
			icon: FaInfoCircle,
			iconProps: { color: '#2ca5e1' },
			title: t('menu.dataManagement.info.storage.title'),
			description: t('menu.dataManagement.info.storage.description'),
			onClick: () => {
				openDialog({
					title: t('menu.dataManagement.info.storage.dialogs.title'),
					text: t('menu.dataManagement.info.storage.dialogs.text')
				});
			}
		}
	];

	const backupItems: ListItemProps[] = [
		// Export
		{
			icon: FaUpload,
			iconProps: { color: '#4cbe57' },
			title: t('menu.dataManagement.backup.export.title'),
			description: t('menu.dataManagement.backup.export.desc'),
			onClick: exportAppData
		},

		// Import
		{
			icon: FaDownload,
			iconProps: { color: '#728ad8' },
			title: t('menu.dataManagement.backup.import.title'),
			description: t('menu.dataManagement.backup.import.desc'),
			onClick: importAppData
		}
	];

	const dangerItems: ListItemProps[] = [
		// Clear all
		{
			icon: ImFire,
			iconProps: { color: 'IndianRed' },
			title: t('menu.dataManagement.danger.clearAll.title'),
			description: t('menu.dataManagement.danger.clearAll.desc'),
			onClick: () => clearAppData()
		}
	];

	return {
		infoItems,
		backupItems,
		dangerItems
	};
}

export default useListItems;