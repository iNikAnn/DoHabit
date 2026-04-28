export interface Settings {
	calendarView?: 'default' | 'compact';
	calendarHighlightToday?: boolean;
	isDarkSchemeForced?: boolean;
}

export interface UpdateSettings {
	type: 'updateSettings';
	payload: Partial<Settings>;
}

export type SettingsAction =
	| UpdateSettings;

export interface SettingsState {
	settings: Settings;
	settingsDispatch: (action: SettingsAction) => void;
}