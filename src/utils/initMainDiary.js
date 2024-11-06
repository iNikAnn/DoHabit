// utils
import getFromLocalStorage from './getFromLocalStorage';

function initMainDiary() {
	let mainDiary = getFromLocalStorage('mainDiary', []);

	return mainDiary;
}

export default initMainDiary;