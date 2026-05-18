import { STORAGE_KEYS } from '@shared/const';
import { formatDate, readLocalStorage } from '@shared/lib';

/**
 * Downloads a JSON file containing app data.
 */
function exportAppData() {
	// Notify user before starting the download
	if (window.confirm('Download backup file to your device?')) {
		// Collect data from all storage keys
		const data = {
			[STORAGE_KEYS.HABITS]: readLocalStorage(STORAGE_KEYS.HABITS),
			[STORAGE_KEYS.NOTES]: readLocalStorage(STORAGE_KEYS.NOTES),
			[STORAGE_KEYS.ACHIEVEMENTS]: readLocalStorage(STORAGE_KEYS.ACHIEVEMENTS)
		};

		const jsonStr = JSON.stringify(data);
		const blob = new Blob([jsonStr], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		// Create a unique filename with a timestamp (e.g., DoHabit_backup_2008-10-31_14-10)
		const dateStr = formatDate(new Date(), { includeTime: true }).replace(/(\s)|(:)/g, (m) => m === ':' ? '-' : '_');
		const fileName = `DoHabit_backup_${dateStr}.json`;

		// Temporary link to trigger the browser's download manager
		const link = document.createElement('a');
		link.href = url;
		link.download = fileName;
		link.click();

		// Cleanup the memory-held URL object
		URL.revokeObjectURL(url);
	}
}

export { exportAppData };