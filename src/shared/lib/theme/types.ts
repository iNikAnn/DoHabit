import type { CSSProperties } from 'react';

export type ColorScheme = 'light' | 'dark';

export interface ColorVariants {
	baseColor: string;
	darkenedColor: string;
	softenedColor: string;
	style: CSSProperties & Record<`--${string}`, string>;
}