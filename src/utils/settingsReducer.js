import saveToLocalStorage from '../utils/saveToLocalStorage';

function settingsReducer(settings, actions) {
	let newSettings = { ...settings, ...actions };
	saveToLocalStorage('settings', newSettings);

	return newSettings;
}

export default settingsReducer;