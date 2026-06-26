import type { AppLanguageCode } from '@shared/lib/i18n/types';

export interface Settings {
	theme?: 'light' | 'dark';
	language?: AppLanguageCode;
	isAnimationsEnabled: boolean;
	hasSeenWelcome?: boolean;
	hasSeenStorageInfo?: boolean;
	calendarView?: 'default' | 'compact';
	calendarHighlightToday: boolean;
	calendarShowDayNames: boolean;
	calendarShowDayNumbers: boolean;
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