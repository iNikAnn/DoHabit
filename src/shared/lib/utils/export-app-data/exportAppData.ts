import { readLocalStorage } from '../read-local-storage/readLocalStorage';

/**
 * Downloads a JSON file containing all data stored in localStorage.
 */
function exportAppData() {
	const data = {
		habits: readLocalStorage('habits'),
		mainDiary: readLocalStorage('mainDiary'),
		achievements: readLocalStorage('achievements')
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