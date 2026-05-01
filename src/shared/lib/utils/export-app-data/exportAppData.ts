import getFromLocalStorage from '../../../../utils/getFromLocalStorage';

/**
 * Downloads a JSON file containing all data stored in localStorage.
 */
function exportAppData() {
	const data = {
		habits: getFromLocalStorage('habits'),
		mainDiary: getFromLocalStorage('mainDiary'),
		achievements: getFromLocalStorage('achievements')
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