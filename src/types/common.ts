export type ColorScheme = 'light' | 'dark';

export interface Settings {
	calendarView?: 'default' | 'compact';
	calendarHighlightToday?: boolean;
	isDarkSchemeForced?: boolean;
}

export interface Streak {
	length: number;
	start: string;
	end: string;
}