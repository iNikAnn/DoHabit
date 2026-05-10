import { readLocalStorage } from '../read-local-storage/readLocalStorage';
import { STORAGE_KEYS } from '@shared/const';

/**
 * Downloads a JSON file containing app data stored in localStorage.
 */
function exportAppData() {
	const data = {
		[STORAGE_KEYS.HABITS]: readLocalStorage(STORAGE_KEYS.HABITS),
		[STORAGE_KEYS.NOTES]: readLocalStorage(STORAGE_KEYS.NOTES),
		// achievements: readLocalStorage('achievements')
	};

	const jsonStr = JSON.stringify(data);
	const blob = new Blob([jsonStr], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const fileName = 'DoHabit_' + new Date().toLocaleString().replace(/\W/g, '_') + '.json';

	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	link.click();

	URL.revokeObjectURL(url);
}

export { exportAppData };