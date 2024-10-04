// utils
import getFromLocalStorage from './getFromLocalStorage';

function initMainDiary() {
	let mainDiary = getFromLocalStorage('mainDiary');

	if (!Array.isArray(mainDiary)) {
		return [];
	};

	return mainDiary;
}

export default initMainDiary;