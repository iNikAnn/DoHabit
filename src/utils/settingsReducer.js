import saveToLocalStorage from '../utils/saveToLocalStorage';

function settingsReducer(settings, actions) {
	let newSettings = { ...settings };

	switch (actions.type) {
		case 'calendar':
			newSettings.calendar = actions.value;
			break;

		default:
			break;
	}

	saveToLocalStorage('settings', newSettings);

	return newSettings;
}

export default settingsReducer;