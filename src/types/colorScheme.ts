export type ColorScheme = 'light' | 'dark';

export interface ColorsState {
	colors: string[];
	update: (newColors: string[]) => void;
}