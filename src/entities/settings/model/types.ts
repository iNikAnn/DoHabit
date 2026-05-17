export interface Settings {
	theme?: 'light' | 'dark';
	calendarView?: 'default' | 'compact';
	calendarHighlightToday?: boolean;
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