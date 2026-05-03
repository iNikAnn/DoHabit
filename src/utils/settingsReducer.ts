// types
import { Settings, SettingsAction } from '../types/settings';

// utils
import { writeLocalStorage } from '@shared/lib';

/**
 * Reducer for application settings with persistence.
 */
function settingsReducer(settings: Settings, { type, payload }: SettingsAction): Settings {
	let nextSettings: Settings = {};

	switch (type) {
		case 'updateSettings':
			nextSettings = { ...settings, ...payload };
			break;

		default:
			const _exhaustiveCheck: never = type;
			console.error('Unknown action type.');
			return _exhaustiveCheck;
	}

	writeLocalStorage('settings', nextSettings);

	return nextSettings;
}

export default settingsReducer;