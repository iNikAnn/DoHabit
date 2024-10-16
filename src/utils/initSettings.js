// utils
import getFromLocalStorage from '../utils/getFromLocalStorage';

function initSettings() {
	let settings = getFromLocalStorage('settings');

	if (!settings) {
		return {};
	};

	return settings;
}

export default initSettings;