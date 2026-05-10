import { Settings, SettingsAction } from './types';

/**
 * Reducer for application settings.
 */
function settingsReducer(settings: Settings, { type, payload }: SettingsAction): Settings {
	switch (type) {
		case 'updateSettings':
			return { ...settings, ...payload };

		default:
			const _exhaustiveCheck: never = type;
			console.error('Unknown action type.');
			return _exhaustiveCheck;
	}
}

export { settingsReducer };