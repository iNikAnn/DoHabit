import getFromLocalStorage from './getFromLocalStorage';

/**
 * Downloads a JSON file containing all data stored in localStorage.
 */
function exportAllData() {
	const data = {
		habits: getFromLocalStorage('habits'),
		mainDiary: getFromLocalStorage('mainDiary'),
		achievements: getFromLocalStorage('achievements')
	};

	const jsonStr = JSON.stringify(data);

	const blob = new Blob([jsonStr], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = 'DoHabit_' + new Date().toLocaleString().replace(/\W/g, '_') + '.json';
	link.click();

	URL.revokeObjectURL(url);
}

export default exportAllData;