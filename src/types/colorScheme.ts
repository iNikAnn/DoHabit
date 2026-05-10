export type ColorScheme = 'light' | 'dark';

export interface ColorVariants {
	baseColor: string;
	darkenedColor: string;
	softenedColor: string;
}

export interface ColorsState {
	colors: string[];
	update: (newColors: string[]) => void;
}